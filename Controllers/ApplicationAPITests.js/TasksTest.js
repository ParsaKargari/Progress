const { v1: uuidv1 } = require('uuid');

const Tasks = require('../ApplicationAPIs/Tasks.js');
const Groups = require('../ApplicationAPIs/Groups.js');

async function testTasks() {
    try {
        const tasks = new Tasks();
        const groups = new Groups();
        console.log("bruh")
        // const createdTask = await tasks.createTask('', '2024-03-01', '2024-03-05', true);
        // console.log('Created Task:', createdTask);

        // const allTasks = await tasks.getTasks();
        // console.log('All Tasks:', allTasks);

        const taskById = await tasks.getTaskById('f912795e-fe34-4d17-9183-e8974e676038');
        console.log('Task by ID:', taskById);

        // const updatedTask = await tasks.updateTaskById('f912795e-fe34-4d17-9183-e8974e676038', 'TaskDescription', 'Updated Task brooooas');
        // console.log('Updated Task:', updatedTask);

        const commentedTask = await tasks.addComment('2c823f98-e515-4227-b29b-2251ab0349a0', 'user1', 'SEPARATION')

        const reactedTask = await tasks.addReaction("2c823f98-e515-4227-b29b-2251ab0349a0", 'SEPARATION', 'Thomas');

        console.log('finished testing');
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

testTasks();
