const express = require('express');
const router = express.Router();
const Tasks = require('../Controllers/ApplicationAPIs/Tasks');

const tasks = new Tasks();

router.post('/createTask/:userId/:addedDate/:taskDescr', async(req, res) => {
    const { userId, addedDate, taskDescr } = req.params;
    try {
        // Set the due date to the next day by default
        const today = new Date().toISOString().split('T')[0];
        const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const result = await tasks.createTask(userId, taskDescr, addedDate, nextDay, false);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get('/getTasks/:userId', async(req, res) => {
    const userId = req.params.userId;
    try {
        const result = await tasks.getTasks(userId);
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

router.get('/getVisibilityByTaskId/:taskId', async(req, res) => {
    const { taskId } = req.params;
    try {
        const visibility = await tasks.getVisibilityByTaskId(taskId);
        res.json({ visibility });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/updateVisibility/:taskId/:visibility', async(req, res) => {
    const { taskId, visibility } = req.params;
    const isPublic = visibility === 'true';

    try {
        const result = await tasks.updateTaskVisibility(taskId, isPublic);;
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/deleteTask/:taskId', async(req, res) => {
    const { taskId } = req.params;

    try {
        const result = await tasks.deleteTaskById(taskId);
        if (result) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/addDueDate/:taskId/:dueDate', async(req, res) => {
    const { taskId } = req.params;
    let { dueDate } = req.params;
    dueDate = new Date(dueDate);

    try {
        const result = await tasks.addDueDate(taskId, dueDate);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/updateCompletionStatus/:taskId/:completionStatus', async(req, res) => {
    const { taskId, completionStatus } = req.params;

    try {
        const result = await tasks.updateCompletionStatus(taskId, completionStatus === 'true');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;