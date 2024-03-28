const SupabaseConnector = require('../SupabaseConnector.js');
var express = require('express');
var router = express.Router();
var allowedOrigins = ['http://localhost:3000', 'https://progresslive.vercel.app'];

// Middleware to set CORS headers
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

// Route to add username, status, and email for a user
router.get("/:id/:username/:status/:email", function(req, res, next) {
    addUsername(req.params.username, req.params.id);
    addStatus(req.params.status, req.params.id);
    addEmail(req.params.email, req.params.id);
    res.send("success")
});

var supabase = new SupabaseConnector();
var client = supabase.getClient();

// Route to get username for a user
router.get("/:id", async function(req, res, next) {
    const username = await getUsername(req.params.id);
    res.send(username);
});

module.exports = router;

// Function to get username for a user
async function getUsername(user_id) {
    const { data, error } = await client
        .from('Users')
        .select('Username')
        .eq('UserID', user_id);
    return data
}

// Function to add username for a user
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

// Function to add status for a user
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

// Function to add email for a user
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