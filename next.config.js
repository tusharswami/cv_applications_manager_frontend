const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    publicRuntimeConfig: {
        APP_NAME: 'GeoSpoc CV manager',
        API_DEVELOPMENT: 'http://localhost:8000/api',
        API_PRODUCTION: 'https://cv-application-manager.herokuapp.com/api',
        PRODUCTION: false,
        DOMAIN_PRODUCTION: 'https://sharp-shockley-118ffb.netlify.app/',
        DOMAIN_DEVELOPMENT: 'http://localhost:3000',
        GOOGLE_CLIENT_ID:"770856621212-2ogm8kn0p4hv6ispc0upuomnnuilhmkb.apps.googleusercontent.com",
        ApplicationApi : 'https://cv-application-manager.herokuapp.com/api/application',
        ComplaintAPI : 'http://localhost:8000/api/complaint',
    }
}); 