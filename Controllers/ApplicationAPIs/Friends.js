const SupabaseConnector = require('../APIGateway/Supabase.js');

class Friends {
    constructor() {
        this.supabase = new SupabaseConnector();
        this.client = this.supabase.getClient();
    }

    async addFriend(friend1, friend2) {
        try {
            const result = await this.client
                .from('Friends')
                .insert([{ Person1: friend1, Person2: friend2, DateBegan: new Date() }])
                .select();
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getFriends() {
        try {
            const result = await this.client
                .from('Friends')
                .select('*');
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
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
}

module.exports = Friends;