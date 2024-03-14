const SupabaseConnector = require('../APIGateway/Supabase.js');
// NOT YET TESTED
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

    async addChat(group_id, new_message, username) {

        let today_date = new Date();
        var time_added = "" + today_date.getDate() + "/"
            + (today_date.getMonth() + 1) + "/"
            + today_date.getFullYear() + " @ "
            + today_date.getHours() + ":"
            + today_date.getMinutes() + ":"
            + today_date.getSeconds();

        let { data, error } = await this.client
            .rpc('add_chat', {
                group_id,
                new_message,
                time_added,
                username
            })
        if (error) console.error(error)
        else console.log(data)

    }

    async updateGroupById(groupId, columnName, newData) {
        try {
            const result = await this.client
                .from('Groups')
                .update({ [columnName]: newData })
                .eq('GroupID', groupId)
                .select()
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addGroupMember(group_id, new_member) {
        let { data, error } = await this.client
            .rpc('add_member_to_group', {
                group_id,
                new_member
            })
        if (error) console.error(error)
        else console.log(data)
    }
}

module.exports = Groups;