const SupabaseConnector = require('../APIGateway/Supabase.js');
const toID = "bc56dab0-40f4-4237-8b87-85f4dd3cd789";
const fromID = "60f71a71-d6ed-4e14-ace5-1a13542c8817";
const toName = "sad"
const fromName = "parsak"
class Friends {
    constructor() {
        this.supabase = new SupabaseConnector();
        this.client = this.supabase.getClient();
    }

    async addFriend(friend1ID, friend2ID, friend1Username, friend2Username, friend1Status, friend2Status) {
        try {
            const result = await this.client
                .from('Friends')
                .insert([{ Person1: friend1ID, Person2: friend2ID, Person1Username: friend1Username, Person2Username: friend2Username, Person1Status: friend1Status, Person2Status: friend2Status, DateBegan: new Date() }])
                .select();
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getFriendsByID(person_id) {
        let { data, error } = await this.client
            .rpc('bothuserfriends', {
                person_id
            })
        if (error) console.error(error)
        // else console.log(data)
        return data;
    }

    async sendFriendRequest(from_id, to_id) {
        let { data, error } = await this.client
            .rpc('send_friend_request', {
                from_id,
                to_id
            })
        if (error) console.error(error)
        else console.log(data)

    }

    async receiveFriendRequest(from_id, to_id) {
        let { data, error } = await this.client
            .rpc('receive_friend_request', {
                from_id,
                to_id
            })
        if (error) console.error(error)
        else console.log(data)
    }
    async removeFriendRequestReceived(from_id, to_id) {
        let { data, error } = await this.client
            .rpc('remove_friend_request', {
                from_id,
                to_id,
            })
        if (error) console.error(error)
        else console.log(data)
    }

    async removeFriendRequestSent(from_id, to_id) {
        let { data, error } = await this.client
            .rpc('remove_friend_request_sent', {
                from_id,
                to_id,
            })
        if (error) console.error(error)
        else console.log(data)
    }

    async getFriendUsername(user_id) {
        const { data, error } = await this.client
            .from('Users')
            .select('Username')
            .eq('UserID', user_id);
        return data
    }

    async getFriendStatus(user_id) {
        const { data, error } = await this.client
            .from('Users')
            .select('Status')
            .eq('UserID', user_id);
        return data
    }


    async sendAndReceiveFriendRequest(fromID, toID) {
        const resultSend = await this.sendFriendRequest(fromID, toID);
        const resultReceive = await this.receiveFriendRequest(fromID, toID);
    }

    async acceptFriendRequest(fromID, toID) {
        const resultRemoveReceive = await this.removeFriendRequestReceived(fromID, toID);
        const resultRemoveSend = await this.removeFriendRequestSent(fromID, toID);
        const fromUsername = await this.getFriendUsername(fromID);
        const toUsername = await this.getFriendUsername(toID);
        const fromStatus = await this.getFriendStatus(fromID);
        const toStatus = await this.getFriendStatus(toID);
        const addedFriend = await this.addFriend(fromID, toID, fromUsername[0].Username, toUsername[0].Username, fromStatus[0].Status, toStatus[0].Status);

    }

    async declineFriendRequest(fromID, toID) {
        const resultRemoveReceive = await this.removeFriendRequestReceived(fromID, toID);
        const resultRemoveSend = await this.removeFriendRequestSent(fromID, toID);
    }

    async sendAndReceiveFriendRequest(fromID, toID) {
        const resultSend = await signup.sendFriendRequest(fromID, toID);
        const resultReceive = await signup.receiveFriendRequest(fromID, toID);
    }

    async acceptFriendRequest(fromID, toID) {
        const resultRemoveReceive = await signup.removeFriendRequestReceived(fromID, toID);
        const resultRemoveSend = await signup.removeFriendRequestSent(fromID, toID);
        const addedFriend = this.addFriend(fromID, toID);
    }

    async declineFriendRequest(fromID, toID) {
        const resultRemoveReceive = await signup.removeFriendRequestReceived(fromID, toID);
        const resultRemoveSend = await signup.removeFriendRequestSent(fromID, toID);
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