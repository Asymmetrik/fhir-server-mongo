// const {UserFacingError} = require('./baseErrors');
const {ServerError} = require('@asymmetrik/node-fhir-server-core');
const env = require('var');

class BadRequestError extends ServerError {
    constructor(error, options = {}) {
        super(error.message, {
            // Set this to make the HTTP status code 409
            statusCode: 400,
            // Add any normal operation outcome stuff here
            issue: [
                {
                    severity: 'error',
                    code: 'invalid',
                    details: {text: error.message},
                    diagnostics: env.IS_PRODUCTION ? error.message : error.toString(),
                },
            ],
        });

        // You can attach relevant information to the error instance
        // (e.g.. the username)

        for (const [key, value] of Object.entries(options)) {
            this[`${key}`] = value;
        }
    }

    get statusCode() {
        return 400;
    }
}


class NotFoundError extends ServerError {
    constructor(message, options = {}) {
        super(message, {
            // Set this to make the HTTP status code 409
            statusCode: 404,
            // Add any normal operation outcome stuff here
            issue: [
                {
                    severity: 'error',
                    code: 'not-found',
                    details: {text: message},
                },
            ],
        });

        // You can attach relevant information to the error instance
        // (e.g.. the username)

        for (const [key, value] of Object.entries(options)) {
            this[`${key}`] = value;
        }
    }

    get statusCode() {
        return 404;
    }
}

class NotAllowedError extends ServerError {
    constructor(message, options = {}) {
        super(message, {
            // Set this to make the HTTP status code 409
            statusCode: 409,
            // Add any normal operation outcome stuff here
            issue: [
                {
                    severity: 'error',
                    code: 'forbidden',
                    details: {text: message},
                },
            ],
        });

        // You can attach relevant information to the error instance
        // (e.g.. the username)

        for (const [key, value] of Object.entries(options)) {
            this[`${key}`] = value;
        }
    }

    get statusCode() {
        return 409;
    }
}

class NotValidatedError extends ServerError {
    constructor(operationOutcome, options = {}) {
        super('Validation Failed', {
            // Set this to make the HTTP status code 409
            statusCode: 400,
            // Add any normal operation outcome stuff here
            issue: operationOutcome.issue
        });

        // You can attach relevant information to the error instance
        // (e.g.. the username)

        for (const [key, value] of Object.entries(options)) {
            this[`${key}`] = value;
        }
    }

    get statusCode() {
        return 400;
    }
}

class UnauthorizedError extends ServerError {
    constructor(message, options = {}) {
        super(message, {
            // Set this to make the HTTP status code 401
            statusCode: 401,
            // Add any normal operation outcome stuff here
            issue: [
                {
                    severity: 'error',
                    code: 'security',
                    details: {text: message},
                },
            ],
        });

        // You can attach relevant information to the error instance
        // (e.g.. the username)

        for (const [key, value] of Object.entries(options)) {
            this[`${key}`] = value;
        }
    }

    get statusCode() {
        return 401;
    }
}

class ForbiddenError extends ServerError {
    constructor(message, options = {}) {
        super(message, {
            // Set this to make the HTTP status code 401
            statusCode: 403,
            // Add any normal operation outcome stuff here
            // https://www.hl7.org/fhir/valueset-issue-type.html
            issue: [
                {
                    severity: 'error',
                    code: 'forbidden',
                    details: {text: message},
                },
            ],
        });

        // You can attach relevant information to the error instance
        // (e.g.. the username)

        for (const [key, value] of Object.entries(options)) {
            this[`${key}`] = value;
        }
    }

    get statusCode() {
        return 403;
    }
}


module.exports = {
    BadRequestError,
    NotFoundError,
    NotAllowedError,
    NotValidatedError,
    UnauthorizedError,
    ForbiddenError
};
