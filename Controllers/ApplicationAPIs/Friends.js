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

    async sendAndReceiveFriendRequest(fromID, toID) {
        const resultSend = await this.sendFriendRequest(fromID, toID);
        const resultReceive = await this.receiveFriendRequest(fromID, toID);
    }

    async acceptFriendRequest(fromID, toID) {
        const resultRemoveReceive = await this.removeFriendRequestReceived(fromID, toID);
        const resultRemoveSend = await this.removeFriendRequestSent(fromID, toID);
        const addedFriend = this.addFriend(fromID, toID);
    }

    async declineFriendRequest(fromID, toID) {
        const resultRemoveReceive = await this.removeFriendRequestReceived(fromID, toID);
        const resultRemoveSend = await this.removeFriendRequestSent(fromID, toID);
    }
}

module.exports = Friends;