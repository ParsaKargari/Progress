const SupabaseConnector = require('../../SupabaseConnector.js');

class Tasks {
    constructor() {
        this.supabase = new SupabaseConnector();
        this.client = this.supabase.getClient();
    }

    // Creates a new task with provided details
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

    // Retrieves tasks of a user by their ID
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

    // Retrieves a task by its ID
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

    // Updates task visibility by its ID
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

    // Adds a comment to a task
    async addComment(task_id, username, new_comment) {
        try {
            let { data, error } = await this.client
                .rpc('append_to_comments', { new_comment, task_id, username });
            if (error) console.error(error);
            else console.log(data);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Retrieves heat map data for a user within a specified date range
    async getHeatMapData(userID, startDate, endDate) {
        try {
            const tasks = await this.client
                .from('Tasks')
                .select('AddedDate, CompletionStatus')
                .eq('UserID', userID)
                .gte('DueDate', startDate)
                .lte('DueDate', endDate);

            // Process task data to generate heat map
            let map = {};
            tasks.data.forEach(task => {
                const key = task.AddedDate;
                if (!map[key]) {
                    map[key] = { count: 0, completed: 0 };
                }
                map[key].count++;
                if (task.CompletionStatus) {
                    map[key].completed++;
                }
            });

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

    // Retrieves task visibility by its ID
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

    // Deletes a task by its ID
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

    // Adds due date to a task
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

    // Updates completion status of a task
    async updateCompletionStatus(taskId, completionStatus) {
        try {
            let completionTime = null;
            if (completionStatus) {
                completionTime = new Date().toISOString();
            }
            const result = await this.client
                .from('Tasks')
                .update({
                    CompletionStatus: completionStatus,
                    CompletionTime: completionTime
                })
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