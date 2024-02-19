const Friends = require('../ApplicationAPIs/Friends.js');

const friends = new Friends();
friends.addFriend('a', 'b')
    .then(result => {
        console.log('Friend added:', result);
    })
    .catch(error => {
        console.error('Error adding friend:', error);
    });

friends.getFriends()
    .then(result => {
        console.log('All friends:', result);
    })
    .catch(error => {
        console.error('Error getting friends:', error);
    });