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
}

module.exports = Friends;