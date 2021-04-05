const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    publicRuntimeConfig: {
        APP_NAME: 'Arcatron Customer Support Dashboard',
        API_DEVELOPMENT: 'http://localhost:8000/api',
        API_PRODUCTION: 'https://arcatron-complaints-warranty.herokuapp.com/api',
        PRODUCTION: false,
        DOMAIN_PRODUCTION: 'https://sharp-shockley-118ffb.netlify.app/',
        DOMAIN_DEVELOPMENT: 'http://localhost:3000',
        GOOGLE_CLIENT_ID:"770856621212-2ogm8kn0p4hv6ispc0upuomnnuilhmkb.apps.googleusercontent.com",
        ApplicationApi : 'http://localhost:8000/api/application',
        ComplaintAPI : 'http://localhost:8000/api/complaint',
        WarrantyAPI_Prod : 'https://arcatron-complaints-warranty.herokuapp.com/api/warranty',
        ComplaintAPI_Prod : 'https://arcatron-complaints-warranty.herokuapp.com/api/complaint'
    }
}); 