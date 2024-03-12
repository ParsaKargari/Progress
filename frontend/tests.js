
const { v1: uuidv1 } = require('uuid');
uuidv1();

const Tasks = require('./src/Controllers/ApplicationAPIs/Tasks.js');
const Groups = require('./src/Controllers/ApplicationAPIs/Groups.js');

async function testTasks() {
    try {
        const tasks = new Tasks();
        const groups = new Groups();
        console.log("bruh")
        // const createdTask = await tasks.createTask('Task 1', '2024-03-01', '2024-03-05', true);
        // console.log('Created Task:', createdTask);

        // const allTasks = await tasks.getTasks();
        // console.log('All Tasks:', allTasks);

        // const taskById = await tasks.getTaskById('f912795e-fe34-4d17-9183-e8974e676038');
        // console.log('Task by ID:', taskById);

        // const updatedTask = await tasks.updateTaskById('f912795e-fe34-4d17-9183-e8974e676038', 'TaskDescription', 'Updated Task brooooas');
        // console.log('Updated Task:', updatedTask);

        // const commentedTask = await tasks.addComment('2c823f98-e515-4227-b29b-2251ab0349a0', 'user1', 'swag like this task!')
        // console.log('finished testing');

        // const reactedTask = await tasks.addReaction("2c823f98-e515-4227-b29b-2251ab0349a0", '👍', 'Thomas');
        // const reactedTask = await tasks.addReaction("2c823f98-e515--b29b-2251ab0349a0", '👍', 'Thomas');


        const addedMessage = await groups.addChat("57f830e1-a63d-4ae2-8c8e-43b206558cf3", 'this is a new mesage', 'Thomas')
        console.log('finished testing');
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

testTasks();