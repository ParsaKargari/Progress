


const Friends = require('../ApplicationAPIs/Friends.js');
async function testFriends() {
    try {
        const friends = new Friends();
        console.log("begin testing")

        const toID = "0a377c79-4e19-40dc-9cab-228a81891969";
        const fromID = "60f71a71-d6ed-4e14-ace5-1a13542c8817";
        const toName = "sad"
        const fromName = "parsak"
        const fromID2 = "bc56dab0-40f4-4237-8b87-85f4dd3cd789";
        const fromName2 = "sad"
        const fromID3 = "67a47faa-f751-4573-8ad1-db6bd6ecabf6";
        const fromName3 = "davidsmurfing"
        const fromID4 = "369d491d-e85a-4719-8e22-0d488c4c0b00";
        const fromName4 = "joao"
        idlist = ["0a377c79-4e19-40dc-9cab-228a81891969",
            "60f71a71-d6ed-4e14-ace5-1a13542c8817",
            "bc56dab0-40f4-4237-8b87-85f4dd3cd789"];
        const percentage = await friends.getPercentage("2de6e655-4a5d-46ed-8fa5-331faf789295");
        const alldata = await friends.getFriendsWithPersonAllData("369d491d-e85a-4719-8e22-0d488c4c0b00")
        console.log(alldata)

        if (0) {

            const friendRequest = await friends.sendAndReceiveFriendRequest(fromID, toID)
            const friendRequest2 = await friends.sendAndReceiveFriendRequest(fromID2, toID)
            const friendRequest3 = await friends.sendAndReceiveFriendRequest(fromID3, toID)
            const friendRequest4 = await friends.sendAndReceiveFriendRequest(fromID4, toID)
        }

        if (0) {
            const acceptFriendRequest = await friends.acceptFriendRequest(fromID, toID);
            const acceptFriendRequest2 = await friends.acceptFriendRequest(fromID2, toID);
            const acceptFriendRequest3 = await friends.acceptFriendRequest(fromID3, toID);
            const acceptFriendRequest4 = await friends.acceptFriendRequest(fromID4, toID);
            //console.log('acceptFriendRequest Result:', acceptFriendRequest);
            //const declineFriendRequest = await friends.declineFriendRequest(fromID, toID);
            //console.log('declineFriendRequest Result:', declineFriendRequest);
        }
        if (0) {
            const sendRequest1 = await friends.sendFriendRequest(toID, fromID)
            const sendRequest2 = await friends.sendFriendRequest(toID, fromID2)
            // const rcvRequest1 = await friends.receiveFriendRequest(toID, fromID)
            // const rcvRequest2 = await friends.receiveFriendRequest(toID, fromID2)
            // const sendRequest2 = await friends.sendFriendRequest(toID, fromID2)
            // const sendRequest3 = await friends.sendFriendRequest(toID, fromID3)
            // const sendRequest4 = await friends.sendFriendRequest(toID, fromID4)
        }

        //const friendsByID = await friends.getFriendsByID(toID)
        // const bruh = await friends.getUserNamesFromIDList(idlist)
        // console.log("friends by id:", friendsByID)
        console.log("finished testing")
    } catch (error) {
        if (error) {
            console.log(error)
        }
    }
}

testFriends();