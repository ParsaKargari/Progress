
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

    async sendFriendRequest(from_id, from_username, to_id, to_username) {
        let { data, error } = await this.client
            .rpc('send_friend_request', {
                from_id,
                from_username,
                to_id,
                to_username
            })
        if (error) console.error(error)
        else console.log(data)
        let { data2, error2 } = await this.client
            .rpc('set_friend_request', {
                from_id,
                from_username,
                to_id,
                to_username
            })

        // this.setFriendRequestSent(from_id, from_username, to_id, to_username)
        if (error2) console.error(error2)
        else console.log(data2)

    }

    async setFriendRequestSent(from_id, from_username, to_id, to_username) {
        let { data, error } = await this.client
            .rpc('set_friend_request', {
                from_id,
                from_username,
                to_id,
                to_username
            })
        if (error) console.error(error)
        else console.log(data)
    }

}

module.exports = SignUp;
