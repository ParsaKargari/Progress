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


router.get('/search/:input/:id', async (req, res) => {
    try {
        const newid = await friends.getFriendID(req.params.input);
        try  {
            const friendsByID = await friends.getFriendsWithPersonAllData(req.params.id);
            
            const requestsReceived = await friends.getRequestsReceived(req.params.id);
            
            
            
            console.log("FRIENDS BY ID", friendsByID);
            var friendsIDS = [];
            for (let i = 0; i < friendsByID.length; i++) {
                let friendID = friendsByID[i].Person1;


                if (friendsByID[i].Person1 === req.params.id) {
                    friendID = friendsByID[i].Person2;
                }
                friendsIDS.push(friendID);
            }
            if (!requestsReceived == null) {
                if (requestsReceived[0].RequestsReceived.includes(newid[0].UserID)) {
                    res.send('This user has already sent you a friend request! Accept it to add them as a friend.');
                }
            }
            

            else if (friendsIDS.includes(newid[0].UserID)) {
                res.send('User Already Added As Friend');
            }
            else {
                const test = await friends.sendAndReceiveFriendRequest(req.params.id, newid[0].UserID);
                res.send('Friend Request Successfully Sent.');
            }
        }
        catch (error) {
            res.send(error);
        }



    } catch (error) {
        console.log(error)
        res.send("Please Enter A Username")
    }
});

router.get('/search//:id', async (req, res) => {
    res.send("Please Enter A Username.");
});

router.get('/getRequests/:id', async (req, res) => {
    var requestsSent = await friends.getRequestsSent(req.params.id);
    var requestsReceived = await friends.getRequestsReceived(req.params.id);

    console.log(requestsReceived[0].RequestsReceived)
    console.log(requestsSent[0].RequestsSent)
    var usernamesSent = await friends.getUserNamesFromIDList(requestsReceived[0].RequestsReceived);
    var usernamesReceived = await friends.getUserNamesFromIDList(requestsSent[0].RequestsSent);
    let allRequests = [usernamesReceived, usernamesSent];

    res.send(allRequests);



});


router.get('/acceptFriend/:id/:friendId', async (req, res) => {
    await friends.acceptFriendRequest(req.params.friendId, req.params.id);

    res.send('success');

});

router.get('/declineFriend/:id/:friendId', async (req, res) => {
    await friends.declineFriendRequest(req.params.friendId, req.params.id);

    res.send('success');

});

router.get("/:id", async (req, res, next) => {

    const username = await friends.getFriendUsername(req.params.id);
    const status = await friends.getFriendStatus(req.params.id)
    const friendsByID = await friends.getFriendsWithPersonAllData(req.params.id)

    parsedFriendsJson = []
    for (let i = 0; i < friendsByID.length; i++) {
        let friendID = friendsByID[i].Person1;
        let friendUsername = friendsByID[i].Person1Username;
        let friendStatus = friendsByID[i].Person1Status;
        let friendPercentage = friendsByID[i].Person1Percentage;

        if (friendsByID[i].Person1 === req.params.id) {
            friendID = friendsByID[i].Person2;
            friendUsername = friendsByID[i].Person2Username;
            friendStatus = friendsByID[i].Person2Status;
            friendPercentage = friendsByID[i].Person2Percentage;
        }

        parsedFriendsJson.push({
            friendID: friendID,
            friendUsername: friendUsername,
            friendStatus: friendStatus,
            friendPercentage: friendPercentage
        });

    }
    res.send(parsedFriendsJson)

})

module.exports = router;