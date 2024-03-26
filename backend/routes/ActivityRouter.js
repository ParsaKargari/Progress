const express = require('express');
const router = express.Router();
const Friends = require('../../Controllers/ApplicationAPIs/Friends');
const friends = new Friends();


router.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


router.get('/getFriendsActivity', async (req, res) => {
    user_id= req.query.user_id;
    local_data=null;
    try{
        await getFriendsByID(user_id).then((data) => {
            local_data = data;
        });


    }
    catch{
        res.status(500).json({error: 'Problem while fetching friends by user_id'});
    }


    // After getting lsit of all friends we are going to fetch each of those friends' tasks that have been completed.

    // for (x in local_data){
    //     await getFriendsActivity(x);}

});
