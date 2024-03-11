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
    // async updateTaskById(taskId, columnName, newData) {
    //     try {
    //         const updateObject = {};
    //         updateObject[columnName] = newData;

    //         const result = await this.client
    //             .from('Tasks')
    //             .update(updateObject)
    //             .eq('TaskID', taskId)
    //             .single();

    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // }

    async updateTaskById(taskId, columnName, newData) {
        try {
            const result = await this.client
                .from('Tasks')
                .update({ [columnName]: newData })
                .eq('TaskID', taskId)
                .select()
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addComment(task_id, username, new_comment) {
        try {
            let { data, error } = await this.client
                .rpc('append_to_comments', {
                    new_comment,
                    task_id,
                    username
                })
            if (error) console.error(error)
            else console.log(data)
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addReaction(task_id, username, new_reaction) {
        try {
            let { data, error } = await this.client
                .rpc('append_to_reactions', {
                    new_reaction,
                    task_id,
                    username
                })
            if (error) console.error(error)
            else console.log(data)
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

module.exports = Tasks;