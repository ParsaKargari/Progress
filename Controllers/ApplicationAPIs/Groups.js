const SupabaseConnector = require('../APIGateway/Supabase.js');

class Groups {
    constructor() {
        this.supabase = new SupabaseConnector();
        this.client = this.supabase.getClient();
    }

    async createGroup(groupName, members, groupStatus, chat, admin) {
        try {
            const result = await this.client
                .from('Groups')
                .insert([{ GroupName: groupName, Members: members, GroupStatus: groupStatus, Chat: chat, Admin: admin }])
                .select();
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getGroups() {
        try {
            const result = await this.client
                .from('Groups')
                .select('*');
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getGroupById(groupId) {
        try {
            const result = await this.client
                .from('Groups')
                .select('*')
                .eq('GroupID', groupId)
                .single();
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = Groups;