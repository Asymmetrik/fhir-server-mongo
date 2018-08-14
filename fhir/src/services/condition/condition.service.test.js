/* eslint-disable */
const ConditionFixture = require('../../../fixtures/data/patient00/condition00.json');
const { CLIENT, CLIENT_DB } = require('../../constants');
const asyncHandler = require('../../lib/async-handler');
const logger = require('../../testutils/logger.mock');
const conditionService = require('./condition.service');
const { mongoConfig } = require('../../config');
const mongoClient = require('../../lib/mongo');
let globals = require('../../globals');

describe('Condition Service Test', () => {

    beforeAll(async () => {

        let [err, client] = await asyncHandler(
            mongoClient(mongoConfig.connection, mongoConfig.options)
        );

        // We should fail these tests if we can't connect,
        // they won't work without the connection
        if (err) {
            throw err;
        }

        globals.set(CLIENT, client);
        globals.set(CLIENT_DB, client.db(mongoConfig.db_name));

    });

    afterAll(() => {
        let client = globals.get(CLIENT);
        client.close();
    });

    describe('Method: count', () => {

        test('should correctly pass back the count', async () => {
            let [err, results] = await asyncHandler(
                conditionService.count(null, logger)
            );

            expect(err).toBeUndefined();
            expect(results).toEqual(53);
        });

    });

    describe('Method: search', () => {

        test('should return 3 patients', async () => {
            let args = { patient: 'example', clinicalStatus: 'active', verificationStatus: 'confirmed' };
            let contexts = {};
            let [ err, docs ] = await asyncHandler(
                conditionService.search(args, contexts, logger)
            );

            expect(err).toBeUndefined();
            expect(docs.length).toEqual(3);

            docs.forEach(doc => {
                expect(doc.subject.reference).toEqual(`Patient/${args.patient}`);
                expect(doc.clinicalStatus).toEqual(args.clinicalStatus);
                expect(doc.verificationStatus).toEqual(args.verificationStatus);
            });

        });

        test('should return doc with specific code', async () => {
            let args = { patient: 'example', category: 'http://hl7.org/fhir/us/core/CodeSystem/condition-category|problem', code: '442311008' };
            let contexts = {};
            let [ err, docs ] = await asyncHandler(
                conditionService.search(args, contexts, logger)
            );

            expect(err).toBeUndefined();
            expect(docs.length).toEqual(1);

            docs.forEach(doc => {
                expect(doc.subject.reference).toEqual(`Patient/${args.patient}`);
                expect(doc.category[0].coding[0].system).toEqual('http://hl7.org/fhir/us/core/CodeSystem/condition-category');
                expect(doc.category[0].coding[0].code).toEqual('problem');
                expect(doc.code.coding[0].system).toEqual('http://snomed.info/sct');
                expect(doc.code.coding[0].code).toEqual('442311008');
            })

        });

        test('testing some added search params', async () => {
            let args = { _id: '0', patient: 'example', abatementAge: '56|http://snomed.info/sct|yr',
                abatementString: 'around', abatementBoolean: 'true', bodySite: 'http://snomed.info/sct|51185008',
                asserter: 'Practitioner/f223', context: 'Encounter/f203', evidence: 'http://snomed.info/sct|169068008',
                detail: 'Observation/f202', identifier: '12345', onsetAge: '52|http://unitsofmeasure.org|a',
                severity: 'http://snomed.info/sct|255604002', stage: 'http://snomed.info/sct|14803004',
                subject: 'Patient/example', onsetString: 'approx', assertedDate: '2016-08-10',
              onsetDate: '2013-04-02T04:30', abatementDate: '2014-03-12T04:30:44' };
            let contexts = {};
            let [ err, docs ] = await asyncHandler(
                conditionService.search(args, contexts, logger)
            );

            expect(err).toBeUndefined();
            expect(docs.length).toEqual(1);

            docs.forEach(doc => {
                expect(doc.id).toEqual(args._id);
                expect(doc.ffffttyie).toEqual(undefined);
                expect(doc.subject.reference).toEqual(`Patient/${args.patient}`);
                expect(doc.abatementAge.value).toEqual(56);
                expect(doc.abatementAge.code).toEqual('yr');
                expect(doc.abatementAge.system).toEqual('http://snomed.info/sct');
                expect(doc.abatementString).toEqual('around 8/10');
                expect(doc.abatementBoolean).toEqual(true);
                expect(doc.asserter.reference).toEqual(args.asserter);
                expect(doc.bodySite[0].coding[0].system).toEqual('http://snomed.info/sct');
                expect(doc.bodySite[0].coding[0].code).toEqual('51185008');
                expect(doc.context.reference).toEqual('Encounter/f203');
                expect(doc.evidence[0].code[0].coding[0].system).toEqual('http://snomed.info/sct');
                expect(doc.evidence[0].code[0].coding[0].code).toEqual('169068008');
                expect(doc.evidence[0].detail[0].reference).toEqual('Observation/f202');
                expect(doc.identifier[0].value).toEqual(args.identifier)
                expect(doc.onsetAge.value).toEqual(52);
                expect(doc.onsetAge.code).toEqual('a');
                expect(doc.onsetAge.system).toEqual('http://unitsofmeasure.org');
                expect(doc.onsetString).toEqual('approximately November 2012');
                expect(doc.severity.coding[0].system).toEqual('http://snomed.info/sct');
                expect(doc.severity.coding[0].code).toEqual('255604002');
                expect(doc.stage.summary.coding[0].system).toEqual('http://snomed.info/sct');
                expect(doc.stage.summary.coding[0].code).toEqual('14803004');
                expect(doc.assertedDate).toEqual('2016-08-10');
                expect(doc.abatementDateTime).toEqual('2014-03-12T04:30');
                //expect(doc.onsetDateTime).toEqual('2013-04-02T03:30Z')
                expect(doc.subject.reference).toEqual(args.subject);
            });

        });
    });

    describe('Method: searchById', () => {

        test('should correctly return a document', async () => {
            let args = {id: '0'};
            let contexts = {};
            let [err, doc] = await asyncHandler(
                conditionService.searchById(args, contexts, logger)
            );

            expect(err).toBeUndefined();
            expect(doc.id).toEqual(args.id);
        });

    });

    describe('Method: remove', () => {

        // For these tests, let's do it in 3 steps
        // 1. Check the condition exists
        // 2. Delete a condition and make sure it does not throw
        // 3. Check the condition does not exist

        test('should successfully delete a document', async () => {

            // Look for this particular fixture
            let args = { id: '0' };
            let contexts = {};
            let [ err, doc ] = await asyncHandler(
                conditionService.searchById(args, contexts, logger)
            );

            expect(err).toBeUndefined();
            expect(doc.id).toEqual(args.id);

            // Now delete this fixture
            let [ delete_err, _ ] = await asyncHandler(
                conditionService.remove(args, logger)
            );

            // There is no response resolved from this promise, so just check for an error
            expect(delete_err).toBeUndefined();

            // Now query for the fixture again, there should be no documents
            let [ query_err, missing_doc ] = await asyncHandler(
                conditionService.searchById(args, contexts, logger)
            );

            expect(query_err).toBeUndefined();
            expect(missing_doc).toBeNull();

        });

    });

    describe('Method: create', () => {

        // This Fixture was previously deleted, we are going to ensure before creating it
        // 1. Delete fixture
        // 2. Create fixture
        // 3. Query for fixture

        test('should successfully create a document', async () => {

            // Look for this particular fixture
            let args = {
                resource: {
                    toJSON: () => ConditionFixture
                },
                id: '0'
            };
            let contexts = {};

            // Delete the fixture incase it exists,
            // mongo won't throw if we delete something not there
            let [ delete_err, _ ] = await asyncHandler(
                conditionService.remove(args, logger)
            );

            expect(delete_err).toBeUndefined();

            // Create the fixture, it expects two very specific args
            // The resource arg must be a class/object with a toJSON method
            let [ create_err, create_results ] = await asyncHandler(
                conditionService.create(args, logger)
            );

            expect(create_err).toBeUndefined();
            // Response should contain an id so core can set appropriate location headers
            expect(create_results.id).toEqual(args.id);


            // Verify the new fixture exists
            let [ query_err, doc ] = await asyncHandler(
                conditionService.searchById(args, contexts, logger)
            );

            expect(query_err).toBeUndefined();
            expect(doc.id).toEqual(args.id);

        });

    });

    describe('Method: update', () => {

        // Let's check for the fixture's status and then try to change it
        // 1. Query fixture for status
        // 2. Update status
        // 3. Query fixture for updated status

        test('should successfully update a document', async () => {
            // Update the status
            ConditionFixture.text.status = 'preliminary';

            let args = {
                resource: {
                    toJSON: () => ConditionFixture
                },
                id: '0'
            };
            let contexts = {};

            // Query for the original doc, this will ignore the resource arg
            let [query_err, doc] = await asyncHandler(
                conditionService.searchById(args, contexts, logger)
            );

            expect(query_err).toBeUndefined();
            expect(doc.text.status).toEqual('generated');

            // Update the original doc
            let [update_err, update_results] = await asyncHandler(
                conditionService.update(args, logger)
            );

            expect(update_err).toBeUndefined();
            expect(update_results.id).toEqual(args.id);

            // Query the newly updated doc and make sure the status is correct
            let [updated_err, updated_doc] = await asyncHandler(
                conditionService.searchById(args, contexts, logger)
            );

            expect(updated_err).toBeUndefined();
            expect(updated_doc.text.status).toEqual('preliminary');

        });

    });

});
