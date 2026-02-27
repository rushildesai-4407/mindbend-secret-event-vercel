const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/me',
    method: 'GET',
    headers: {
        'Cookie': 'auth_team=5965b4f0-511d-4bcf-8c2b-d9c5e81b8bf0'
    }
};

const req = http.request(options, (res) => {
    console.log('Status Code:', res.statusCode);
    res.on('data', d => process.stdout.write(d));
});

req.on('error', error => console.error(error));
req.end();
