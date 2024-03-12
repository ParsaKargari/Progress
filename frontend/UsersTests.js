
const SignUp = require('./src/Controllers/ApplicationAPIs/SignUp.js');

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

    const fromID = "0a377c79-4e19-40dc-9cab-228a81891969";
    const fromUsername = 'thomas';
    const toUsername = 'dannick'
    const toID = "e3202c34-b4af-412a-a079-d23ac47ace22";
    try {

        const result = await signup.sendFriendRequest(fromID, fromUsername, toID, toUsername);
        console.log('sendFriendRequest Result:', result);
    } catch (error) {
        console.error('Error in addEmail:', error);
    }
}

// Run the test functions
testUsers();