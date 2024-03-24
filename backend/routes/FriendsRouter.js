const express = require('express');
const router = express.Router();
const Friends = require('../../Controllers/ApplicationAPIs/Friends');
const friends = new Friends();

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


router.post('/addFriend', async (req, res) => {
    const { friend1, friend2 } = req.body;
    try {
        const result = await friends.addFriend(friend1, friend2);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/getFriends', async (req, res) => {
    try {
        const result = await friends.getFriends();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/search', async (req, res) => {
    try {
        const result = await friends.getFriends();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/:id", async function (req, res, next) {

    // const user = await friends.getFriendUsername(req.params.id);
    // console.log(user);
    const friendsByID = await friends.getFriendsByID(req.params.id);
    const username = await friends.getFriendUsername(req.params.id);
    const status = await friends.getFriendStatus(req.params.id)
    console.log(friendsByID)
    console.log(username)
    console.log(status)
    // friendsByID.forEach(friend => {
    //     if (friend)
    // })
    // console.log(friendsByID)

    var splitIDs;
    var parsedFriendsJson = []
    friendsByID.forEach(async item => {
        // Access the property 'bothuserfriends' of each object
        splitIDs = item.bothuserfriends.split(" ");
        // const status = await friends.getFriendUsername(splitIDs[0])
        // console.log(status)
        //console.log(splitIDs)
        splitIDs.splice(splitIDs.indexOf(req.params.id), 1);
        splitIDs.splice(splitIDs.indexOf(username[0].Username), 1);
        splitIDs.splice(splitIDs.indexOf(status[0].Status), 1);
        // console.log(splitIDs)
        // console.log(splitIDs)
        parsedFriendsJson.push({ friendID: splitIDs[0], friendUsername: splitIDs[1], friendStatus: splitIDs[2] });
    });
    console.log(parsedFriendsJson)
    res.send(parsedFriendsJson)

});

module.exports = router;