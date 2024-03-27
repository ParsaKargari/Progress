const SupabaseConnector = require('../../SupabaseConnector.js');
class Friends {
    constructor() {
        this.supabase = new SupabaseConnector();
        this.client = this.supabase.getClient();
    }

    async addFriend(friend1ID, friend2ID,
        friend1Username, friend2Username,
        friend1Status, friend2Status,
        friend1Percentage, friend2Percentage) {
        try {
            const result = await this.client
                .from('Friends')
                .insert([{
                    Person1: friend1ID, Person2: friend2ID,
                    Person1Username: friend1Username, Person2Username: friend2Username,
                    Person1Status: friend1Status, Person2Status: friend2Status,
                    Person1Percentage: friend1Percentage, Person2Percentage: friend2Percentage,
                    DateBegan: new Date()
                }])
                .select();
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateFriendStatus(id, column_name, new_status, person) {
        const { data, error } = await this.client
            .from('Friends')
            .update({ [column_name]: new_status })
            .eq([person], id)
            .select()


    }

    async updateOnlineStatus(id, new_status) {
        const { data, error } = await this.client
            .from('Users')
            .update({ OnlineStatus: new_status })
            .eq('UserID', id)
            .select()
    }

    async getFriendsByID(person_id) {
        let { data, error } = await this.client
            .rpc('bothuserfriends', {
                person_id
            })
        if (error) console.error(error)
        // else console.log(data)
        return data;
    }

    async getFriendsWithPersonAllData(person_value) {
        let { data, error } = await this.client
            .rpc('getfriendswithpersonall', {
                person_value
            })
        return data;
        // if (error) console.error(error)
        // else console.log(data)
    }

    async getUserOnlineStatus(user_id) {
        const { data, error } = await this.client
            .from('Users')
            .select('OnlineStatus')
            .eq('UserID', user_id);
        return data
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

        return data
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

    async getFriendUsername(user_id) {
        const { data, error } = await this.client
            .from('Users')
            .select('Username')
            .eq('UserID', user_id);
        return data
    }

    async getFriendID(username) {
        const { data, error } = await this.client
            .from('Users')
            .select('UserID')
            .eq('Username', username);
        return data
    }
    async getUserNamesFromIDList(ids) {
        let { data, error } = await this.client
            .rpc('get_usernames_by_ids', {
                ids
            })
        if (error) console.error(error)
        else console.log(data)

        return data;
    }


    async getFriendStatus(user_id) {
        const { data, error } = await this.client
            .from('Users')
            .select('Status')
            .eq('UserID', user_id);
        return data
    }

    async getRequestsSent(user_id) {
        const { data, error } = await this.client
            .from('Users')
            .select('RequestsSent')
            .eq('UserID', user_id);
        return data
    }

    async getRequestsReceived(user_id) {
        const { data, error } = await this.client
            .from('Users')
            .select('RequestsReceived')
            .eq('UserID', user_id);
        return data
    }

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
            }
            else {
                falseCount += 1;
            }
        })

        if ((falseCount + trueCount) === 0) {
            return 0;
        }
        else {
            return ((trueCount / (falseCount + trueCount)) * 100);
        }

    }


    async sendAndReceiveFriendRequest(fromID, toID) {
        try {
            const resultSend = await this.sendFriendRequest(fromID, toID);
            const resultReceive = await this.receiveFriendRequest(fromID, toID);
            
        }
        catch (error) {
            console.log(error)
        }

    }

    async acceptFriendRequest(fromID, toID) {
        const resultRemoveReceive = await this.removeFriendRequestReceived(fromID, toID);
        const resultRemoveSend = await this.removeFriendRequestSent(fromID, toID);
        const fromUsername = await this.getFriendUsername(fromID);
        const toUsername = await this.getFriendUsername(toID);
        const fromPercentage = await this.getPercentage(fromID);
        const toPercentage = await this.getPercentage(toID);
        console.log(toPercentage, fromPercentage);
        // console.log(toUsername, fromUsername);
        const fromStatus = await this.getFriendStatus(fromID);
        const toStatus = await this.getFriendStatus(toID);
        const addedFriend = await this.addFriend(fromID, toID,
            fromUsername[0].Username, toUsername[0].Username,
            fromStatus[0].Status, toStatus[0].Status,
            fromPercentage, toPercentage);

    }

    async declineFriendRequest(fromID, toID) {
        const resultRemoveReceive = await this.removeFriendRequestReceived(fromID, toID);
        const resultRemoveSend = await this.removeFriendRequestSent(fromID, toID);
    }


}

module.exports = Friends;