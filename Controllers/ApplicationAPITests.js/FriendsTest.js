


const Friends = require('../ApplicationAPIs/Friends.js');
async function testFriends() {
    try {
        const friends = new Friends();
        console.log("begin testing")

        const toID = "bc56dab0-40f4-4237-8b87-85f4dd3cd789";
        const fromID = "60f71a71-d6ed-4e14-ace5-1a13542c8817";
        const toName = "sad"
        const fromName = "parsak"
        const fromID2 = "1f8fa9f7-69f4-41f1-97d4-c3903f583158";
        const fromName2 = "Dannick"
        const fromID3 = "67a47faa-f751-4573-8ad1-db6bd6ecabf6";
        const fromName3 = "davidsmurfing"
        const fromID4 = "369d491d-e85a-4719-8e22-0d488c4c0b00";
        const fromName4 = "joao"

        const percentage = await friends.getPercentage("2de6e655-4a5d-46ed-8fa5-331faf789295");
        console.log(percentage)

        //const addfriend = await friends.addFriend(fromID, toID, fromName, toName)
        if (0) {

            const friendRequest = await friends.sendAndReceiveFriendRequest(fromID, toID)
            // const friendRequest2 = await friends.sendAndReceiveFriendRequest(fromID2, toID)
            // const friendRequest3 = await friends.sendAndReceiveFriendRequest(fromID3, toID)
            // const friendRequest4 = await friends.sendAndReceiveFriendRequest(fromID4, toID)
        }

        if (0) {
            const acceptFriendRequest = await friends.acceptFriendRequest(fromID, toID);
            // const acceptFriendRequest2 = await friends.acceptFriendRequest(fromID2, toID);
            // const acceptFriendRequest3 = await friends.acceptFriendRequest(fromID3, toID);
            // const acceptFriendRequest4 = await friends.acceptFriendRequest(fromID4, toID);
            //console.log('acceptFriendRequest Result:', acceptFriendRequest);
            //const declineFriendRequest = await friends.declineFriendRequest(fromID, toID);
            //console.log('declineFriendRequest Result:', declineFriendRequest);
        }
        //const friendsByID = await friends.getFriendsByID(toID)

        // console.log("friends by id:", friendsByID)
        console.log("finished testing")
    } catch (error) {
        if (error) {
            console.log(error)
        }
    }
}

testFriends();