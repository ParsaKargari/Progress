const http = require('http');


describe("Signup", () => {
  
    it('signUp/:id/:username/:status/:email - should sign up user', (done) => {
        const sampleUser = {
            userId: 'some-user-id',
            username: 'someUsername',
            status: 'someStatus',
            email: 'someEmail'
        };

        const path = `/signUp/${sampleUser.userId}/${sampleUser.username}/${sampleUser.status}/${sampleUser.email}`;

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

    it('signUp/:id - should get username', (done) => {
        const sampleUser = {
            userId: 'some-user-id',
            username: 'someUsername',
            status: 'someStatus',
        };
        const username = 'username';
        const status = 'status';
        const color = 'color'
        const path =  `/signUp/${sampleUser.userId}`;


        const requestOptions = {
            method: 'GET',
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

