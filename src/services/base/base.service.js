const {VERSIONS} = require('@asymmetrik/node-fhir-server-core').constants;
const {resolveSchema} = require('@asymmetrik/node-fhir-server-core');
const scopeChecker = require('@asymmetrik/sof-scope-checker');
const {CLIENT_DB} = require('../../constants');
const moment = require('moment-timezone');
const globals = require('../../globals');
// noinspection JSCheckFunctionSignatures
/**
 * @type {import('winston').logger}
 */
const logger = require('@asymmetrik/node-fhir-server-core').loggers.get();
const {getUuid} = require('../../utils/uid.util');
const {validateResource} = require('../../utils/validator.util');
const {NotAllowedError, NotFoundError, BadRequestError, NotValidatedError, ForbiddenError} = require('../../utils/httpErrors');
const {validate, applyPatch, compare} = require('fast-json-patch');
const deepmerge = require('deepmerge');
const deepcopy = require('deepcopy');
// const deepEqual = require('deep-equal');
const deepEqual = require('fast-deep-equal');
const sendToS3 = require('../../utils/aws-s3');

const async = require('async');
const env = require('var');

const {
    stringQueryBuilder,
    tokenQueryBuilder,
    referenceQueryBuilder,
    addressQueryBuilder,
    nameQueryBuilder,
    dateQueryBuilder,
} = require('../../utils/querybuilder.util');

/**
 * @typedef Resource
 * @type {object}
 * @property {string} id - an ID.
 * @property {string} resourceType
 */

/**
 * @typedef Meta
 * @type {object}
 * @property {string} versionId - an ID.
 * @property {string} lastUpdated
 * @property {string} source
 */

/**
 * Gets class for the given resource_name and version
 * @param {string} base_version
 * @param {string} resource_name
 * @returns {function(?Object):Resource}
 */
let getResource = (base_version, resource_name) => {
    return resolveSchema(base_version, resource_name);
};

/**
 * Gets class for Meta
 * @param {string} base_version
 * @returns {function({Object}):Meta} Meta class
 */
let getMeta = (base_version) => {
    return resolveSchema(base_version, 'Meta');
};

/**
 * Logs as info if env.IS_PRODUCTION is not set
 * @param {*} msg
 */
let logInfo = (msg) => {
    if (!env.IS_PRODUCTION) {
        logger.info(msg);
    }
};

/**
 * Always logs regardless of env.IS_PRODUCTION
 * @param {*} msg
 */
let logRequest = (msg) => {
    logger.info(msg);
};

/**
 * converts a space separated list of scopes into an array of scopes
 * @param {string} scope
 * @return {string[]}
 */
let parseScopes = (scope) => {
    if (!scope) {
        return [];
    }
    return scope.split(' ');
};

/**
 * Throws an error if no scope is valid for this request
 * @param {string} name
 * @param {string} action
 * @param {string} user
 * @param {?string} scope
 */
let verifyHasValidScopes = (name, action, user, scope) => {
    if (env.AUTH_ENABLED === '1') {
        // http://www.hl7.org/fhir/smart-app-launch/scopes-and-launch-context/index.html
        let scopes = parseScopes(scope);
        let {error, success} = scopeChecker(name, action, scopes);

        if (success) {
            return;
        }
        let errorMessage = 'user ' + user + ' with scopes [' + scopes + '] failed access check to [' + name + '.' + action + ']';
        console.info(errorMessage);
        throw new ForbiddenError(error.message + ': ' + errorMessage);
    }
};


/**
 * returns whether the parameter is false or a string "false"
 * @param {string | boolean} s
 * @returns {boolean}
 */
let isTrue = function (s) {
    return String(s).toLowerCase() === 'true';
};

/**
 * Builds a mongo query for search parameters
 * @param {string} resource_name
 * @param {string[]} args
 * @returns {Object} A query object to use with Mongo
 */
let buildR4SearchQuery = (resource_name, args) => {
    // Common search params
    let {id} = args;
    let patient = args['patient'];
    let practitioner = args['practitioner'];
    let organization = args['organization'];
    let location = args['location'];
    let healthcareService = args['healthcareService'];
    let name = args['name'];
    let family = args['family'];

    let address = args['address'];
    let address_city = args['address-city'];
    let address_country = args['address-country'];
    let addressPostalCode = args['address-postalcode'];
    let address_state = args['address-state'];

    let identifier = args['identifier'];

    let gender = args['gender'];
    let email = args['email'];
    let phone = args['phone'];
    let source = args['source'];
    let versionId = args['versionId'];
    let lastUpdated = args['_lastUpdated']; // _lastUpdated=gt2010-10-01
    // Search Result params

    // let extension_missing = args['extension:missing'];
    // extension:missing=true

    // Patient search params
    let active = args['active'];

    let query = {};
    /**
     * and segments
     * @type {Object[]}
     */
    let and_segments = [];

    if (id) {
        // see if this is an array
        if (id.includes(',')) {
            const id_list = id.split(',');
            query.id = {
                $in: id_list
            };
        } else {
            query.id = id;
        }
    }

    if (source) {
        query['meta.source'] = stringQueryBuilder(source);
    }

    if (versionId) {
        query['meta.versionId'] = versionId;
    }

    if (lastUpdated) {
        logInfo('meta.lastUpdated:' + lastUpdated);
        if (Array.isArray(lastUpdated)) {
            for (const lastUpdatedItem of lastUpdated) {
                and_segments.push({'meta.lastUpdated': dateQueryBuilder(lastUpdatedItem, 'instant', '')});
            }
        } else {
            query['meta.lastUpdated'] = dateQueryBuilder(lastUpdated, 'instant', '');
        }
    }
    if (patient || args['patient:missing']) {
        const patient_reference = 'Patient/' + patient;
        /**
         * @type {?boolean}
         */
        let patient_exists_flag = null;
        if (args['patient:missing']) {
            patient_exists_flag = !isTrue(args['patient:missing']);
        }
        // each Resource type has a different place to put the patient info
        if (['Patient'].includes(resource_name)) {
            query.id = patient;
        } else if (['AllergyIntolerance', 'Immunization', 'RelatedPerson', 'Device', 'ExplanationOfBenefit', 'Claim'].includes(resource_name)) {
            and_segments.push(referenceQueryBuilder(patient_reference, 'patient.reference', patient_exists_flag));
        } else if (['Appointment'].includes(resource_name)) {
            //TODO: participant is a list
            and_segments.push(referenceQueryBuilder(patient_reference, 'participant.actor.reference', patient_exists_flag));
        } else if (['CarePlan',
            'Condition',
            'DocumentReference',
            'Encounter',
            'MedicationRequest',
            'Observation',
            'Procedure',
            'ServiceRequest',
            'CareTeam',
            'QuestionnaireResponse'].includes(resource_name)) {
            and_segments.push(referenceQueryBuilder(patient_reference, 'subject.reference', patient_exists_flag));
        } else if (['Coverage'].includes(resource_name)) {
            and_segments.push(referenceQueryBuilder(patient_reference, 'beneficiary.reference', patient_exists_flag));
        } else {
            logger.error(`No mapping for searching by patient for ${resource_name}: `);
        }
    }
    if (practitioner || args['practitioner:missing']) {
        const practitioner_reference = 'Practitioner/' + practitioner;
        /**
         * @type {?boolean}
         */
        let practitioner_exists_flag = null;
        if (args['practitioner:missing']) {
            practitioner_exists_flag = !isTrue(args['practitioner:missing']);
        }

        // each Resource type has a different place to put the patient info
        if (['Practitioner'].includes(resource_name)) {
            query.id = practitioner;
        } else if (['PractitionerRole'].includes(resource_name)) {
            and_segments.push(referenceQueryBuilder(practitioner_reference, 'practitioner.reference', practitioner_exists_flag));
        } else {
            logger.error(`No mapping for searching by practitioner for ${resource_name}: `);
        }
    }
    if (organization || args['organization:missing']) {
        const organization_reference = 'Organization/' + organization;
        /**
         * @type {?boolean}
         */
        let organization_exists_flag = null;
        if (args['organization:missing']) {
            organization_exists_flag = !isTrue(args['organization:missing']);
        }

        // each Resource type has a different place to put the patient info
        if (['Organization'].includes(resource_name)) {
            query.id = organization;
        } else if (['HealthcareService'].includes(resource_name)) {
            and_segments.push(referenceQueryBuilder(organization_reference, 'providedBy.reference', organization_exists_flag));
        } else if (['InsurancePlan'].includes(resource_name)) {
            and_segments.push(referenceQueryBuilder(organization_reference, 'ownedBy.reference', organization_exists_flag));
        } else if (['PractitionerRole'].includes(resource_name)) {
            and_segments.push(referenceQueryBuilder(organization_reference, 'organization.reference', organization_exists_flag));
        } else {
            logger.error(`No mapping for searching by organization for ${resource_name}: `);
        }
    }
    if (location || args['location:missing']) {
        const location_reference = 'Location/' + location;
        /**
         * @type {?boolean}
         */
        let location_exists_flag = null;
        if (args['location:missing']) {
            location_exists_flag = !isTrue(args['location:missing']);
        }

        // each Resource type has a different place to put the patient info
        if (['Location'].includes(resource_name)) {
            query.id = location;
        } else if (['PractitionerRole'].includes(resource_name)) {
            and_segments.push(referenceQueryBuilder(location_reference, 'location.reference', location_exists_flag));
        } else {
            logger.error(`No mapping for searching by location for ${resource_name}: `);
        }
    }
    if (healthcareService || args['healthcareService:missing']) {
        const healthcareService_reference = 'HealthcareService/' + healthcareService;
        /**
         * @type {?boolean}
         */
        let healthcareService_exists_flag = null;
        if (args['healthcareService:missing']) {
            healthcareService_exists_flag = !isTrue(args['healthcareService:missing']);
        }

        // each Resource type has a different place to put the patient info
        if (['HealthcareService'].includes(resource_name)) {
            query.id = healthcareService;
        } else if (['PractitionerRole'].includes(resource_name)) {
            and_segments.push(referenceQueryBuilder(healthcareService_reference, 'healthcareService.reference', healthcareService_exists_flag));
        } else {
            logger.error(`No mapping for searching by healthcareService for ${resource_name}: `);
        }
    }
    if (name) {
        if (['Practitioner'].includes(resource_name)) {
            if (name) {
                let orsName = nameQueryBuilder(name);
                for (let i = 0; i < orsName.length; i++) {
                    and_segments.push(orsName[`${i}`]);
                }
            }
        } else {
            query['name'] = stringQueryBuilder(name);
        }
    }
    if (family) {
        query['name.family'] = stringQueryBuilder(family);
    }

    if (address) {
        let orsAddress = addressQueryBuilder(address);
        for (let i = 0; i < orsAddress.length; i++) {
            and_segments.push(orsAddress[`${i}`]);
        }
    }

    if (address_city) {
        query['address.city'] = stringQueryBuilder(address_city);
    }

    if (address_country) {
        query['address.country'] = stringQueryBuilder(address_country);
    }

    if (addressPostalCode) {
        query['address.postalCode'] = stringQueryBuilder(addressPostalCode);
    }

    if (address_state) {
        query['address.state'] = stringQueryBuilder(address_state);
    }

    if (identifier) {
        let queryBuilder = tokenQueryBuilder(identifier, 'value', 'identifier', '');
        /**
         * @type {string}
         */
        for (let i in queryBuilder) {
            // noinspection JSUnfilteredForInLoop
            query[`${i}`] = queryBuilder[`${i}`];
        }
    }
    if (active) {
        query.active = active === 'true';
    }

    if (gender) {
        query.gender = gender;
    }

    // Forces system = 'email'
    if (email) {
        let queryBuilder = tokenQueryBuilder(email, 'value', 'telecom', 'email');
        for (let i in queryBuilder) {
            // noinspection JSUnfilteredForInLoop
            query[`${i}`] = queryBuilder[`${i}`];
        }
    }

    // Forces system = 'phone'
    if (phone) {
        let queryBuilder = tokenQueryBuilder(phone, 'value', 'telecom', 'phone');
        for (let i in queryBuilder) {
            // noinspection JSUnfilteredForInLoop
            query[`${i}`] = queryBuilder[`${i}`];
        }
    }

    if (and_segments.length !== 0) {
        query.$and = and_segments;
    }
    return query;
};

/**
 * Builds a mongo query for search parameters
 * @param {string[]} args
 * @returns {Object}
 */
let buildStu3SearchQuery = (args) => {
    // Common search params
    let {id} = args;

    // Search Result params

    // Patient search params
    let active = args['active'];

    let query = {};

    if (id) {
        query.id = id;
    }

    if (active) {
        query.active = active === 'true';
    }

    return query;
};

/**
 * Builds a mongo query for search parameters
 * @param {string[]} args
 * @returns {Object}
 */
let buildDstu2SearchQuery = (args) => {
    // Common search params
    let {id} = args;

    // Search Result params

    // Patient search params
    let active = args['active'];

    let query = {};
    if (id) {
        query.id = id;
    }

    if (active) {
        query.active = active === 'true';
    }
    return query;
};

/**
 * combines args with args from request
 * @param {IncomingMessage} req
 * @param {string[]} args
 * @returns {string[]} array of combined arguments
 */
let get_all_args = (req, args) => {
    // asymmetric hides certain query parameters from us so we need to get them from the context
    const my_args = {};
    /**
     * args array
     * @type {[string][]}
     */
    const my_args_array = Object.entries(req.query);
    my_args_array.forEach(x => {
        my_args[x[0]] = x[1];
    });

    /**
     * combined args
     * @type {string[]}
     */
    const combined_args = Object.assign({}, args, my_args);
    logInfo('---- combined_args ----');
    logInfo(combined_args);
    logInfo('--------');
    return combined_args;
};

let check_fhir_mismatch = (cleaned, patched) => {
    if (deepEqual(cleaned, patched) === false) {
        let diff = compare(cleaned, patched);
        logger.warn('Possible FHIR mismatch - ' + cleaned.resourceType + cleaned.id + ':' + cleaned.resourceType);
        logger.warn(diff);
    }
};


/**
 * does a FHIR Search
 * @param {string[]} args
 * @param {IncomingMessage} req
 * @param {string} resource_name
 * @param {string} collection_name
 * @return {Resource[] | Resource} array of resources
 */
module.exports.search = async (args, {req}, resource_name, collection_name) => {
    /**
     * combined args
     * @type {string[]}
     */
    const combined_args = get_all_args(req, args);
    logRequest(resource_name + ' >>> search');
    // logRequest('user: ' + req.user);
    // logRequest('scope: ' + req.authInfo.scope);
    verifyHasValidScopes(resource_name, 'read', req.user, req.authInfo && req.authInfo.scope);
    logRequest('---- combined_args ----');
    logRequest(args);
    logRequest('--------');

    /**
     * @type {string}
     */
    let {base_version} = args;
    /**
     * @type {Object}
     */
    let query;

    if (base_version === VERSIONS['3_0_1']) {
        query = buildStu3SearchQuery(combined_args);
    } else if (base_version === VERSIONS['1_0_2']) {
        query = buildDstu2SearchQuery(combined_args);
    } else {
        query = buildR4SearchQuery(resource_name, combined_args);
    }

    // Grab an instance of our DB and collection
    /**
     * mongo db connection
     * @type {Db}
     */
    let db = globals.get(CLIENT_DB);
    /**
     * mongo collection
     * @type {Collection}
     */
    let collection = db.collection(`${collection_name}_${base_version}`);
    /**
     * @type {function(?Object): Resource}
     */
    let Resource = getResource(base_version, resource_name);

    logInfo('---- query ----');
    logInfo(query);
    logInfo('--------');

    /**
     * @type {Object}
     */
    let options = {};
    if (combined_args['_elements']) {
        const properties_to_return_as_csv = combined_args['_elements'];
        const properties_to_return_list = properties_to_return_as_csv.split(',');
        options = {['projection']: properties_to_return_list};
    }
    // Query our collection for this observation
    /**
     * @type {number}
     */
    const maxMongoTimeMS = 30 * 1000;
    /**
     * mongo db cursor
     * @type {Cursor}
     */
    let cursor = await collection.find(query, options).maxTimeMS(maxMongoTimeMS);
    // noinspection JSUnfilteredForInLoop
    if (combined_args['_sort']) {
        // GET [base]/Observation?_sort=status,-date,category
        // Each item in the comma separated list is a search parameter, optionally with a '-' prefix.
        // The prefix indicates decreasing order; in its absence, the parameter is applied in increasing order.
        /**
         * @type {string}
         */
        const sort_properties_as_csv = combined_args['_sort'];
        /**
         * @type {string[]}
         */
        const sort_properties_list = sort_properties_as_csv.split(',');
        for (let i in sort_properties_list) {
            // noinspection JSUnfilteredForInLoop
            /**
             * @type {string}
             */
            const x = sort_properties_list[`${i}`];
            if (x.startsWith('-')) {
                // eslint-disable-next-line no-unused-vars
                /**
                 * @type {string}
                 */
                const x1 = x.substring(1);
                cursor = cursor.sort({[x1]: -1});
            } else {
                cursor = cursor.sort({[x]: 1});
            }
        }
    }

    if (combined_args['_count']) {
        // for consistency in results while paging, always sort by _id
        // https://docs.mongodb.com/manual/reference/method/cursor.sort/#sort-cursor-consistent-sorting
        cursor = cursor.sort({'_id': 1});
        /**
         * @type {number}
         */
        const nPerPage = Number(combined_args['_count']);

        if (combined_args['_getpagesoffset']) {
            /**
             * @type {number}
             */
            const pageNumber = Number(combined_args['_getpagesoffset']);
            cursor = cursor.skip(pageNumber > 0 ? (pageNumber * nPerPage) : 0);
        }
        cursor = cursor.limit(nPerPage);
    } else {
        if (!combined_args['id'] && !combined_args['_elements']) {
            // set a limit so the server does not come down due to volume of data
            cursor = cursor.limit(10);
        }
    }

    // Resource is a resource cursor, pull documents out before resolving
    /**
     * resources to return
     * @type {Resource[]}
     */
    const resources = [];
    while (await cursor.hasNext()) {
        /**
         * element
         * @type {Object}
         */
        const element = await cursor.next();
        if (combined_args['_elements']) {
            /**
             * @type {string}
             */
            const properties_to_return_as_csv = combined_args['_elements'];
            /**
             * @type {string[]}
             */
            const properties_to_return_list = properties_to_return_as_csv.split(',');
            /**
             * @type {Resource}
             */
            const element_to_return = new Resource(null);
            for (const property of properties_to_return_list) {
                if (property in element_to_return) {
                    // noinspection JSUnfilteredForInLoop
                    element_to_return[`${property}`] = element[`${property}`];
                }
            }
            resources.push(element_to_return);
        } else {
            resources.push(new Resource(element));
        }
    }

    if (env.RETURN_BUNDLE || combined_args['_bundle']) {
        /**
         * @type {function({Object}):Resource}
         */
        const Bundle = getResource(base_version, 'bundle');
        /**
         * @type {{resource: Resource}[]}
         */
        const entries = resources.map(resource => {
            return {resource: resource};
        });
        return new Bundle({
            type: 'searchset',
            timestamp: moment.utc().format('YYYY-MM-DDThh:mm:ss.sss') + 'Z',
            entry: entries
        });
    } else {
        return resources;
    }
};

/**
 * does a FHIR Search By Id
 * @param {string[]} args
 * @param {IncomingMessage} req
 * @param {string} resource_name
 * @param {string} collection_name
 */
// eslint-disable-next-line no-unused-vars
module.exports.searchById = async (args, {req}, resource_name, collection_name) => {
    logRequest(`${resource_name} >>> searchById`);
    logInfo(args);

    verifyHasValidScopes(resource_name, 'read', req.user, req.authInfo && req.authInfo.scope);

    // Common search params
    let {id} = args;
    let {base_version} = args;

    logInfo(`id: ${id}`);
    logInfo(`base_version: ${base_version}`);

    // Search Result param

    let query = {};
    query.id = id;
    // TODO: Build query from Parameters

    // TODO: Query database
    // Grab an instance of our DB and collection
    let db = globals.get(CLIENT_DB);
    let collection = db.collection(`${collection_name}_${base_version}`);
    let Resource = getResource(base_version, resource_name);

    let resource;
    try {
        resource = await collection.findOne({id: id.toString()});
    } catch (e) {
        logger.error(`Error with ${resource_name}.searchById: `, e);
        throw new BadRequestError(e);
    }
    if (resource) {
        return new Resource(resource);
    } else {
        throw new NotFoundError();
    }
};

/**
 * does a FHIR Create (POST)
 * @param {string[]} args
 * @param {IncomingMessage} req
 * @param {string} resource_name
 * @param {string} collection_name
 */
module.exports.create = async (args, {req}, resource_name, collection_name) => {
    logRequest(`${resource_name} >>> create`);

    verifyHasValidScopes(resource_name, 'write', req.user, req.authInfo && req.authInfo.scope);

    let resource_incoming = req.body;

    let {base_version} = args;

    logInfo('--- request ----');
    logInfo(req);
    logInfo('-----------------');

    logInfo('--- body ----');
    logInfo(resource_incoming);
    logInfo('-----------------');
    const uuid = getUuid(resource_incoming);

    if (env.LOG_ALL_SAVES) {
        const currentDate = moment.utc().format('YYYY-MM-DD');
        await sendToS3('logs',
            resource_name,
            resource_incoming,
            currentDate,
            uuid,
            'create'
        );
    }

    const combined_args = get_all_args(req, args);
    if (env.VALIDATE_SCHEMA || combined_args['_validate']) {
        logInfo('--- validate schema ----');
        const operationOutcome = validateResource(resource_incoming, resource_name, req.path);
        if (operationOutcome && operationOutcome.statusCode === 400) {
            const currentDate = moment.utc().format('YYYY-MM-DD');
            operationOutcome.expression = [
                resource_name + '/' + uuid
            ];
            await sendToS3('validation_failures',
                resource_name,
                resource_incoming,
                currentDate,
                uuid,
                'create');
            await sendToS3('validation_failures',
                'OperationOutcome',
                operationOutcome,
                currentDate,
                uuid,
                'create_failure');
            throw new NotValidatedError(operationOutcome);
        }
        logInfo('-----------------');
    }

    try {
        // Grab an instance of our DB and collection (by version)
        let db = globals.get(CLIENT_DB);
        let collection = db.collection(`${collection_name}_${base_version}`);

        // Get current record
        let Resource = getResource(base_version, resource_name);
        logInfo(`Resource: ${Resource}`);
        let resource = new Resource(resource_incoming);
        // noinspection JSUnresolvedFunction
        logInfo(`resource: ${resource.toJSON()}`);

        // If no resource ID was provided, generate one.
        let id = getUuid(resource);
        logInfo(`id: ${id}`);

        // Create the resource's metadata
        /**
         * @type {function({Object}): Meta}
         */
        let Meta = getMeta(base_version);
        resource.meta = new Meta({
            versionId: '1',
            lastUpdated: moment.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
        });

        // Create the document to be inserted into Mongo
        // noinspection JSUnresolvedFunction
        let doc = JSON.parse(JSON.stringify(resource.toJSON()));
        Object.assign(doc, {id: id});

        // Create a clone of the object without the _id parameter before assigning a value to
        // the _id parameter in the original document
        let history_doc = Object.assign({}, doc);
        Object.assign(doc, {_id: id});

        logInfo('---- inserting doc ---');
        logInfo(doc);
        logInfo('----------------------');

        // Insert our resource record
        try {
            await collection.insertOne(doc);
        } catch (e) {
            // noinspection ExceptionCaughtLocallyJS
            throw new BadRequestError(e);
        }
        // Save the resource to history
        let history_collection = db.collection(`${collection_name}_${base_version}_History`);

        // Insert our resource record to history but don't assign _id
        await history_collection.insertOne(history_doc);
        return {id: doc.id, resource_version: doc.meta.versionId};
    } catch (e) {
        const currentDate = moment.utc().format('YYYY-MM-DD');
        logger.error(`Error with merging resource ${resource_name}.merge with id: ${uuid} `, e);

        await sendToS3('errors',
            resource_name,
            resource_incoming,
            currentDate,
            uuid,
            'create');
        throw e;
    }
};

/**
 * does a FHIR Update (PUT)
 * @param {string[]} args
 * @param {IncomingMessage} req
 * @param {string} resource_name
 * @param {string} collection_name
 */
module.exports.update = async (args, {req}, resource_name, collection_name) => {
    logRequest(`'${resource_name} >>> update`);

    verifyHasValidScopes(resource_name, 'write', req.user, req.authInfo && req.authInfo.scope);

    logInfo('--- request ----');
    logInfo(req);

    // read the incoming resource from request body
    let resource_incoming = req.body;
    let {base_version, id} = args;
    logInfo(base_version);
    logInfo(id);
    logInfo('--- body ----');
    logInfo(resource_incoming);

    if (env.LOG_ALL_SAVES) {
        const currentDate = moment.utc().format('YYYY-MM-DD');
        await sendToS3('logs',
            resource_name,
            resource_incoming,
            currentDate,
            id,
            'update');
    }

    const combined_args = get_all_args(req, args);
    if (env.VALIDATE_SCHEMA || combined_args['_validate']) {
        logInfo('--- validate schema ----');
        const operationOutcome = validateResource(resource_incoming, resource_name, req.path);
        if (operationOutcome && operationOutcome.statusCode === 400) {
            const currentDate = moment.utc().format('YYYY-MM-DD');
            const uuid = getUuid(resource_incoming);
            operationOutcome.expression = [
                resource_name + '/' + uuid
            ];
            await sendToS3('validation_failures',
                resource_name,
                resource_incoming,
                currentDate,
                uuid,
                'update');
            await sendToS3('validation_failures',
                resource_name,
                operationOutcome,
                currentDate,
                uuid,
                'update_failure');
            throw new NotValidatedError(operationOutcome);
        }
        logInfo('-----------------');
    }

    try {
        // Grab an instance of our DB and collection
        let db = globals.get(CLIENT_DB);
        let collection = db.collection(`${collection_name}_${base_version}`);

        // Get current record
        // Query our collection for this observation
        // noinspection JSUnresolvedVariable
        const data = await collection.findOne({id: id.toString()});
        // create a resource with incoming data
        let Resource = getResource(base_version, resource_name);

        let cleaned;
        let doc;

        // check if resource was found in database or not
        // noinspection JSUnresolvedVariable
        if (data && data.meta) {
            // found an existing resource
            logInfo('found resource: ' + data);
            let foundResource = new Resource(data);
            logInfo('------ found document --------');
            logInfo(data);
            logInfo('------ end found document --------');

            // use metadata of existing resource (overwrite any passed in metadata)
            resource_incoming.meta = foundResource.meta;
            logInfo('------ incoming document --------');
            logInfo(resource_incoming);
            logInfo('------ end incoming document --------');

            // now create a patch between the document in db and the incoming document
            //  this returns an array of patches
            let patchContent = compare(data, resource_incoming);
            // ignore any changes to _id since that's an internal field
            patchContent = patchContent.filter(item => item.path !== '/_id');
            logInfo('------ patches --------');
            logInfo(patchContent);
            logInfo('------ end patches --------');
            // see if there are any changes
            if (patchContent.length === 0) {
                logInfo('No changes detected in updated resource');
                return {
                    id: id,
                    created: false,
                    resource_version: foundResource.meta.versionId,
                };
            }
            if (env.LOG_ALL_SAVES) {
                const currentDate = moment.utc().format('YYYY-MM-DD');
                await sendToS3('logs',
                    resource_name,
                    patchContent,
                    currentDate,
                    id,
                    'update_patch');
            }
            // now apply the patches to the found resource
            let patched_incoming_data = applyPatch(data, patchContent).newDocument;
            let patched_resource_incoming = new Resource(patched_incoming_data);
            // update the metadata to increment versionId
            /**
             * @type {Meta}
             */
            let meta = foundResource.meta;
            meta.versionId = `${parseInt(foundResource.meta.versionId) + 1}`;
            meta.lastUpdated = moment.utc().format('YYYY-MM-DDTHH:mm:ssZ');
            patched_resource_incoming.meta = meta;
            logInfo('------ patched document --------');
            logInfo(patched_resource_incoming);
            logInfo('------ end patched document --------');
            // Same as update from this point on
            cleaned = JSON.parse(JSON.stringify(patched_resource_incoming));
            doc = Object.assign(cleaned, {_id: id});
            check_fhir_mismatch(cleaned, patched_incoming_data);
        } else {
            // not found so insert
            logInfo('update: new resource: ' + resource_incoming);
            // create the metadata
            let Meta = getMeta(base_version);
            resource_incoming.meta = new Meta({
                versionId: '1',
                lastUpdated: moment.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
            });
            cleaned = JSON.parse(JSON.stringify(resource_incoming));
            doc = Object.assign(cleaned, {_id: id});
        }

        // Insert/update our resource record
        // When using the $set operator, only the specified fields are updated
        const res = await collection.findOneAndUpdate({id: id}, {$set: doc}, {upsert: true});
        // save to history
        let history_collection = db.collection(`${collection_name}_${base_version}_History`);

        // let history_resource = Object.assign(cleaned, {id: id});
        let history_resource = Object.assign(cleaned, {_id: id + cleaned.meta.versionId});
        // delete history_resource['_id']; // make sure we don't have an _id field when inserting into history

        // Insert our resource record to history but don't assign _id
        await history_collection.insertOne(history_resource);

        return {
            id: id,
            created: res.lastErrorObject && !res.lastErrorObject.updatedExisting,
            resource_version: doc.meta.versionId,
        };
    } catch (e) {
        const currentDate = moment.utc().format('YYYY-MM-DD');
        logger.error(`Error with merging resource ${resource_name}.merge with id: ${id} `, e);

        await sendToS3('errors',
            resource_name,
            resource_incoming,
            currentDate,
            id,
            'update');
        throw e;
    }
};

/**
 * does a FHIR Merge
 * @param {string[]} args
 * @param {IncomingMessage} req
 * @param {string} resource_name
 * @param {string} collection_name
 * @return {Resource | Resource[]}
 */
module.exports.merge = async (args, {req}, resource_name, collection_name) => {
    logRequest(`'${resource_name} >>> merge`);

    verifyHasValidScopes(resource_name, 'write', req.user, req.authInfo && req.authInfo.scope);
    // read the incoming resource from request body
    /**
     * @type {Object[]}
     */
    let resources_incoming = req.body;
    logInfo(args);
    /**
     * @type {String}
     */
    let {base_version} = args;

    // logInfo('--- request ----');
    // logInfo(req);
    // logInfo('-----------------');

    // Assign a random number to this batch request
    /**
     * @type {string}
     */
    const requestId = Math.random().toString(36).substring(0, 5);
    /**
     * @type {string}
     */
    const currentDate = moment.utc().format('YYYY-MM-DD');

    logInfo('--- body ----');
    logInfo(resources_incoming);
    logInfo('-----------------');

    // this function is called for each resource
    // returns an OperationOutcome
    /**
     * @param {Object} resource_to_merge
     * @return {Promise<{issue: [{severity: string, diagnostics: *, code: string, expression: [string], details: {text: string}}], resourceType: string}|{created: boolean, id: String, message: string, updated: boolean, resource_version}|{created: (*|boolean), id: String, updated: *, resource_version}|*>}
     */
    async function merge_resource(resource_to_merge) {
        /**
         * @type {String}
         */
        let id = resource_to_merge.id;

        if (env.LOG_ALL_SAVES) {
            await sendToS3('logs',
                resource_name,
                resource_to_merge,
                currentDate,
                id,
                'merge_' + requestId);
        }

        /**
         * @type {string[]}
         */
        const combined_args = get_all_args(req, args);
        if (env.VALIDATE_SCHEMA || combined_args['_validate']) {
            logInfo('--- validate schema ----');
            /**
             * @type {?OperationOutcome}
             */
            const operationOutcome = validateResource(resource_to_merge, resource_name, req.path);
            if (operationOutcome && operationOutcome.statusCode === 400) {
                operationOutcome['expression'] = [
                    resource_name + '/' + id
                ];
                await sendToS3('validation_failures',
                    resource_name,
                    resource_to_merge,
                    currentDate,
                    id,
                    'merge');
                await sendToS3('validation_failures',
                    resource_name,
                    operationOutcome,
                    currentDate,
                    id,
                    'merge_failure');
                return operationOutcome;
            }
            logInfo('-----------------');
        }
        try {
            logInfo('-----------------');
            logInfo(base_version);
            logInfo('--- body ----');
            logInfo(resource_to_merge);

            // Grab an instance of our DB and collection
            /**
             * @type {Db}
             */
            let db = globals.get(CLIENT_DB);
            /**
             * @type {Collection}
             */
            let collection = db.collection(`${collection_name}_${base_version}`);

            // Query our collection for this id
            /**
             * @type {Object}
             */
            let data = await collection.findOne({id: id.toString()});

            // create a resource with incoming data
            /**
             * @type {function({Object}):Resource}
             */
            let Resource = getResource(base_version, resource_name);

            /**
             * @type {Object}
             */
            let cleaned;
            /**
             * @type {Object}
             */
            let doc;

            // check if resource was found in database or not
            // noinspection JSUnusedLocalSymbols
            if (data && data.meta) {
                // found an existing resource
                logInfo(resource_name + ': merge found resource ' + '[' + data.id + ']: ' + data);
                /**
                 * @type {Resource}
                 */
                let foundResource = new Resource(data);
                logInfo('------ found document --------');
                logInfo(data);
                logInfo('------ end found document --------');

                // use metadata of existing resource (overwrite any passed in metadata)
                if (!resource_to_merge.meta) {
                    resource_to_merge.meta = {};
                }
                // compare without checking source so we don't create a new version just because of a difference in source
                /**
                 * @type {string}
                 */
                const original_source = resource_to_merge.meta.source;
                resource_to_merge.meta.versionId = foundResource.meta.versionId;
                resource_to_merge.meta.lastUpdated = foundResource.meta.lastUpdated;
                resource_to_merge.meta.source = foundResource.meta.source;
                logInfo('------ incoming document --------');
                logInfo(resource_to_merge);
                logInfo('------ end incoming document --------');

                /**
                 * @type {Object}
                 */
                const my_data = deepcopy(data);
                delete my_data['_id']; // remove _id since that is an internal

                // for speed, first check if the incoming resource is exactly the same
                if (deepEqual(my_data, resource_to_merge) === true) {
                    logInfo('No changes detected in updated resource');
                    return {
                        id: id,
                        created: false,
                        updated: false,
                        resource_version: foundResource.meta.versionId,
                        message: 'No changes detected in updated resource'
                    };
                }

                let mergeObjectOrArray;
                /**
                 * @type {{customMerge: (function(*): *)}}
                 */
                    // noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
                const options = {
                        // eslint-disable-next-line no-unused-vars
                        customMerge: (/*key*/) => {
                            return mergeObjectOrArray;
                        }
                    };
                /**
                 * @param {?Object | Object[]} oldItem
                 * @param {?Object | Object[]} newItem
                 * @return {?Object | Object[]}
                 */
                mergeObjectOrArray = (oldItem, newItem) => {
                    if (deepEqual(oldItem, newItem)) {
                        return oldItem;
                    }
                    if (Array.isArray(oldItem)) {
                        /**
                         * @type {? Object[]}
                         */
                        let result_array = null;
                        // iterate through all the new array and find any items that are not present in old array
                        for (let i = 0; i < newItem.length; i++) {
                            /**
                             * @type {Object}
                             */
                            let my_item = newItem[`${i}`];
                            // if newItem[i] does not matches any item in oldItem then insert
                            if (oldItem.every(a => deepEqual(a, my_item) === false)) {
                                if ('id' in my_item) {
                                    // find item in oldItem array that matches this one by id
                                    /**
                                     * @type {number}
                                     */
                                    const matchingOldItemIndex = oldItem.findIndex(x => x['id'] === my_item['id']);
                                    if (matchingOldItemIndex > -1) {
                                        // check if id column exists and is the same
                                        //  then recurse down and merge that item
                                        if (result_array === null) {
                                            result_array = deepcopy(oldItem); // deep copy so we don't change the original object
                                        }
                                        result_array[`${matchingOldItemIndex}`] = deepmerge(oldItem[`${matchingOldItemIndex}`], my_item, options);
                                        continue;
                                    }
                                }
                                // insert based on sequence if present
                                if ('sequence' in my_item) {
                                    /**
                                     * @type {Object[]}
                                     */
                                    result_array = [];
                                    // go through the list until you find a sequence number that is greater than the new
                                    // item and then insert before it
                                    /**
                                     * @type {number}
                                     */
                                    let index = 0;
                                    /**
                                     * @type {boolean}
                                     */
                                    let insertedItem = false;
                                    while (index < oldItem.length) {
                                        /**
                                         * @type {Object}
                                         */
                                        const element = oldItem[`${index}`];
                                        // if item has not already been inserted then insert before the next sequence
                                        if (!insertedItem && (element['sequence'] > my_item['sequence'])) {
                                            result_array.push(my_item); // add the new item before
                                            result_array.push(element); // then add the old item
                                            insertedItem = true;
                                        } else {
                                            result_array.push(element); // just add the old item
                                        }
                                        index += 1;
                                    }
                                    if (!insertedItem) {
                                        // if no sequence number greater than this was found then add at the end
                                        result_array.push(my_item);
                                    }
                                } else {
                                    // no sequence property is set on this item so just insert at the end
                                    if (result_array === null) {
                                        result_array = deepcopy(oldItem); // deep copy so we don't change the original object
                                    }
                                    result_array.push(my_item);
                                }
                            }
                        }
                        if (result_array !== null) {
                            return result_array;
                        } else {
                            return oldItem;
                        }
                    }
                    return deepmerge(oldItem, newItem, options);
                };

                // data seems to get updated below
                /**
                 * @type {Object}
                 */
                let resource_merged = deepmerge(data, resource_to_merge, options);

                // now create a patch between the document in db and the incoming document
                //  this returns an array of patches
                /**
                 * @type {Operation[]}
                 */
                let patchContent = compare(data, resource_merged);
                // ignore any changes to _id since that's an internal field
                patchContent = patchContent.filter(item => item.path !== '/_id');
                logInfo('------ patches --------');
                logInfo(patchContent);
                logInfo('------ end patches --------');
                // see if there are any changes
                if (patchContent.length === 0) {
                    logInfo('No changes detected in updated resource');
                    return {
                        id: id,
                        created: false,
                        updated: false,
                        resource_version: foundResource.meta.versionId,
                        message: 'No changes detected in updated resource'
                    };
                }
                logRequest(`${resource_name} >>> merging ${id}`);
                // now apply the patches to the found resource
                // noinspection JSCheckFunctionSignatures
                /**
                 * @type {Object}
                 */
                let patched_incoming_data = applyPatch(data, patchContent).newDocument;
                /**
                 * @type {Object}
                 */
                let patched_resource_incoming = new Resource(patched_incoming_data);
                // update the metadata to increment versionId
                /**
                 * @type {{versionId: string, lastUpdated: string, source: string}}
                 */
                let meta = foundResource.meta;
                meta.versionId = `${parseInt(foundResource.meta.versionId) + 1}`;
                meta.lastUpdated = moment.utc().format('YYYY-MM-DDTHH:mm:ssZ');
                // set the source from the incoming resource
                meta.source = original_source;
                patched_resource_incoming.meta = meta;
                logInfo('------ patched document --------');
                logInfo(patched_resource_incoming);
                logInfo('------ end patched document --------');
                // Same as update from this point on
                cleaned = JSON.parse(JSON.stringify(patched_resource_incoming));
                check_fhir_mismatch(cleaned, patched_incoming_data);
                doc = Object.assign(cleaned, {_id: id});
                if (env.LOG_ALL_MERGES) {
                    await sendToS3('logs',
                        resource_name,
                        {
                            'old': data,
                            'new': resource_to_merge,
                            'patch': patchContent,
                            'after': doc
                        },
                        currentDate,
                        id,
                        'merge_' + meta.versionId + '_' + requestId);
                }
            } else {
                // not found so insert
                logInfo(resource_name + ': merge new resource ' + '[' + resource_to_merge.id + ']: ' + resource_to_merge);
                if (!resource_to_merge.meta) {
                    // create the metadata
                    /**
                     * @type {function({Object}): Meta}
                     */
                    let Meta = getMeta(base_version);
                    resource_to_merge.meta = new Meta({
                        versionId: '1',
                        lastUpdated: moment.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
                    });
                } else {
                    resource_to_merge.meta.versionId = '1';
                    resource_to_merge.meta.lastUpdated = moment.utc().format('YYYY-MM-DDTHH:mm:ssZ');
                }

                cleaned = JSON.parse(JSON.stringify(resource_to_merge));
                doc = Object.assign(cleaned, {_id: id});
            }

            // Insert/update our resource record
            // When using the $set operator, only the specified fields are updated
            /**
             * @type {Object}
             */
            let res = await collection.findOneAndUpdate({id: id.toString()}, {$set: doc}, {upsert: true});

            // save to history
            /**
             * @type {Collection}
             */
            let history_collection = db.collection(`${collection_name}_${base_version}_History`);
            /**
             * @type {Object & {_id: string}}
             */
            let history_resource = Object.assign(cleaned, {_id: id + cleaned.meta.versionId});
            /**
             * @type {boolean}
             */
            const created_entity = res.lastErrorObject && !res.lastErrorObject.updatedExisting;
            // Insert our resource record to history but don't assign _id
            delete history_resource['_id']; // make sure we don't have an _id field when inserting into history
            await history_collection.insertOne(history_resource);
            return {
                id: id,
                created: created_entity,
                updated: res.lastErrorObject.updatedExisting,
                resource_version: doc.meta.versionId
            };
        } catch (e) {
            logger.error(`Error with merging resource ${resource_name}.merge with id: ${id} `, e);
            const operationOutcome = {
                resourceType: 'OperationOutcome',
                issue: [
                    {
                        severity: 'error',
                        code: 'exception',
                        details: {
                            text: 'Error merging: ' + resource_to_merge
                        },
                        diagnostics: e.toString(),
                        expression: [
                            resource_name + '/' + id
                        ]
                    }
                ]
            };
            await sendToS3('errors',
                resource_name,
                resource_to_merge,
                currentDate,
                id,
                'merge');
            await sendToS3('errors',
                resource_name,
                operationOutcome,
                currentDate,
                id,
                'merge_error');
            return operationOutcome;
        }
    }

        /**
     * Tries to merge and retries if there is an error to protect against race conditions where 2 calls are happening
     *  in parallel for the same resource. Both of them see that the resource does not exist, one of them inserts it
     *  and then the other ones tries to insert too
     * @param {Object} resource_to_merge
     * @return {Promise<{issue: [{severity: string, diagnostics: *, code: string, expression: [string], details: {text: string}}], resourceType: string}|{created: boolean, id: String, message: string, updated: boolean, resource_version}|{created: (*|boolean), id: String, updated: *, resource_version}|*>}
     */
    async function merge_resource_with_retry(resource_to_merge) {
        let triesLeft = 2;

        do {
            try {
                return await merge_resource(resource_to_merge);
            } catch (e) {
                triesLeft = triesLeft - 1;
            }
        } while (triesLeft >= 0);
    }

    if (Array.isArray(resources_incoming)) {
        logRequest('==================' + resource_name + ': Merge received array ' + '(' + resources_incoming.length + ') ' + '====================');
        // find items without duplicates and run them in parallel
        // but items with duplicate ids should run in serial so we can merge them properly (otherwise the first item
        //  may not finish adding to the db before the next item tries to merge
        // https://stackoverflow.com/questions/53212020/get-list-of-duplicate-objects-in-an-array-of-objects
        // create a lookup_by_id for duplicate ids
        /**
         * @type {Object}
         */
        const lookup_by_id = resources_incoming.reduce((a, e) => {
            a[e.id] = ++a[e.id] || 0;
            return a;
        }, {});
        /**
         * @type {Object[]}
         */
        const duplicate_id_resources = resources_incoming.filter(e => lookup_by_id[e.id]);
        /**
         * @type {Object[]}
         */
        const non_duplicate_id_resources = resources_incoming.filter(e => !lookup_by_id[e.id]);

        return await Promise.all([
            async.map(non_duplicate_id_resources, async x => await merge_resource_with_retry(x)), // run in parallel
            async.mapSeries(duplicate_id_resources, async x => await merge_resource_with_retry(x)) // run in series
        ]);
    } else {
        return await merge_resource_with_retry(resources_incoming);
    }
};

/**
 * does a FHIR $everything
 * @param {string[]} args
 * @param {IncomingMessage} req
 * @param {string} resource_name
 * @param {string} collection_name
 */
// eslint-disable-next-line no-unused-vars
module.exports.everything = async (args, {req}, resource_name, collection_name) => {
    logRequest(`${resource_name} >>> everything`);
    verifyHasValidScopes(resource_name, 'read', req.user, req.authInfo && req.authInfo.scope);
    try {
        let {base_version, id} = args;

        logRequest(`id=${id}`);
        logInfo(`req=${req}`);

        const host = req.headers.host;
        // for now we only support Practitioner
        let query = {};
        query.id = id;
        // Grab an instance of our DB and collection
        let db = globals.get(CLIENT_DB);
        collection_name = 'Practitioner'; // for now we only support this for Practitioner
        let collection = db.collection(`${collection_name}_${base_version}`);
        const PractitionerResource = getResource(base_version, resource_name);

        let practitioner = await collection.findOne({id: id.toString()});
        // noinspection JSUnresolvedFunction
        if (practitioner) {
            // first add the Practitioner
            let entries = [{
                'link': `https://${host}/${base_version}/${practitioner.resourceType}/${practitioner.id}`,
                'resource': new PractitionerResource(practitioner)
            }];
            // now look for practitioner_role
            collection_name = 'PractitionerRole';
            collection = db.collection(`${collection_name}_${base_version}`);
            const PractitionerRoleResource = getResource(base_version, collection_name);
            query = {
                'practitioner.reference': 'Practitioner/' + id
            };
            const cursor = collection.find(query);
            // noinspection JSUnresolvedFunction
            const practitioner_roles = await cursor.toArray();

            // noinspection JSUnresolvedFunction
            // const practitioner_roles = items;
            for (const index in practitioner_roles) {
                // noinspection JSUnfilteredForInLoop
                const practitioner_role = practitioner_roles[`${index}`];
                // for some reason a simple append doesn't work here
                entries = entries.concat(
                    [
                        {
                            'link': `https://${host}/${base_version}/${practitioner_role.resourceType}/${practitioner_role.id}`,
                            'resource': new PractitionerRoleResource(practitioner_role)
                        }
                    ]
                );
                // entries += {
                //     'resource': 'foo'
                // };
                // now for each PractitionerRole, get the Organization
                collection_name = 'Organization';
                collection = db.collection(`${collection_name}_${base_version}`);
                const OrganizationRoleResource = getResource(base_version, collection_name);
                if (practitioner_role.organization) {
                    const organization_id = practitioner_role.organization.reference.replace(collection_name + '/', '');

                    const organization = await collection.findOne({id: organization_id.toString()});
                    if (organization) {
                        entries = entries.concat(
                            [{
                                'link': `https://${host}/${base_version}/${organization.resourceType}/${organization.id}`,
                                'resource': new OrganizationRoleResource(organization)
                            }]);
                    }
                }
                // now for each PractitionerRole, get the Location
                collection_name = 'Location';
                collection = db.collection(`${collection_name}_${base_version}`);
                const LocationRoleResource = getResource(base_version, collection_name);
                if (practitioner_role.location && practitioner_role.location.length > 0) {
                    const location_id = practitioner_role.location[0].reference.replace(collection_name + '/', '');

                    const location = await collection.findOne({id: location_id.toString()});
                    if (location) {
                        entries = entries.concat(
                            [{
                                'link': `https://${host}/${base_version}/${location.resourceType}/${location.id}`,
                                'resource': new LocationRoleResource(location)
                            }]);
                    }
                }
                // now for each PractitionerRole, get the HealthcareService
                collection_name = 'HealthcareService';
                collection = db.collection(`${collection_name}_${base_version}`);
                const HealthcareServiceRoleResource = getResource(base_version, collection_name);
                if (practitioner_role.healthcareService && practitioner_role.healthcareService.length > 0) {
                    const healthcareService_id = practitioner_role.healthcareService[0].reference.replace(collection_name + '/', '');

                    const healthcareService = await collection.findOne({id: healthcareService_id.toString()});
                    if (healthcareService) {
                        entries = entries.concat(
                            [{
                                'link': `https://${host}/${base_version}/${healthcareService.resourceType}/${healthcareService.id}`,
                                'resource': new HealthcareServiceRoleResource(healthcareService)
                            }]);
                    }
                }
                // now for each PractitionerRole, get the InsurancePlan
                collection_name = 'InsurancePlan';
                collection = db.collection(`${collection_name}_${base_version}`);
                const InsurancePlanResource = getResource(base_version, collection_name);
                if (practitioner_role.extension && practitioner_role.extension.length > 0) {
                    const first_level_extension = practitioner_role.extension[0];
                    if (first_level_extension.url.endsWith('insurance_plan') && first_level_extension.extension.length > 0) {
                        const insurancePlanId = first_level_extension.extension[0].valueReference.reference.replace(collection_name + '/', '');

                        const insurancePlan = await collection.findOne({id: insurancePlanId.toString()});
                        if (insurancePlan) {
                            entries = entries.concat(
                                [{
                                    'link': `https://${host}/${base_version}/${insurancePlan.resourceType}/${insurancePlan.id}`,
                                    'resource': new InsurancePlanResource(insurancePlan)
                                }]);
                        }
                    }
                }
            }

            // create a bundle
            return (
                {
                    'resourceType': 'Bundle',
                    'id': 'bundle-example',
                    'entry': entries
                });
        }

    } catch (err) {
        logger.error(`Error with ${resource_name}.searchById: `, err);
        throw new BadRequestError(err);
    }
};

/**
 * does a FHIR Remove (DELETE)
 * @param {string[]} args
 * @param {IncomingMessage} req
 * @param {string} resource_name
 * @param {string} collection_name
 */
// eslint-disable-next-line no-unused-vars
module.exports.remove = async (args, {req}, resource_name, collection_name) => {
    logRequest(`${resource_name} >>> remove`);
    verifyHasValidScopes(resource_name, 'write', req.user, req.authInfo && req.authInfo.scope);

    let {base_version, id} = args;

    logInfo(`Deleting id=${id}`);

    // Grab an instance of our DB and collection
    let db = globals.get(CLIENT_DB);
    let collection = db.collection(`${collection_name}_${base_version}`);
    // Delete our resource record
    let res;
    try {
        res = await collection.deleteOne({id: id});
    } catch (e) {
        logger.error(`Error with ${resource_name}.remove`);
        throw new NotAllowedError(e.message);
    }
    // delete history as well.  You can chose to save history.  Up to you
    let history_collection = db.collection(`${collection_name}_${base_version}_History`);
    try {
        await history_collection.deleteMany({id: id});
    } catch (e) {
        logger.error(`Error with ${resource_name}.remove`);
        throw new NotAllowedError(e.message);
    }
    return {deleted: res.result && res.result.n};
};

/**
 * does a FHIR Search By Version
 * @param {string[]} args
 * @param {IncomingMessage} req
 * @param {string} resource_name
 * @param {string} collection_name
 */
// eslint-disable-next-line no-unused-vars
module.exports.searchByVersionId = async (args, {req}, resource_name, collection_name) => {
    logRequest(`${resource_name} >>> searchByVersionId`);
    verifyHasValidScopes(resource_name, 'read', req.user, req.authInfo && req.authInfo.scope);

    let {base_version, id, version_id} = args;

    let Resource = getResource(base_version, resource_name);

    let db = globals.get(CLIENT_DB);
    let history_collection = db.collection(`${collection_name}_${base_version}_History`);

    // Query our collection for this observation
    let resource;
    try {
        resource = await history_collection.findOne(
            {id: id.toString(), 'meta.versionId': `${version_id}`});
    } catch (e) {
        throw new BadRequestError(e);
    }
    if (resource) {
        return (new Resource(resource));
    } else {
        throw new NotFoundError();
    }
};

/**
 * does a FHIR History
 * @param {string[]} args
 * @param {IncomingMessage} req
 * @param {string} resource_name
 * @param {string} collection_name
 */
// eslint-disable-next-line no-unused-vars
module.exports.history = async (args, {req}, resource_name, collection_name) => {
    logRequest(`${resource_name} >>> history`);
    verifyHasValidScopes(resource_name, 'read', req.user, req.authInfo && req.authInfo.scope);

    // Common search params
    let {base_version} = args;

    let query = {};

    if (base_version === VERSIONS['3_0_1']) {
        query = buildStu3SearchQuery(args);
    } else if (base_version === VERSIONS['1_0_2']) {
        query = buildDstu2SearchQuery(args);
    }

    // Grab an instance of our DB and collection
    let db = globals.get(CLIENT_DB);
    let history_collection = db.collection(`${collection_name}_${base_version}_History`);
    let Resource = getResource(base_version, resource_name);

    // Query our collection for this observation
    let cursor;
    try {
        cursor = await history_collection.find(query);
    } catch (e) {
        throw new NotFoundError(e.message);
    }
    const resources = [];
    while (await cursor.hasNext()) {
        const element = await cursor.next();
        resources.push(new Resource(element));
    }
    if (resources.length === 0) {
        throw new NotFoundError();
    }
    return (resources);
};

/**
 * does a FHIR History By Id
 * @param {string[]} args
 * @param {IncomingMessage} req
 * @param {string} resource_name
 * @param {string} collection_name
 */
// eslint-disable-next-line no-unused-vars
module.exports.historyById = async (args, {req}, resource_name, collection_name) => {
    logRequest(`${resource_name} >>> historyById`);
    verifyHasValidScopes(resource_name, 'read', req.user, req.authInfo && req.authInfo.scope);

    let {base_version, id} = args;
    let query = {};

    if (base_version === VERSIONS['3_0_1']) {
        query = buildStu3SearchQuery(args);
    } else if (base_version === VERSIONS['1_0_2']) {
        query = buildDstu2SearchQuery(args);
    }

    query.id = `${id}`;

    // Grab an instance of our DB and collection
    let db = globals.get(CLIENT_DB);
    let history_collection = db.collection(`${collection_name}_${base_version}_History`);
    let Resource = getResource(base_version, resource_name);

    // Query our collection for this observation
    let cursor;
    try {
        cursor = await history_collection.find(query);
    } catch (e) {
        logger.error(`Error with ${resource_name}.historyById: `, e);
        throw new BadRequestError(e);
    }
    const resources = [];
    while (await cursor.hasNext()) {
        const element = await cursor.next();
        resources.push(new Resource(element));
    }
    if (resources.length === 0) {
        throw new NotFoundError();
    }
    return (resources);
};

/**
 * does a FHIR Patch
 * @param {string[]} args
 * @param {IncomingMessage} req
 * @param {string} resource_name
 * @param {string} collection_name
 */
// eslint-disable-next-line no-unused-vars
module.exports.patch = async (args, {req}, resource_name, collection_name) => {
    logRequest('Patient >>> patch');
    verifyHasValidScopes(resource_name, 'write', req.user, req.authInfo && req.authInfo.scope);

    let {base_version, id, patchContent} = args;

    // Grab an instance of our DB and collection
    let db = globals.get(CLIENT_DB);
    let collection = db.collection(`${collection_name}_${base_version}`);

    // Get current record
    // Query our collection for this observation
    let data;
    try {
        data = await collection.findOne({id: id.toString()});
    } catch (e) {
        logger.error(`Error with ${resource_name}.patch: `, e);
        throw new BadRequestError(e);
    }
    if (!data) {
        throw new NotFoundError();
    }
    // Validate the patch
    let errors = validate(patchContent, data);
    if (errors && Object.keys(errors).length > 0) {
        logger.error('Error with patch contents');
        throw new BadRequestError(errors[0]);
    }
    // Make the changes indicated in the patch
    let resource_incoming = applyPatch(data, patchContent).newDocument;

    let Resource = getResource(base_version, resource_name);
    let resource = new Resource(resource_incoming);

    if (data && data.meta) {
        let foundResource = new Resource(data);
        let meta = foundResource.meta;
        // noinspection JSUnresolvedVariable
        meta.versionId = `${parseInt(foundResource.meta.versionId) + 1}`;
        resource.meta = meta;
    } else {
        throw new BadRequestError(new Error('Unable to patch resource. Missing either data or metadata.'));
    }

    // Same as update from this point on
    let cleaned = JSON.parse(JSON.stringify(resource));
    let doc = Object.assign(cleaned, {_id: id});

    // Insert/update our resource record
    let res;
    try {
        res = await collection.findOneAndUpdate({id: id}, {$set: doc}, {upsert: true});
    } catch (e) {
        logger.error(`Error with ${resource_name}.update: `, e);
        throw new BadRequestError(e);
    }
    // Save to history
    let history_collection = db.collection(`${collection_name}_${base_version}_History`);
    let history_resource = Object.assign(cleaned, {_id: id + cleaned.meta.versionId});

    // Insert our resource record to history but don't assign _id
    try {
        await history_collection.insertOne(history_resource);
    } catch (e) {
        logger.error(`Error with ${resource_name}History.create: `, e);
        throw new BadRequestError(e);
    }
    return {
        id: doc.id,
        created: res.lastErrorObject && !res.lastErrorObject.updatedExisting,
        resource_version: doc.meta.versionId,
    };
};

/**
 * does a FHIR Validate
 * @param {string[]} args
 * @param {IncomingMessage} req
 * @param {string} resource_name
 * @param {string} collection_name
 */
// eslint-disable-next-line no-unused-vars
module.exports.validate = async (args, {req}, resource_name) => {
    logRequest(`${resource_name} >>> validate`);

    // no auth check needed to call validate

    let resource_incoming = req.body;

    // eslint-disable-next-line no-unused-vars
    // let {base_version} = args;

    logInfo('--- request ----');
    logInfo(req);
    logInfo('-----------------');

    logInfo('--- body ----');
    logInfo(resource_incoming);
    logInfo('-----------------');


    logInfo('--- validate schema ----');
    const operationOutcome = validateResource(resource_incoming, resource_name, req.path);
    if (operationOutcome && operationOutcome.statusCode === 400) {
        return operationOutcome;
    }

    return {
        resourceType: 'OperationOutcome',
        issue: [
            {
                severity: 'information',
                code: 'informational',
                details: {
                    text: 'OK'
                },
                expression: [
                    resource_name
                ]
            }
        ]
    };
};
