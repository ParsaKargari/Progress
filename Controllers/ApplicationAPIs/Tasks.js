const SupabaseConnector = require('../APIGateway/Supabase.js');

// const { v1: uuidv1 } = require('uuid');

class Tasks {
    constructor() {
        this.supabase = new SupabaseConnector();
        this.client = this.supabase.getClient();
    }

    async createTask(userId, taskDescription, addedDate, dueDate, publicVisibility) {
        try {
            const result = await this.client
                .from('Tasks')
                .insert([{ UserID: userId, TaskDescription: taskDescription, AddedDate: addedDate, DueDate: dueDate, PublicVisibility: publicVisibility }])
                .select();
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async getTasks(userId) {
        try {
            const result = await this.client
                .from('Tasks')
                .select('*')
                .eq('UserID', userId);
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

    async updateTaskVisibility(taskId, newVisibility) {
        try {
            const result = await this.client
                .from('Tasks')
                .update({ PublicVisibility: newVisibility })
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

    async getHeatMapData(userID, startDate, endDate) {
        try {
            const tasks = await this.client
                .from('Tasks')
                .select('AddedDate, CompletionStatus')
                .eq('UserID', userID)
                .gte('DueDate', startDate)
                .lte('DueDate', endDate);
    
            let map = {};
            tasks.data.forEach(task => {
                const key = task.AddedDate;
                // Initialize the key in the map if it doesn't exist
                if (!map[key]) {
                    map[key] = { count: 0, completed: 0 };
                }
                // Increment the count for each task
                map[key].count++;
                // If the task is completed, also increment the completed count
                if (task.CompletionStatus) {
                    map[key].completed++;
                }
            });
    
            // The map will have the format: {'YYYY-MM-DD': { count: x, completed: y }, ...}
            // Convert it to an array of objects with the desired format
            let result = Object.keys(map).map(key => {
                return {
                    date: key.replaceAll("-", "/"),
                    count: map[key].count,
                    completed: map[key].completed
                };
            });
    
            console.log(result);
            return result;
    
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async getVisibilityByTaskId(taskId) {
        try {
            const result = await this.client
                .from('Tasks')
                .select('PublicVisibility')
                .eq('TaskID', taskId)
                .single();
            return result.data.PublicVisibility;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async deleteTaskById(taskId) {
        try {
            const result = await this.client
                .from('Tasks')
                .delete()
                .eq('TaskID', taskId);
            return result > 0;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addDueDate(taskId, dueDate) {
        try {
            const result = await this.client
                .from('Tasks')
                .update({ DueDate: dueDate })
                .eq('TaskID', taskId)
                .select();
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateCompletionStatus(taskId, completionStatus) {
        try {
            const result = await this.client
                .from('Tasks')
                .update({ CompletionStatus: completionStatus })
                .eq('TaskID', taskId)
                .select();
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }




}
module.exports = Tasks;