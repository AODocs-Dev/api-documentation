/**
 * Require an access token with scope https://www.googleapis.com/auth/service.management.readonly
 */
const https = require('https');

const config = {
    "ao-docs-staging": "aodocs-staging.altirnao.com"
};

for (let [projetId, serviceName] of Object.entries(config)) {
    const req = https.request({
        host: `endpointsportal.${projetId}.cloud.goog`,
        port: 443,
        path: `/api/v1/${serviceName}/custom-content/`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.argv[2]}`
        }
    }, res => {
        console.log(`statusCode: ${res.statusCode}`);
        res.on('data', d => {
            process.stdout.write(d);
        });
    });
    req.on('error', error => {
        console.log(`Error updating ${serviceName} on ${projetId}: ${error}`);
    });
    req.end();
}

