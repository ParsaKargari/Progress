const http = require('http');


describe("Settings", () => {
  
    it('/settings/getSettings - should get settings', (done) => {
        const sampleUser = {
            userId: 'some-user-id',
            username: 'someUsername',
            status: 'someStatus',
        };

        const path = `/settings/getSettings?user_id=${sampleUser.userId}`;

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request({
            hostname: 'localhost',
            port: 9000,
            path: path,
            method: requestOptions.method,
            headers: requestOptions.headers
        }, (res) => {
            expect(res.statusCode).toBe(200);
            done();
        });

        req.end();
    });

    it('/settings/updateSettings - should update settings', (done) => {
        const sampleUser = {
            userId: 'some-user-id',
            username: 'someUsername',
            status: 'someStatus',
        };
        
        const username = 'username';
        const status = 'status';
        const color = 'color'
        const path =  `/settings/updateSettings?user_id=${sampleUser.userId}`;


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, status, color})
        };

        const req = http.request({
            hostname: 'localhost',
            port: 9000,
            path: path,
            method: requestOptions.method,
            headers: requestOptions.headers
        }, (res) => {
            expect(res.statusCode).toBe(200);
            done();
        });

        req.end();
    });
});

