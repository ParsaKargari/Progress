const SupabaseConnector = require('../APIGateway/Supabase.js');
//  TO BE TESTED
class Tasks {
    constructor() {
        this.supabase = new SupabaseConnector();
        this.client = this.supabase.getClient();
    }

    async createTask(userID, taskDescription, addedDate, dueDate, publicVisibility) {
        try {
            const result = await this.client
                .from('Tasks')
                .insert([{ UserID: userID, TaskDescription: taskDescription, AddedDate: addedDate, DueDate: dueDate, PublicVisibility: publicVisibility }])
                .select();
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getTasks() {
        try {
            const result = await this.client
                .from('Tasks')
                .select('*');
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getTaskById(taskId) {
        try {
            const result = await this.client
                .from('Tasks')
                .select('*')
                .eq('TaskID', taskId)
                .single();
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async updateTaskById(taskId, columnName, newData) {
        try {
            const updateObject = {};
            updateObject[columnName] = newData;

            const result = await this.client
                .from('Tasks')
                .update(updateObject)
                .eq('TaskID', taskId)
                .single();

            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

module.exports = Tasks;