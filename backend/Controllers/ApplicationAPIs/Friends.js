const SupabaseConnector = require('../../SupabaseConnector.js');

class Friends {
    constructor() {
        this.supabase = new SupabaseConnector();
        this.client = this.supabase.getClient();
    }

    // Adds a new friend connection between two users
    async addFriend(
        friend1ID, friend2ID,
        friend1Username, friend2Username,
        friend1Status, friend2Status,
        friend1Percentage, friend2Percentage
    ) {
        try {
            const result = await this.client
                .from('Friends')
                .insert([{
                    Person1: friend1ID,
                    Person2: friend2ID,
                    Person1Username: friend1Username,
                    Person2Username: friend2Username,
                    Person1Status: friend1Status,
                    Person2Status: friend2Status,
                    Person1Percentage: friend1Percentage,
                    Person2Percentage: friend2Percentage,
                    DateBegan: new Date()
                }])
                .select();
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Updates the status of a friend (e.g., accepted, declined)
    async updateFriendStatus(id, column_name, new_status, person) {
        const { data, error } = await this.client
            .from('Friends')
            .update({
                [column_name]: new_status
            })
            .eq([person], id)
            .select();
    }

    // Updates the online status of a user
    async updateOnlineStatus(id, new_status) {
        const { data, error } = await this.client
            .from('Users')
            .update({ OnlineStatus: new_status })
            .eq('UserID', id)
            .select();
    }

    // Retrieves friends of a user by their ID
    async getFriendsByID(person_id) {
        let { data, error } = await this.client
            .rpc('bothuserfriends', { person_id });
        if (error) console.error(error)
        return data;
    }

    // Retrieves all data of friends with a given person
    async getFriendsWithPersonAllData(person_value) {
        let { data, error } = await this.client
            .rpc('getfriendswithpersonall', { person_value });
        return data;
    }

    // Retrieves the online status of a user
    async getUserOnlineStatus(user_id) {
        const { data, error } = await this.client
            .from('Users')
            .select('OnlineStatus')
            .eq('UserID', user_id);
        return data;
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
        return data;
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

    // Retrieves the username of a user by their ID
    async getFriendUsername(user_id) {
        const { data, error } = await this.client
            .from('Users')
            .select('Username')
            .eq('UserID', user_id);
        return data;
    }

    // Retrieves the ID of a user by their username
    async getFriendID(username) {
        const { data, error } = await this.client
            .from('Users')
            .select('UserID')
            .eq('Username', username);
        return data;
    }

    // Retrieves usernames from a list of user IDs
    async getUserNamesFromIDList(ids) {
        let { data, error } = await this.client
            .rpc('get_usernames_by_ids', { ids });
        if (error) console.error(error);
        else console.log(data);
        return data;
    }

    // Retrieves the status of a friend
    async getFriendStatus(user_id) {
        const { data, error } = await this.client
            .from('Users')
            .select('Status')
            .eq('UserID', user_id);
        return data;
    }

    // Retrieves friend requests sent by a user
    async getRequestsSent(user_id) {
        const { data, error } = await this.client
            .from('Users')
            .select('RequestsSent')
            .eq('UserID', user_id);
        return data;
    }

    // Retrieves friend requests received by a user
    async getRequestsReceived(user_id) {
        const { data, error } = await this.client
            .from('Users')
            .select('RequestsReceived')
            .eq('UserID', user_id);
        return data;
    }

    // Retrieves the percentage of completed tasks for a user
    async getPercentage(user_id) {
        const { data, error } = await this.client
            .from('Tasks')
            .select('*')
            .eq('UserID', user_id);
        let falseCount = 0;
        let trueCount = 0;
        data.forEach(status => {
            if (status.CompletionStatus === true) {
                trueCount += 1;
            } else {
                falseCount += 1;
            }
        });

        if ((falseCount + trueCount) === 0) {
            return 0;
        } else {
            return ((trueCount / (falseCount + trueCount)) * 100);
        }
    }

    // Sends and receives a friend request simultaneously
    async sendAndReceiveFriendRequest(fromID, toID) {
        try {
            const resultSend = await this.sendFriendRequest(fromID, toID);
            const resultReceive = await this.receiveFriendRequest(fromID, toID);
        } catch (error) {
            console.log(error);
        }
    }

    // Accepts a friend request
    async acceptFriendRequest(fromID, toID) {
        const resultRemoveReceive = await this.removeFriendRequestReceived(fromID, toID);
        const resultRemoveSend = await this.removeFriendRequestSent(fromID, toID);
        const fromUsername = await this.getFriendUsername(fromID);
        const toUsername = await this.getFriendUsername(toID);
        const fromPercentage = await this.getPercentage(fromID);
        const toPercentage = await this.getPercentage(toID);
        console.log(toPercentage, fromPercentage);
        const fromStatus = await this.getFriendStatus(fromID);
        const toStatus = await this.getFriendStatus(toID);
        const addedFriend = await this.addFriend(fromID, toID,
            fromUsername[0].Username, toUsername[0].Username,
            fromStatus[0].Status, toStatus[0].Status,
            fromPercentage, toPercentage);
    }

    // Declines a friend request
    async declineFriendRequest(fromID, toID) {
        const resultRemoveReceive = await this.removeFriendRequestReceived(fromID, toID);
        const resultRemoveSend = await this.removeFriendRequestSent(fromID, toID);
    }
}

module.exports = Friends;