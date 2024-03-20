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

    const friendsByID = await friends.getFriendsByID(req.params.id);
    // for (let i = 0; i < friendsByID.length; i++) {
    //     // if(friendsByID[])
    //     res.send(friendsByID[1])
    // }
    var splitIDs;
    var parsedFriendsJson = []
    // friendsByID.forEach(async item => {
    //     // Access the property 'bothuserfriends' of each object
    //     splitIDs = item.bothuserfriends.split(" ");
    //     splitIDs.splice(splitIDs.indexOf(req.params.id), 1);

    //     let friendUsername = await friends.getFriendUsername(splitIDs);
    //     console.log(friendUsername[0])
    //     parsedFriendsJson.push({ friendID: splitIDs, friendUsername: friendUsername });
    //     //console.log(parsedFriendsJson)
    //     // res.send(peopleIDs);
    // });
    const promises = friendsByID.map(async item => {
        // Access the property 'bothuserfriends' of each object
        let splitIDs = item.bothuserfriends.split(" ");
        splitIDs.splice(splitIDs.indexOf(req.params.id), 1);

        const friendUsername = await friends.getFriendUsername(splitIDs);
        console.log(friendUsername);

        return { friendID: splitIDs, friendUsername: friendUsername[0].Username };
    });

    Promise.all(promises)
        .then(parsedFriendsJson => {
            // All asynchronous operations have completed here
            console.log(parsedFriendsJson);
            // Now you can do whatever you need with the parsedFriendsJson
            // For example, you can send it as a response
            res.send(parsedFriendsJson);

        })
    console.log("BRUE")
    // res.send(parsedFriendsJson)

});

module.exports = router;