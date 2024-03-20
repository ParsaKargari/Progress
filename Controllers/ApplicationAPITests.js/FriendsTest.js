
const { v1: uuidv1 } = require('uuid');
uuidv1();

const Friends = require('../ApplicationAPIs/Friends.js');
async function testFriends() {
    try {
        const friends = new Friends();
        console.log("begin testing")

        const fromID = "bc56dab0-40f4-4237-8b87-85f4dd3cd789";
        const toID = "0a377c79-4e19-40dc-9cab-228a81891969";
        if (1) {
            const friendRequest = await friends.sendAndReceiveFriendRequest(fromID, toID)
        }

        if (1) {
            const acceptFriendRequest = await friends.acceptFriendRequest(fromID, toID);
            console.log('acceptFriendRequest Result:', acceptFriendRequest);
            // const declineFriendRequest = await friends.declineFriendRequest(fromID, toID);
            // console.log('acceptFriendRequest Result:', resultRemoveReceive);
        }

        console.log("finished testing")
    } catch (error) {
        if (error) {
            console.log(error)
        }
    }
}

testFriends();