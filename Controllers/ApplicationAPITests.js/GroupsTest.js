const { v1: uuidv1 } = require('uuid');
uuidv1();

const Groups = require('./src/Controllers/ApplicationAPIs/Groups.js');

async function testGroups() {
    try {
        const groups = new Groups();
        console.log("start testing")
        //const addedMessage = await groups.addChat("57f830e1-a63d-4ae2-8c8e-43b206558cf3", 'this is a new mesage nice!', 'Thomas')
        //const updatedGroup = await groups.updateGroupById("57f830e1-a63d-4ae2-8c8e-43b206558cf3", 'GroupStatus', 'Offline')
        const addingMember = await groups.addGroupMember("57f830e1-a63d-4ae2-8c8e-43b206558cf3", 'david')
        console.log('finished testing');
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

testGroups();
