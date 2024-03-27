const SupabaseConnector = require('../SupabaseConnector.js');
var express = require('express');
var router = express.Router();
var cors = require('cors');
var cookieParser = require('cookie-parser');
const Friends = require('../Controllers/ApplicationAPIs/Friends');
const friends = new Friends();


var allowedOrigins = ['http://localhost:3000', 'https://progresslive.vercel.app'];

router.use((req, res, next) => {
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
  next();
});


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
    const { username, status, color } = req.body;
    console.log("user_id is, ", username);
    console.log("color is, ", color);
    console.log("status is, ", status);
    try {

        friends.updateFriendStatus(user_id, 'Person1Status', status, 'Person1');
        friends.updateFriendStatus(user_id, 'Person2Status', status, 'Person2');

        friends.updateFriendStatus(user_id, 'Person1Username', username, 'Person1');
        friends.updateFriendStatus(user_id, 'Person2Username', username, 'Person2');


        

        const result = await client
            .from('Users')
            .update([{ Username:username, color: color, Status: status }])
            .eq('UserID', user_id);
            console.log("result is, ", result);
    
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error});
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