const SupabaseConnector = require('../SupabaseConnector.js');
var express = require('express');
var router = express.Router();
var cors = require('cors');
var cookieParser = require('cookie-parser');


router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization');
    next();
}
    );


router.get('/getSettings', async (req, res) => {
    var supabase = new SupabaseConnector();
    var client = supabase.getClient();
    var user_id = req.query.user_id;
    console.log("user_id is, ", user_id );
    const { data, error } = await client
        .from('Users')
        .select('Username, color, Status')
        .eq('UserID', user_id);

    console.log("data is, ", data);
    if (error) {
        res.status(500).json({ error: error });
    } else {
        console.log("getSettings data is, ", data);
        res.json(data);
    }
});

router.post('/updateSettings', async (req, res) => {
    var user_id = req.query.user_id;
    var supabase = new SupabaseConnector();
    var client = supabase.getClient();
    const { username, color, status } = req.body;
    console.log("user_id is, ", username);
    console.log("color is, ", color);
    console.log("status is, ", status);
    try {
        const result = await client
            .from('Users')
            .update([{ username:username, color: color, Status: status }])
            .eq('UserID', user_id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


async function getSelectedSettings(user_id) {
    const { data, error } = await client
        .from('Users')
        .select('Status', 'color')
        .eq('UserID', user_id);
    return data;
}
module.exports = router;