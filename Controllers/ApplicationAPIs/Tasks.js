const SupabaseConnector = require('../APIGateway/Supabase.js');

const addTask = (task) => {
    const supabase = SupabaseConnector.getInstance();
    let client = supabase.getClient();
    return client.from('Tasks').insert([
        {},
    ]).select();
}