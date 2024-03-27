const SupabaseConnector = require('../APIGateway/Supabase.js');
class Activity {
    constructor() {
        this.supabase = new SupabaseConnector();
        this.client = this.supabase.getClient();}




        //David Made This ONE
        async getListOfFriendsFromMyID(person_value) {
            try{
            let { data, error } = await this.client
            .rpc('getfriendswithperson', {
                person_value
            })
            if (error) console.error(error)
            
            return data;
        }
            catch(error){
                console.error(error);
                
            }
        }
    
        async getListOfTasksFromIDList(ids) {
            // ids = [
            //     '1f8fa9f7-69f4-41f1-97d4-c3903f583158',
            //     'bfe67180-dd8a-11ee-bd50-8346420c96fe',
            //     'some-user-id'
            // ];
            try{
                let {data, error} = await this.client.rpc('get_tasks_with_user_ids', {ids});
                //console.log(data)
                return data;
            }
            catch(error){
                console.error(error);
            }
        }

        async PostComment (task_id, user_id, comment) {

            const result = await this.client
            .from('Comments').insert([{ TaskID: task_id, MadeByUserID: user_id, CommentText: comment }]).select();
            return result;


        }

        async ViewAllComments (task_ids) {
            try{
                const result = await this.client.rpc('getcommentsgivenlistoftasks', {task_ids});
                return result;
            }
            catch(error){
                console.error(error);
                return error;
            }
            return "problem";



        }

        async HelperFunctionForGetListOfUserIDAndUserName(user_ids) {
            console.log(user_ids);
            let { data, error } = await this.client.rpc('get_usernames_as_json', {
                user_ids
            })
            if (error) {
                console.error(error);}
            else {
                console.log(data);
                return data;
            }
        }   
    }
    module.exports = Activity;