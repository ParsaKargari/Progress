const SupabaseConnector = require('../APIGateway/Supabase.js');

// const { v1: uuidv1 } = require('uuid');

class Tasks {
    constructor() {
        this.supabase = new SupabaseConnector();
        this.client = this.supabase.getClient();
    }

    async createTask(taskDescription, addedDate, dueDate, publicVisibility) {
        try {
            const result = await this.client
                .from('Tasks')
                .insert([{ UserID: uuidv1(), TaskDescription: taskDescription, AddedDate: addedDate, DueDate: dueDate, PublicVisibility: publicVisibility }])
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

    async addReaction(task_id, new_reaction, username) {
        try {
            let { data, error } = await this.client
                .rpc('add_to_reactions', {
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

    async getHeatMapData(userID, startDate, endDate) {
        try {
            const tasks = await this.client
                .from('Tasks')
                .select('AddedDate')
                .eq('UserID', userID)
                .gte('DueDate', startDate)
                .lte('DueDate', endDate);
            // console.log(tasks)
            let map = {};
            tasks.data.forEach(task => {
                const key = task.AddedDate;
                if (!map[key]) {
                    map[key] = 1;
                } else {
                    map[key]++;
                }
            });

            console.log(map)

            let newMap = {};
            for (let key in map) {
                newMap["date"] = key.replaceAll("-", "/");
                newMap["count"] = map[key]
            };

            console.log(newMap);
            return newMap;


        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

module.exports = Tasks;