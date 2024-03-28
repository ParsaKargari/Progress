const SupabaseConnector = require('../APIGateway/Supabase.js');

class SignUp {
    constructor() {
        this.supabase = new SupabaseConnector();
        this.client = this.supabase.getClient();
    }

    // Retrieves the username of a user by their ID
    async getUsername(user_id) {
        const { data, error } = await this.client
            .from('Users')
            .select('Username')
            .eq('UserID', user_id);
        return data;
    }

    // Adds a username to a user's profile
    async addUsername(userName, user_id) {
        try {
            const result = await this.client
                .from('Users')
                .update([{ Username: userName }])
                .eq('UserID', user_id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Adds a status to a user's profile
    async addStatus(status, user_id) {
        try {
            const result = await this.client
                .from('Users')
                .update([{ Status: status }])
                .eq('UserID', user_id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Adds an email to a user's profile
    async addEmail(email, user_id) {
        try {
            const result = await this.client
                .from('Users')
                .update([{ UserEmail: email }])
                .eq('UserID', user_id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Sends a friend request from one user to another
    async sendFriendRequest(from_id, to_id) {
        let { data, error } = await this.client
            .rpc('send_friend_request', { from_id, to_id });
        if (error) console.error(error);
        else console.log(data);
    }

    // Receives a friend request from another user
    async receiveFriendRequest(from_id, to_id) {
        let { data, error } = await this.client
            .rpc('receive_friend_request', { from_id, to_id });
        if (error) console.error(error);
        else console.log(data);
    }

    // Removes a received friend request
    async removeFriendRequestReceived(from_id, to_id) {
        let { data, error } = await this.client
            .rpc('remove_friend_request', { from_id, to_id });
        if (error) console.error(error);
        else console.log(data);
    }

    // Removes a sent friend request
    async removeFriendRequestSent(from_id, to_id) {
        let { data, error } = await this.client
            .rpc('remove_friend_request_sent', { from_id, to_id });
        if (error) console.error(error);
        else console.log(data);
    }
}

module.exports = SignUp;