const SupabaseConnector = require('../APIGateway/Supabase.js');

const addFriend = (friend1, friend2) => {
    const supabase = SupabaseConnector.getInstance();
    let client = supabase.getClient();
    return client.from('Friends').insert([
        { Person1: friend1, Person2: friend2, DateBegan: new Date() },
    ]).select();
}

// addFriend('dfg', 'fgjhjud')
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.error(error);
//     });