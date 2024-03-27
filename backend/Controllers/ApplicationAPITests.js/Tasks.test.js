const http = require('http');


let taskId = ""
describe('Tasks Router Unit Tests', () => {
    it('POST /tasks/createTask/:userId/:addedDate/:taskDescr - should create a task', (done) => {
        const sampleTask = {
            userId: 'some-user-id',
            addedDate: '2024-03-26',
            taskDescr: 'Test 1',
        };

        const path = `/tasks/createTask/${encodeURIComponent(sampleTask.userId)}/${encodeURIComponent(sampleTask.addedDate)}/${encodeURIComponent(sampleTask.taskDescr)}`;

        const requestOptions = {
            method: 'POST',
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

    it('GET /tasks/getTasks/:userId - should get all tasks for a user', async() => {
        const userId = 'some-user-id';
        const path = `/tasks/getTasks/${encodeURIComponent(userId)}`;

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await new Promise((resolve, reject) => {
            const req = http.request({
                hostname: 'localhost',
                port: 9000,
                path: path,
                method: requestOptions.method,
                headers: requestOptions.headers
            }, (res) => {
                let responseBody = '';
                res.on('data', (chunk) => {
                    responseBody += chunk;
                });
                res.on('end', () => {
                    resolve({ statusCode: res.statusCode, body: JSON.parse(responseBody) });
                });
            });

            req.end();
        });

        expect(res.statusCode).toBe(200);
        taskId = res.body.data[0].TaskID;
        expect(taskId).toBeDefined();
    });



    it('GET /tasks/getHeatMapData/:userID/:startDate/:endDate - should get heatmap data', (done) => {
        const userID = 'some-user-id';
        const startDate = '2022-01-01';
        const endDate = '2028-12-31';
        const path = `/tasks/getHeatMapData/${encodeURIComponent(userID)}/${encodeURIComponent(startDate)}/${encodeURIComponent(endDate)}`;

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


    it('POST /tasks/updateCompletionStatus/:taskId/:completionStatus - should update completion status', (done) => {
        const completionStatus = 'false';
        const path = `/tasks/updateCompletionStatus/${encodeURIComponent(taskId)}/${encodeURIComponent(completionStatus)}`;

        const requestOptions = {
            method: 'POST',
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

    it('GET /getVisibilityByTaskId/:taskId - should get visibility by task id', (done) => {
        const path = `/tasks/getVisibilityByTaskId/${encodeURIComponent(taskId)}`;

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

    it('POST /updateVisibility/:taskId/:visibility - should update visibility', (done) => {
        const path = `/tasks/updateVisibility/${encodeURIComponent(taskId)}/${encodeURIComponent('true')}`;

        const requestOptions = {
            method: 'POST',
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




});
async function deleteTask(taskId) {
    if (taskId) {
        const path = `/tasks/deleteTask/${encodeURIComponent(taskId)}`;

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        await new Promise((resolve, reject) => {
            const req = http.request({
                hostname: 'localhost',
                port: 9000,
                path: path,
                method: requestOptions.method,
                headers: requestOptions.headers
            }, (res) => {
                res.on('end', () => {
                    resolve();
                });
            });
            req.end();
        });
    }
}

// CleanUp
deleteTask(taskId);