/* eslint-disable */
const OrganizationFixture = require('../../../fixtures/data/uscore/Organization-acme-lab.json');
const { CLIENT, CLIENT_DB } = require('../../constants');
const asyncHandler = require('../../lib/async-handler');
const logger = require('../../testutils/logger.mock');
const organizationService = require('./organization.service');
const { mongoConfig } = require('../../config');
const mongoClient = require('../../lib/mongo');
let globals = require('../../globals');

describe('Organization Service Test', () => {

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
                organizationService.count(null, logger)
            );

            expect(err).toBeUndefined();
            expect(results).toEqual(2);
        });

    });

    // Address and phonetic have not been implemented yet
    describe('Method: search', () => {

        test('Get an organization using all implemented arguments', async () => {
            let args = {_id: '0', active: 'false', address: '3300 Washtenaw Avenue, Suite 227, Ann Arbor, MI  48104 UsA',
                addressCity: 'an', addressCountry: 'U', addressPostalCode: '481', addressState: 'MI', addressUse: 'work',
                endpoint: 'example', identifier: 'http://hl7.org.fhir/sid/us-npi|1144221847', name: 'a GOo', partof: '1',
                type: 'http://hl7.org/fhir/organization-type|prov'};
            let contexts = {};
            let [err, docs] = await asyncHandler(
                organizationService.search(args, contexts, logger)
            );

            // console.log(JSON.stringify(args));
            // console.log(JSON.stringify(docs));

            expect(err).toBeUndefined();
            expect(docs.length).toEqual(1);

            docs.forEach(doc => {
                expect(doc.id).toEqual(args._id);
                expect(doc.active).toBeFalsy();
                expect(doc.address[0].line[0]).toEqual('3300 Washtenaw Avenue, Suite 227');
                expect(doc.address[0].city).toEqual('Ann Arbor');
                expect(doc.address[0].country).toEqual('USA');
                expect(doc.address[0].postalCode).toEqual('48104');
                expect(doc.address[0].state).toEqual('MI');
                expect(doc.address[0].use).toEqual(args.addressUse);
                expect(doc.endpoint[0].reference).toEqual('Endpoint/example');
                expect(doc.identifier[0].system).toEqual('http://hl7.org.fhir/sid/us-npi');
                expect(doc.identifier[0].value).toEqual('1144221847');
                expect(doc.name).toEqual('Health Level Seven International');
                expect(doc.partOf.reference).toEqual('Organization/1');
                expect(doc.type[0].coding[0].system).toEqual('http://hl7.org/fhir/organization-type');
                expect(doc.type[0].coding[0].code).toEqual('prov');
            });

        });

    });

    describe('Method: searchById', () => {

        test('should correctly return a document', async () => {
            let args = { id: 'acme-lab' };
            let contexts = {};
            let [ err, doc ] = await asyncHandler(
                organizationService.searchById(args, contexts, logger)
            );

            expect(err).toBeUndefined();
            expect(doc.id).toEqual(args.id);
        });

    });

    describe('Method: remove', () => {

        // For these tests, let's do it in 3 steps
        // 1. Check the organization exists
        // 2. Delete an organization and make sure it does not throw
        // 3. Check the organization does not exist

        test('should successfully delete a document', async () => {

            // Look for this particular fixture
            let args = { id: 'acme-lab' };
            let contexts = {};
            let [ err, doc ] = await asyncHandler(
                organizationService.searchById(args, contexts, logger)
            );

            expect(err).toBeUndefined();
            expect(doc.id).toEqual(args.id);

            // Now delete this fixture
            let [ delete_err, _ ] = await asyncHandler(
                organizationService.remove(args, logger)
            );

            // There is no response resolved from this promise, so just check for an error
            expect(delete_err).toBeUndefined();

            // Now query for the fixture again, there should be no documents
            let [ query_err, missing_doc ] = await asyncHandler(
                organizationService.searchById(args, contexts, logger)
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
                    toJSON: () => OrganizationFixture
                },
                id: 'acme-lab'
            };
            let contexts = {};

            // Delete the fixture incase it exists,
            // mongo won't throw if we delete something not there
            let [ delete_err, _ ] = await asyncHandler(
                organizationService.remove(args, logger)
            );

            expect(delete_err).toBeUndefined();

            // Create the fixture, it expects two very specific args
            // The resource arg must be a class/object with a toJSON method
            let [ create_err, create_results ] = await asyncHandler(
                organizationService.create(args, logger)
            );

            expect(create_err).toBeUndefined();
            // Response should contain an id so core can set appropriate location headers
            expect(create_results.id).toEqual(args.id);


            // Verify the new fixture exists
            let [ query_err, doc ] = await asyncHandler(
                organizationService.searchById(args, contexts, logger)
            );

            expect(query_err).toBeUndefined();
            expect(doc.id).toEqual(args.id);

        });

    });

    describe('Method: update', () => {

        // Let's check for the fixture's active property and then try to change it
        // 1. Query fixture for active
        // 2. Update active property
        // 3. Query fixture for updated property

        test('should successfully update a document', async () => {
            // Update the status
            OrganizationFixture.text.status = 'preliminary';

            let args = {
                resource: {
                    toJSON: () => OrganizationFixture
                },
                id: 'acme-lab'
            };
            let contexts = {};

            // Query for the original doc, this will ignore the resource arg
            let [ query_err, doc ] = await asyncHandler(
                organizationService.searchById(args, contexts, logger)
            );

            expect(query_err).toBeUndefined();
            expect(doc.text.status).toEqual('generated');

            // Update the original doc
            let [ update_err, update_results ] = await asyncHandler(
                organizationService.update(args, logger)
            );

            expect(update_err).toBeUndefined();
            expect(update_results.id).toEqual(args.id);

            // Query the newly updated doc and make sure the status is correct
            let [ updated_err, updated_doc ] = await asyncHandler(
                organizationService.searchById(args, contexts, logger)
            );

            expect(updated_err).toBeUndefined();
            expect(updated_doc.text.status).toEqual('preliminary');

        });

    });

});
