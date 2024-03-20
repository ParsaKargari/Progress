
const { v1: uuidv1 } = require('uuid');
uuidv1();

const Friends = require('../ApplicationAPIs/Friends.js');
async function testFriends() {
    try {
        const friends = new Friends();
        console.log("begin testing")

        const toID = "bc56dab0-40f4-4237-8b87-85f4dd3cd789";
        const fromID = "60f71a71-d6ed-4e14-ace5-1a13542c8817";
        const toName = "sad"
        const fromName = "parsak"

        //const addfriend = await friends.addFriend(fromID, toID, fromName, toName)
        if (1) {

            const friendRequest = await friends.sendAndReceiveFriendRequest(fromID, toID)
        }

        if (1) {
            const acceptFriendRequest = await friends.acceptFriendRequest(fromID, toID);
            //console.log('acceptFriendRequest Result:', acceptFriendRequest);
            //const declineFriendRequest = await friends.declineFriendRequest(fromID, toID);
            //console.log('declineFriendRequest Result:', declineFriendRequest);
        }
        const friendsByID = await friends.getFriendsByID(toID)

        // console.log("friends by id:", friendsByID)
        console.log("finished testing")
    } catch (error) {
        if (error) {
            console.log(error)
        }
    }
}

testFriends();