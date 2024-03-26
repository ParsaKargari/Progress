const SupabaseConnector = require('../../SupabaseConnector.js');

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
}

module.exports = Friends;