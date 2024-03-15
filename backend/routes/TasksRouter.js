const express = require('express');
const router = express.Router();
const Tasks = require('../../Controllers/ApplicationAPIs/Tasks');

const tasks = new Tasks();

router.post('/createTask', async(req, res) => {
    const { taskDescription, addedDate, dueDate, publicVisibility } = req.body;
    try {
        const result = await tasks.createTask(taskDescription, addedDate, dueDate, publicVisibility);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getTasks', async(req, res) => {
    try {
        const result = await tasks.getTasks();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/getTask/:taskId', async(req, res) => {
    const taskId = req.params.taskId;
    try {
        const result = await tasks.getTaskById(taskId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/addComment', async(req, res) => {
    const { task_id, username, new_comment } = req.body;
    try {
        const result = await tasks.addComment(task_id, username, new_comment);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/getHeatMapData/:userID/:startDate/:endDate', async(req, res) => {
    const { userID, startDate, endDate } = req.params;
    try {
        const result = await tasks.getHeatMapData(userID, startDate, endDate);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;