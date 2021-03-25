/*jshint esversion: 8 */
/* eslint-disable no-unused-vars */
const {MongoClient} = require('mongodb');
const supertest = require('supertest');

const {app} = require('../../../app');
const globals = require('../../../globals');
const {CLIENT, CLIENT_DB} = require('../../../constants');
// provider file
const practitionerResource = require('./fixtures/providers/practitioner.json');
const locationResource = require('./fixtures/providers/location.json');
const practitionerRoleResource = require('./fixtures/providers/practitioner_role.json');
const practitionerMedicalSchoolResource = require('./fixtures/providers/medical_school_organization.json');
const practitionerHealthcareServiceResource = require('./fixtures/providers/healthcare_service.json');
// insurance
const insurancePractitionerResource = require('./fixtures/insurance/practitioner.json');
const insuranceOrganizationResource = require('./fixtures/insurance/insurance_organization.json');
const insurancePlanLocationResource = require('./fixtures/insurance/insurance_plan_location.json');
const insurancePlanResource = require('./fixtures/insurance/insurance_plan.json');
const insurancePractitionerRoleResource = require('./fixtures/insurance/practitioner_role.json');
const insuranceProviderOrganizationResource = require('./fixtures/insurance/provider_organization.json');
// scheduler
const schedulerPractitionerRoleResource = require('./fixtures/scheduler/practitioner_role.json');
const schedulerHealthcareServiceResource = require('./fixtures/scheduler/healthcare_service.json');
// practice
const practiceHealthcareServiceResource = require('./fixtures/practice/healthcare_service.json');
const practiceOrganizationResource = require('./fixtures/practice/practice_organization.json');
const practiceParentOrganizationResource = require('./fixtures/practice/parent_organization.json');
const practiceLocationResource = require('./fixtures/practice/location.json');

// expected
const expectedPractitionerResource = require('./fixtures/expected/expected_practitioner.json');
const expectedPractitionerRoleResource = require('./fixtures/expected/expected_practitioner_role.json');
const expectedLocationResource = require('./fixtures/expected/expected_location.json');
const expectedOrganizationResource = require('./fixtures/expected/expected_organization.json');
const expectedInsurancePlanResource = require('./fixtures/expected/expected_insurance_plan.json');
const expectedHealthcareServiceResource = require('./fixtures/expected/expected_healthcare_service.json');
const async = require('async');
const env = require('var');

const request = supertest(app);

describe('Practitioner Complex Merge Tests', () => {
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

    describe('Practitioner Merges', () => {
        test('Multiple calls to Practitioner merge properly', (done) => {
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
                    (results, cb) =>
                        request
                            .post('/4_0_0/Location/UF3-UADM/$merge')
                            .send(locationResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                console.log('------- response 3 ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response 3  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }), (results, cb) =>
                        request
                            .post('/4_0_0/PractitionerRole/4657-3437/$merge')
                            .send(practitionerRoleResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                console.log('------- response locationResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }), (results, cb) =>
                        request
                            .post('/4_0_0/Organization/StanfordMedicalSchool/$merge')
                            .send(practitionerMedicalSchoolResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('------- response practitionerMedicalSchoolResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }), (results, cb) =>
                        request
                            .post('/4_0_0/HealthcareService/$merge')
                            .send(practitionerHealthcareServiceResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('------- response practitionerHealthcareServiceResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }), (results, cb) =>
                        request
                            .post('/4_0_0/Organization/AETNA/$merge')
                            .send(insuranceOrganizationResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('------- response insuranceOrganizationResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }), (results, cb) =>
                        request
                            .post('/4_0_0/Location/AetnaElectChoice/$merge')
                            .send(insurancePlanLocationResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('------- response insurancePlanLocationResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }), (results, cb) =>
                        request
                            .post('/4_0_0/InsurancePlan/AETNA-AetnaElectChoice/$merge')
                            .send(insurancePlanResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('------- response insurancePlanResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }), (results, cb) =>
                        request
                            .post('/4_0_0/Practitioner/1679033641/$merge')
                            .send(insurancePractitionerResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('------- response insurancePractitionerResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(false);
                                return cb(err, resp);
                            }), (results, cb) =>
                        request
                            .post('/4_0_0/PractitionerRole/1679033641-AETNA-AetnaElectChoiceEPO/$merge')
                            .send(insurancePractitionerRoleResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('------- response insurancePractitionerRoleResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }), (results, cb) =>
                        request
                            .post('/4_0_0/Organization/MWHC/$merge')
                            .send(insuranceProviderOrganizationResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('------- response insuranceProviderOrganizationResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }), (results, cb) =>
                        request
                            .post('/4_0_0/PractitionerRole/1679033641/$merge')
                            .send(schedulerPractitionerRoleResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('------- response schedulerPractitionerRoleResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }), (results, cb) =>
                        request
                            .post('/4_0_0/HealthcareService/1679033641-MAX-MALX/$merge')
                            .send(schedulerHealthcareServiceResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('------- response schedulerHealthcareServiceResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }), (results, cb) =>
                        request
                            .post('/4_0_0/HealthcareService/MWHC_Department-207RE0101X/$merge')
                            .send(practiceHealthcareServiceResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('------- response practiceHealthcareServiceResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }),
                    (results, cb) =>
                        request
                            .post('/4_0_0/Organization/MWHC/$merge')
                            .send(practiceOrganizationResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('------- response practiceOrganizationResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }),
                    (results, cb) =>
                        request
                            .post('/4_0_0/Organization/MedStarMedicalGroup/$merge')
                            .send(practiceParentOrganizationResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('------- response practiceHealthcareServiceResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }),
                    (results, cb) =>
                        request
                            .post('/4_0_0/Location/$merge')
                            .send(practiceLocationResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('------- response practiceLocationResource ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response  ------------');
                                expect(resp.body['created']).toBe(true);
                                return cb(err, resp);
                            }),
                    (results, cb) => request
                        .get('/4_0_0/Practitioner')
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
                            delete body[0]['meta']['lastUpdated'];
                            let expected = expectedPractitionerResource;
                            // delete expected[0]['meta']['lastUpdated'];
                            delete expected[0]['$schema'];
                            expected[0]['meta'] = {'versionId': '2'};
                            expect(body).toStrictEqual(expected);
                        }, cb),
                    (results, cb) => request
                        .get('/4_0_0/PractitionerRole')
                        .set('Content-Type', 'application/fhir+json')
                        .set('Accept', 'application/fhir+json')
                        .expect(200, cb)
                        .expect((resp) => {
                            console.log('------- response PractitionerRole ------------');
                            console.log(JSON.stringify(resp.body, null, 2));
                            console.log('------- end response  ------------');
                            // clear out the lastUpdated column since that changes
                            let body = resp.body;
                            expect(body.length).toBe(3);
                            delete body[0]['meta']['lastUpdated'];
                            body.forEach(element => {
                                delete element['meta']['lastUpdated'];
                            });
                            let expected = expectedPractitionerRoleResource;
                            expected.forEach(element => {
                                if ('meta' in element) {
                                    delete element['meta']['lastUpdated'];
                                }
                                element['meta'] = {'versionId': '1'};
                                if ('$schema' in element) {
                                    delete element['$schema'];
                                }
                            });

                            expect(body).toStrictEqual(expected);
                        }, cb),
                    (results, cb) => request
                        .get('/4_0_0/Location')
                        .set('Content-Type', 'application/fhir+json')
                        .set('Accept', 'application/fhir+json')
                        .expect(200, cb)
                        .expect((resp) => {
                            console.log('------- response Location ------------');
                            console.log(JSON.stringify(resp.body, null, 2));
                            console.log('------- end response  ------------');
                            // clear out the lastUpdated column since that changes
                            let body = resp.body;
                            expect(body.length).toBe(3);
                            delete body[0]['meta']['lastUpdated'];
                            body.forEach(element => {
                                delete element['meta']['lastUpdated'];
                            });
                            let expected = expectedLocationResource;
                            expected.forEach(element => {
                                if ('meta' in element) {
                                    delete element['meta']['lastUpdated'];
                                }
                                element['meta'] = {'versionId': '1'};
                                if ('$schema' in element) {
                                    delete element['$schema'];
                                }
                            });

                            expect(body).toStrictEqual(expected);
                        }, cb),
                    (results, cb) => request
                        .get('/4_0_0/Organization')
                        .set('Content-Type', 'application/fhir+json')
                        .set('Accept', 'application/fhir+json')
                        .expect(200, cb)
                        .expect((resp) => {
                            console.log('------- response Organization ------------');
                            console.log(JSON.stringify(resp.body, null, 2));
                            console.log('------- end response  ------------');
                            // clear out the lastUpdated column since that changes
                            let body = resp.body;
                            expect(body.length).toBe(5);
                            delete body[0]['meta']['lastUpdated'];
                            body.forEach(element => {
                                delete element['meta'];
                            });
                            let expected = expectedOrganizationResource;
                            expected.forEach(element => {
                                if ('meta' in element) {
                                    delete element['meta'];
                                }
                                if ('$schema' in element) {
                                    delete element['$schema'];
                                }
                            });

                            expect(body).toStrictEqual(expected);
                        }, cb),
                    (results, cb) => request
                        .get('/4_0_0/InsurancePlan')
                        .set('Content-Type', 'application/fhir+json')
                        .set('Accept', 'application/fhir+json')
                        .expect(200, cb)
                        .expect((resp) => {
                            console.log('------- response InsurancePlan ------------');
                            console.log(JSON.stringify(resp.body, null, 2));
                            console.log('------- end response  ------------');
                            // clear out the lastUpdated column since that changes
                            let body = resp.body;
                            expect(body.length).toBe(1);
                            delete body[0]['meta']['lastUpdated'];
                            body.forEach(element => {
                                delete element['meta']['lastUpdated'];
                            });
                            let expected = expectedInsurancePlanResource;
                            expected.forEach(element => {
                                if ('meta' in element) {
                                    delete element['meta']['lastUpdated'];
                                }
                                element['meta'] = {'versionId': '1'};
                                if ('$schema' in element) {
                                    delete element['$schema'];
                                }
                            });

                            expect(body).toStrictEqual(expected);
                        }, cb),
                    (results, cb) => request
                        .get('/4_0_0/HealthcareService')
                        .set('Content-Type', 'application/fhir+json')
                        .set('Accept', 'application/fhir+json')
                        .expect(200, cb)
                        .expect((resp) => {
                            console.log('------- response HealthcareService ------------');
                            console.log(JSON.stringify(resp.body, null, 2));
                            console.log('------- end response  ------------');
                            // clear out the lastUpdated column since that changes
                            let body = resp.body;
                            expect(body.length).toBe(3);
                            delete body[0]['meta']['lastUpdated'];
                            body.forEach(element => {
                                delete element['meta']['lastUpdated'];
                            });
                            let expected = expectedHealthcareServiceResource;
                            expected.forEach(element => {
                                if ('meta' in element) {
                                    delete element['meta']['lastUpdated'];
                                }
                                element['meta'] = {'versionId': '1'};
                                if ('$schema' in element) {
                                    delete element['$schema'];
                                }
                            });

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
    });
});
