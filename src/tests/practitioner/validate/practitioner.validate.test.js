/* eslint-disable no-unused-vars */
const {MongoClient} = require('mongodb');
const supertest = require('supertest');

const {app} = require('../../../app');
const globals = require('../../../globals');
const {CLIENT, CLIENT_DB} = require('../../../constants');

const validPractitionerResource = require('./fixtures/valid_practitioner.json');
const invalidPractitionerResource = require('./fixtures/invalid_practitioner.json');

const expectedValidPractitionerResponse = require('./expected/valid_practitioner_response.json');
const expectedInvalidPractitionerResponse = require('./expected/invalid_practitioner_response.json');

const async = require('async');
const env = require('var');

const request = supertest(app);

describe('Practitioner Update Tests', () => {
    let connection;
    let db;
    // let resourceId;

    beforeEach(async () => {
        connection = await MongoClient.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db();

        globals.set(CLIENT, connection);
        globals.set(CLIENT_DB, db);
        jest.setTimeout(30000);
        env['VALIDATE_SCHEMA'] = true;
    });

    afterEach(async () => {
        await db.dropDatabase();
        await connection.close();
    });

    describe('Practitioner Validate', () => {
        test('Valid resource', (done) => {
            // noinspection UnnecessaryLocalVariableJS
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
                            .post('/4_0_0/Practitioner/$validate')
                            .send(validPractitionerResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                let body = resp.body;
                                console.log('------- response 1 ------------');
                                console.log(JSON.stringify(body, null, 2));
                                console.log('------- end response 1 ------------');
                                expect(body).toStrictEqual(expectedValidPractitionerResponse);
                                return cb(err, resp);
                            }),
                ],
                (err, results) => {
                    console.log('done');
                    if (err) {
                        console.error(err);
                        done.fail(err);
                    }
                    done();
                });
        });
        test('Invalid resource', (done) => {
            // noinspection UnnecessaryLocalVariableJS
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
                            .post('/4_0_0/Practitioner/$validate')
                            .send(invalidPractitionerResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                let body = resp.body;
                                console.log('------- response 2 ------------');
                                console.log(JSON.stringify(body, null, 2));
                                console.log('------- end response 2 ------------');
                                expect(body).toStrictEqual(expectedInvalidPractitionerResponse);
                                return cb(err, resp);
                            }),
                ],
                (err, results) => {
                    console.log('done');
                    if (err) {
                        console.error(err);
                        done.fail(err);
                    }
                    done();
                });
        });
    });
});
