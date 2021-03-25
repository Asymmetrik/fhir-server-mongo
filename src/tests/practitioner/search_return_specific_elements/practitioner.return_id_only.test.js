/* eslint-disable no-unused-vars */
const {MongoClient} = require('mongodb');
const supertest = require('supertest');

const {app} = require('../../../app');
const globals = require('../../../globals');
const {CLIENT, CLIENT_DB} = require('../../../constants');
// provider file
const practitionerResource = require('./fixtures/practitioner/practitioner.json');

// expected
const expectedPractitionerResource = require('./fixtures/expected/expected_practitioner.json');
const expectedPractitionerResourceBundle = require('./fixtures/expected/expected_practitioner_bundle.json');
// const expectedPractitionerRoleResource = require('./fixtures/expected/expected_practitioner_role.json');
// const expectedLocationResource = require('./fixtures/expected/expected_location.json');
// const expectedOrganizationResource = require('./fixtures/expected/expected_organization.json');
// const expectedInsurancePlanResource = require('./fixtures/expected/expected_insurance_plan.json');
// const expectedHealthcareServiceResource = require('./fixtures/expected/expected_healthcare_service.json');

const async = require('async');
const env = require('var');

const request = supertest(app);

describe('PractitionerReturnIdTests', () => {
    let connection;
    let db;
    // let resourceId;

    beforeEach(async () => {
        connection = await MongoClient.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            server: {
                auto_reconnect: true,
                socketOptions: {

                    keepAlive: 1,
                    connectTimeoutMS: 60000,
                    socketTimeoutMS: 60000,
                }
            }
        });
        db = connection.db();

        globals.set(CLIENT, connection);
        globals.set(CLIENT_DB, db);
        jest.setTimeout(30000);
        env['VALIDATE_SCHEMA'] = true;
    });

    afterEach(async () => {
        await db.dropDatabase();
        await connection.close();
    });

    describe('PractitionerReturnId Tests', () => {
        test('Id works properly', (done) => {
            async.waterfall([
                    (cb) => // first confirm there are no practitioners
                        request
                            .get('/4_0_0/Practitioner')
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                expect(resp.body.length).toBe(0);
                                console.log('------- response 1 ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response 1 ------------');
                                return cb(err, resp);
                            }),
                    (results, cb) =>
                        request
                            .post('/4_0_0/Practitioner/1679033641/$merge')
                            .send(practitionerResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                console.log('------- response practitionerResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }),
                    (results, cb) => request
                        .get('/4_0_0/Practitioner?_elements=id')
                        .set('Content-Type', 'application/fhir+json')
                        .set('Accept', 'application/fhir+json')
                        .expect(200, cb)
                        .expect((resp) => {
                            console.log('------- response Practitioner ------------');
                            console.log(JSON.stringify(resp.body, null, 2));
                            console.log('------- end response  ------------');
                            // clear out the lastUpdated column since that changes
                            let body = resp.body;
                            expect(body.length).toBe(1);
                            // delete body[0]['meta']['lastUpdated'];
                            let expected = expectedPractitionerResource;
                            // // delete expected[0]['meta']['lastUpdated'];
                            // delete expected[0]['$schema'];
                            // expected[0]['meta'] = { 'versionId': '2' };
                            expect(body).toStrictEqual(expected);
                        }, cb),
                ],
                (err, results) => {
                    if (!err) {
                        console.log('done');
                    }

                    if (err) {
                        console.error(err);
                        done.fail(err);
                    }
                    done();
                });
        });
        test('Id works properly with bundle', (done) => {
            async.waterfall([
                    (cb) => // first confirm there are no practitioners
                        request
                            .get('/4_0_0/Practitioner?_bundle=true')
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                console.log('------- response 1 ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response 1 ------------');
                                expect(resp.body['entry']).toStrictEqual([]);
                                return cb(err, resp);
                            }),
                    (results, cb) =>
                        request
                            .post('/4_0_0/Practitioner/1679033641/$merge')
                            .send(practitionerResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                console.log('------- response practitionerResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }),
                    (results, cb) => request
                        .get('/4_0_0/Practitioner?_elements=id&_bundle=true')
                        .set('Content-Type', 'application/fhir+json')
                        .set('Accept', 'application/fhir+json')
                        .expect(200, cb)
                        .expect((resp) => {
                            console.log('------- response Practitioner ------------');
                            console.log(JSON.stringify(resp.body, null, 2));
                            console.log('------- end response  ------------');
                            // clear out the lastUpdated column since that changes
                            let body = resp.body;
                            expect(body['entry'].length).toBe(1);
                            delete body['timestamp'];
                            expect(body).toStrictEqual(expectedPractitionerResourceBundle);
                        }, cb),
                ],
                (err, results) => {
                    if (!err) {
                        console.log('done');
                    }

                    if (err) {
                        console.error(err);
                        done.fail(err);
                    }
                    done();
                });
        });
    });
});
