const SupabaseConnector = require('../../SupabaseConnector');

class Activity {
    constructor() {
        this.supabase = new SupabaseConnector();
        this.client = this.supabase.getClient();
    }

    // Retrieves list of friends for a given person ID
    async getListOfFriendsFromMyID(person_value) {
        try {
            let { data, error } = await this.client
                .rpc('getfriendswithperson', {
                    person_value
                });
            if (error) console.error(error);

            data.push(person_value);
            console.log("Push Data: ", data);

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    // Retrieves list of tasks for a given list of IDs
    async getListOfTasksFromIDList(ids) {
        try {
            let { data, error } = await this.client.rpc('get_tasks_with_user_ids', { ids });
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    // Posts a comment on a task
    async PostComment(task_id, user_id, comment) {
        try {
            const result = await this.client
                .from('Comments')
                .insert([{ TaskID: task_id, MadeByUserID: user_id, CommentText: comment }])
                .select();
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    // Retrieves all comments for a list of task IDs
    async ViewAllComments(task_ids) {
        try {
            const result = await this.client.rpc('getcommentsgivenlistoftasks', { task_ids });
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    // Posts a reaction to a task
    async PostReaction(task_id_input, made_by_user_id_input, reaction_input) {
        try {
            const result = await this.client.rpc('insert_or_delete_post_reaction', { task_id_input, made_by_user_id_input, reaction_input });
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    // Retrieves all reactions for a list of task IDs
    async GetAllReactionsGivenTaskIDList(task_ids_param) {
        try {
            const result = await this.client.rpc('get_reactions_with_task_ids_list', { task_ids_param });
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    // Helper function to retrieve user IDs and usernames
    async HelperFunctionForGetListOfUserIDAndUserName(user_ids) {
        console.log(user_ids);
        let { data, error } = await this.client.rpc('get_usernames_as_json', { user_ids });
        if (error) {
            console.error(error);
        } else {
            console.log(data);
            return data;
        }
    }
}

module.exports = Activity;