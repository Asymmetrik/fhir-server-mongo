const AWS = require('aws-sdk');
const logger = require('@asymmetrik/node-fhir-server-core').loggers.get();
// const Sentry = require('./sentry');
const moment = require('moment-timezone');

const AWS_BUCKET = process.env.AWS_BUCKET;
const REGION = process.env.AWS_REGION || 'us-east-1';
const AWS_FOLDER = process.env.AWS_FOLDER;

const s3 = new AWS.S3({
    region: REGION,
});

/**
 * @function sendToS3
 * @description In case of FHIR Server failure, dump form body to S3
 * @param prefix
 * @param resourceType
 * @param {*} resource - parsed form body
 * @param currentDate
 * @param {*} id - first name for key
 * @param filename_postfix - Optional postfix for filename
 * @return {Promise<data|err>}
 */
module.exports = function sendToS3(prefix, resourceType, resource, currentDate, id, filename_postfix) {
    if (!AWS_BUCKET) {
        return Promise.resolve(null);
    }
    const currentTime = moment.utc().format('HH-mm-ss');
    const randomString = Math.random().toString(36).substring(0, 5);
    const key = `${AWS_FOLDER}/${prefix}/${resourceType}/${currentDate}/${id}/${currentTime}-${filename_postfix}-${randomString}.json`;
    return new Promise((resolve, reject) => {
        try {
            const params = {
                Body: JSON.stringify(resource),
                Bucket: AWS_BUCKET,
                Key: key,
                ContentType: 'application/json',
                ServerSideEncryption: 'AES256',
            };
            s3.putObject(params, function (err, data) {
                if (err) {
                    const sts = new AWS.STS();
                    sts.getCallerIdentity(function (_error, role_data) {
                        logger.error('[AWS-S3] Failed to put object: ' +
                            key + ' in bucket: ' + AWS_BUCKET + ' with user: ' + JSON.stringify(role_data));
                        logger.error(
                            '[AWS-S3] Object: ',
                            JSON.stringify(resource)
                        );
                        logger.error('[AWS-S3] Error: ' + key + ':', err);
                        // Sentry.captureException(err);
                        return reject(err);
                    });
                } else {
                    logger.info('[AWS-S3] Successfully placed object in bucket');
                    return resolve(data);
                }
            });
        } catch (e) {
            logger.error('[AWS-S3] Error to put object: ' +
                key + ' in bucket: ' + AWS_BUCKET + '. Error=' + e);
            return resolve(null);
        }
    }).catch(function (e) {
        logger.error('[AWS-S3] Error in promise to put object: ' +
            key + ' in bucket: ' + AWS_BUCKET + '. Error=' + e);
    });
};
