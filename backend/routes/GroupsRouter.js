// Importing required modules
const express = require('express');
const router = express.Router();
const Groups = require('../Controllers/ApplicationAPIs/Groups');

// Creating a new instance of Groups
const groups = new Groups();

// Route to create a new group
router.post('/createGroup', async(req, res) => {
    // Destructuring request body
    const { groupName, members, groupStatus, chat, admin } = req.body;
    try {
        // Attempt to create a new group
        const result = await groups.createGroup(groupName, members, groupStatus, chat, admin);
        // Send the result as a response
        res.json(result);
    } catch (error) {
        // Send an error response in case of an exception
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all groups
router.get('/getGroups', async(req, res) => {
    try {
        // Attempt to get all groups
        const result = await groups.getGroups();
        // Send the result as a response
        res.json(result);
    } catch (error) {
        // Send an error response in case of an exception
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get a group by its ID
router.get('/getGroup/:groupId', async(req, res) => {
    // Extracting groupId from request parameters
    const groupId = req.params.groupId;
    try {
        // Attempt to get a group by its ID
        const result = await groups.getGroupById(groupId);
        // Send the result as a response
        res.json(result);
    } catch (error) {
        // Send an error response in case of an exception
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Exporting the router
module.exports = router;