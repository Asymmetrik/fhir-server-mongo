const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const FHIRServer = require('@asymmetrik/node-fhir-server-core');

const asyncHandler = require('./lib/async-handler');
const mongoClient = require('./lib/mongo');
const {fhirServerConfig, mongoConfig} = require('./config');
const Prometheus = require('./utils/prometheus.utils');
const env = require('var');

const app = express();
app.use(Prometheus.requestCounters);
app.use(Prometheus.responseCounters);
Prometheus.injectMetricsRoute(app);
Prometheus.startCollection();

// implement our subclass to set higher request limit
class MyFHIRServer extends FHIRServer.Server {

    configureMiddleware() {
        //Enable error tracking request handler if supplied in config
        if (this.config.errorTracking && this.config.errorTracking.requestHandler) {
            this.app.use(this.config.errorTracking.requestHandler());
        } // Enable stack traces

        this.app.set('showStackError', !this.env.IS_PRODUCTION); // Show stack error

        this.app.use(compression({
            level: 9
        })); // Enable the body parser

        this.app.use(bodyParser.urlencoded({
            extended: true,
            limit: '50mb',
            parameterLimit: 50000
        }));
        this.app.use(bodyParser.json({
            type: ['application/fhir+json', 'application/json+fhir'],
            limit: '50mb'

        }));

        return this;
    }
}

// const fhirApp = MyFHIRServer.initialize(fhirServerConfig);
const fhirApp = new MyFHIRServer(fhirServerConfig).configureMiddleware().configureSession().configureHelmet().configurePassport().setPublicDirectory().setProfileRoutes().setErrorRoutes();

app.get('/health', (req, res) => res.json({status: 'ok'}));
app.get('/version', (req, res) => {
    const image = env.DOCKER_IMAGE || '';
    if (image) {
        return res.json({version: image.slice(image.lastIndexOf(':') + 1), image: image});
    } else {
        return res.json({version: 'unknown', image: 'unknown'});
    }
});

app.get('/clean', async (req, res) => {
    console.info('Running clean');

    // Connect to mongo and pass any options here
    let [mongoError, client] = await asyncHandler(
        mongoClient(mongoConfig.connection, mongoConfig.options)
    );
    if (mongoError) {
        console.error(mongoError.message);
        console.error(mongoConfig.connection);
        client.close();
        res.status(500).json({success: false, error: mongoError});
    } else {
        //create client by providing database name
        const db = client.db(mongoConfig.db_name);
        var collection_names = [];
        // const collections = await db.listCollections().toArray();

        await db.listCollections().forEach(collection => {
            console.log(collection.name);
            if (collection.name.indexOf('system.') === -1) {
                collection_names.push(collection.name);
            }
        });

        console.info('Collection_names:' + collection_names);
        for (const collection_index in collection_names) {
            const collection_name = collection_names[parseInt(collection_index)];
            console.log(collection_name);
            console.log(['Removing: ', await db.collection(collection_name).countDocuments({}), ' documents from ', collection_name].join(''));
            await db.collection(collection_name).deleteMany({});
        }
        await client.close();
        res.status(200).json({success: true, collections: collection_names});
    }
});

app.get('/stats', async (req, res) => {
    console.info('Running stats');

    // Connect to mongo and pass any options here
    let [mongoError, client] = await asyncHandler(
        mongoClient(mongoConfig.connection, mongoConfig.options)
    );
    if (mongoError) {
        console.error(mongoError.message);
        console.error(mongoConfig.connection);
        client.close();
        res.status(500).json({success: false, error: mongoError});
    } else {
        //create client by providing database name
        const db = client.db(mongoConfig.db_name);
        var collection_names = [];
        // const collections = await db.listCollections().toArray();

        await db.listCollections().forEach(collection => {
            console.log(collection.name);
            if (collection.name.indexOf('system.') === -1) {
                collection_names.push(collection.name);
            }
        });

        var collection_stats = [];
        console.info('Collection_names:' + collection_names);
        for (const collection_index in collection_names) {
            const collection_name = collection_names[parseInt(collection_index)];
            console.log(collection_name);
            const count = await db.collection(collection_name).countDocuments({});
            console.log(['Found: ', count, ' documents in ', collection_name].join(''));
            collection_stats.push({name: collection_name, count: count});
        }
        await client.close();
        res.status(200).json({
            success: true,
            image: env.DOCKER_IMAGE || '',
            database: mongoConfig.db_name,
            collections: collection_stats
        });
    }
});

app.get('/index', async (req, res) => {
    console.info('Running index');

    // Connect to mongo and pass any options here
    let [mongoError, client] = await asyncHandler(
        mongoClient(mongoConfig.connection, mongoConfig.options)
    );

    async function create_index_if_not_exists(db, property_to_index, collection_name) {
        const index_name = property_to_index + '_1';
        if (!await db.collection(collection_name).indexExists(index_name)) {
            console.log('Creating index ' + index_name + ' in ' + collection_name);
            const my_dict = {};
            my_dict[String(property_to_index)] = 1;
            await db.collection(collection_name).createIndex(my_dict);
            return true;
        }
        return false;
    }

    if (mongoError) {
        console.error(mongoError.message);
        console.error(mongoConfig.connection);
        client.close();
        res.status(500).json({success: false, error: mongoError});
    } else {
        //create client by providing database name
        const db = client.db(mongoConfig.db_name);
        const collection_names = [];
        // const collections = await db.listCollections().toArray();

        await db.listCollections().forEach(collection => {
            console.log(collection.name);
            if (collection.name.indexOf('system.') === -1) {
                collection_names.push(collection.name);
            }
        });

        // now add custom indices
        const practitionerRoleCollection = 'PractitionerRole_4_0_0';
        if (collection_names.includes(practitionerRoleCollection)) {
            await create_index_if_not_exists(db, 'practitioner.reference', practitionerRoleCollection);
            await create_index_if_not_exists(db, 'organization.reference', practitionerRoleCollection);
            await create_index_if_not_exists(db, 'location.reference', practitionerRoleCollection);
        }

        // now add indices on id column for every collection
        const collection_stats = [];
        console.info('Collection_names:' + collection_names);
        for (const collection_index in collection_names) {
            const collection_name = collection_names[parseInt(collection_index)];
            console.log(collection_name);
            // check if index exists
            let createdIndex = await create_index_if_not_exists(db, 'id', collection_name);
            createdIndex = await create_index_if_not_exists(db, 'meta.lastUpdated', collection_name) || createdIndex;
            const indexes = await db.collection(collection_name).indexes();
            const count = await db.collection(collection_name).countDocuments({});
            console.log(['Found: ', count, ' documents in ', collection_name].join(''));
            collection_stats.push({name: collection_name, count: count, createdIndex: createdIndex, indexes: indexes});
        }
        await client.close();
        res.status(200).json({success: true, collections: collection_stats});
    }
});

app.use(fhirApp.app);


module.exports = {app, fhirApp};
