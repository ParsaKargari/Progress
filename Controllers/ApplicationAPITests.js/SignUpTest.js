const SignUp = require('../ApplicationAPIs/SignUp.js');

async function testUsers() {
    const userId = "0a377c79-4e19-40dc-9cab-228a81891969";
    const signup = new SignUp();
    // Testing getUsername function
    // try {
    //     const result = await signup.getUsername(userId);
    //     console.log('getUsername Result:', result);
    // } catch (error) {
    //     console.error('Error in getUsername:', error);
    // }

    // // Testing addUsername function

    // const newUsername = 'newUsername';
    // try {
    //     const result = await signup.addUsername(newUsername, userId);
    //     console.log('addUsername Result:', result);
    // } catch (error) {
    //     console.error('Error in addUsername:', error);
    // }

    // // Testing addStatus function

    // const newStatus = 'newStatus';
    // try {
    //     const result = await signup.addStatus(newStatus, userId);
    //     console.log('addStatus Result:', result);
    // } catch (error) {
    //     console.error('Error in addStatus:', error);
    // }


    // // Testing addEmail function

    // const newEmail = 'tomjellybomb@gmail.com';
    // try {
    //     const result = await signup.addEmail(newEmail, userId);
    //     console.log('addEmail Result:', result);
    // } catch (error) {
    //     console.error('Error in addEmail:', error);
    // }

    const fromID = "bc56dab0-40f4-4237-8b87-85f4dd3cd789";
    const toID = "0a377c79-4e19-40dc-9cab-228a81891969";
    try {
        if (0) {
            const resultSend = await signup.sendFriendRequest(fromID, toID);
            console.log('sendFriendRequest Result:', resultSend);
            const resultReceive = await signup.receiveFriendRequest(fromID, toID);
            console.log('receiveFriendRequest Result:', resultReceive);
        }

        if (1) {
            const resultRemoveReceive = await signup.removeFriendRequestReceived(fromID, toID);
            console.log('removeFriendRequest Result:', resultRemoveReceive);
            const resultRemoveSend = await signup.removeFriendRequestSent(fromID, toID);
            console.log('removeFriendRequest Result:', resultRemoveSend);
        }

        console.log("finished testing")
    } catch (error) {
        console.error('Error in addEmail:', error);
    }
}

// Run the test functions
testUsers();
