

const SupabaseConnector = require('../APIGateway/Supabase.js');
class SignUp {
    constructor() {
        this.supabase = new SupabaseConnector();
        this.client = this.supabase.getClient();
    }

    async getUsername(user_id) {

        const { data, error } = await this.client
            .from('Users')
            .select('Username')
            .eq('UserID', user_id);
        return data
    }

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



}

module.exports = SignUp;
