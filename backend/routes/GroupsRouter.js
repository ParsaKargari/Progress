const express = require('express');
const router = express.Router();
const Groups = require('../../Controllers/ApplicationAPIs/Groups');

const groups = new Groups();

router.post('/createGroup', async(req, res) => {
    const { groupName, members, groupStatus, chat, admin } = req.body;
    try {
        const result = await groups.createGroup(groupName, members, groupStatus, chat, admin);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/getGroups', async(req, res) => {
    try {
        const result = await groups.getGroups();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getGroup/:groupId', async(req, res) => {
    const groupId = req.params.groupId;
    try {
        const result = await groups.getGroupById(groupId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;