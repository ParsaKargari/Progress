
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





}

module.exports = SignUp;
