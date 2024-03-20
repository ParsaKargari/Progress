const SupabaseConnector = require('../SupabaseConnector.js');
var express = require('express');
var router = express.Router();
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

router.get("/:id/:username/:status/:email", function(req, res, next) {
    addUsername(req.params.username,req.params.id);
    addStatus(req.params.status,req.params.id);
    addEmail(req.params.email,req.params.id);
    res.send("success")
});

var supabase = new SupabaseConnector();
var client = supabase.getClient();
router.get("/:id", async function(req, res, next) {
    const username =  await getUsername(req.params.id);
    res.send(username);
});



module.exports = router;

async function getUsername(user_id) {

    const { data, error } = await client
        .from('Users')
        .select('Username')
        .eq('UserID', user_id);
    return data
}

async function addUsername(userName, user_id) {
    try {
        const result = await client
            .from('Users')
            .update([{ Username: userName }])
            .eq('UserID', user_id);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function addStatus(status, user_id) {
    try {
        const result = await client
            .from('Users')
            .update([{ Status: status }])
            .eq('UserID', user_id);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function addEmail(email, user_id) {
    try {
        const result = await client
            .from('Users')
            .update([{ UserEmail: email }])
            .eq('UserID', user_id);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

