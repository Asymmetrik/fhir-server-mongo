const JSONValidator = require('@asymmetrik/fhir-json-schema-validator');
const {resolveSchema} = require('@asymmetrik/node-fhir-server-core');

const validator = new JSONValidator();
const schema = validator.schema;
const OperationOutcome = resolveSchema('4_0_0', 'operationoutcome');

/**
 * By default, ajv uses fhir.json.schema but only returns first error it finds.
 * We want it to return all errors to ease user frustration when sending invalid paylaod.
 */
const validatorConfig = {
    allErrors: true,
    logger: {
        log: function log() {
        },
        warn: function warn() {
        },
        error: console.error.bind(console),
    },
};
const fhirValidator = new JSONValidator(schema, validatorConfig);

/**
 * @function validateResource
 * @description - validates name is correct for resource body and resource body conforms to FHIR specification
 * @param {*} resourceBody - payload of req.body
 * @param {string} resourceName - name of resource in url
 * @param {string} path - req.path from express
 * @returns {*} Response<null|OperationOutcome> - either null if no errors or response to send client.
 */
function validateResource(resourceBody, resourceName, path) {
    if (resourceBody.resourceType !== resourceName) {
        return new OperationOutcome({
            statusCode: 400,
            issue: [
                {
                    severity: 'error',
                    code: 'invalid',
                    details: {
                        text: `${path} does not match request payload ${resourceBody.resourceType}`,
                    },
                },
            ],
        });
    }

    const errors = fhirValidator.validate(resourceBody);
    if (errors && errors.length) {
        const issue = errors.map((elm) => {
            return {
                severity: 'error',
                code: 'invalid',
                details: {
                    text: `${path} ${elm.message} :${JSON.stringify(elm.params)}: at position ${
                        elm.dataPath ? elm.dataPath : 'root'
                    }`,
                },
            };
        });

        return new OperationOutcome({
            statusCode: 400,
            issue: issue,
        });
    }

    return null;
}

module.exports = {validateResource, fhirValidator};
