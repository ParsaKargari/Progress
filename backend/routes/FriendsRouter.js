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

router.get("/:id", async function (req, res, next) {

    // const user = await friends.getFriendUsername(req.params.id);
    // console.log(user);
    const friendsByID = await friends.getFriendsByID(req.params.id);
    // console.log(friendsByID)

    var splitIDs;
    var parsedFriendsJson = []
    friendsByID.forEach(async item => {
        // Access the property 'bothuserfriends' of each object
        splitIDs = item.bothuserfriends.split(" ");
        splitIDs.splice(splitIDs.indexOf(req.params.id), 1);
        splitIDs.splice(splitIDs.indexOf(req.params.id), 1);
        // console.log(splitIDs)

        parsedFriendsJson.push({ friendID: splitIDs[0], friendUsername: splitIDs[1] });
    });
    console.log(parsedFriendsJson)
    console.log("bruhhh")
    res.send(parsedFriendsJson)

});

module.exports = router;