const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwksRsa = require('jwks-rsa');
const env = require('var');

/**
 * extracts the client_id and scope from the decoded token
 * @param jwt_payload
 * @param done
 * @return {*}
 */
const verify = (jwt_payload, done) => {
    // console.log('Verify user:', jwt_payload);

    if (jwt_payload) {
        /**
         * @type {string}
         */
        const client_id = jwt_payload.client_id;
        /**
         * @type {string}
         */
        const scope = jwt_payload.scope;
        console.info('Verified client_id: ' + client_id + 'scope: ' + scope);
        const context = null;
        return done(null, client_id, {scope, context});
    }

    return done(null, false);
};

/**
 * Bearer Strategy
 *
 * This strategy will handle requests with BearerTokens.  This is only a template and should be configured to
 * your AuthZ server specifications.
 *
 * Requires ENV variables for introspecting the token
 */
module.exports.strategy = new JwtStrategy({
        // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
        secretOrKeyProvider: jwksRsa.passportJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: env.AUTH_JWKS_URL
        }),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

        // Validate the audience and the issuer.
        // audience: 'urn:my-resource-server',
        issuer: env.AUTH_ISSUER,
        algorithms: ['RS256']
    },
    verify);
