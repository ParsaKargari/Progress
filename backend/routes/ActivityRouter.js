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
    try{
    user_id= req.query.user_id;
    console.log(user_id);
    ids = await friends.getListOfFriendsFromMyID(user_id);
    console.log(ids);
    const data = await friends.getListOfTasksFromIDList(ids);
    console.log("ALL ACTIVITIES OF FRIENDS ARE:")
   
    console.log(data);
    
    res.json(data);
}
    catch(error){
        res.status(500).json({ error: error});
    }
});

module.exports = router;
