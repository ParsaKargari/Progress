const express = require('express');
const router = express.Router();
const Friends = require('../../Controllers/ApplicationAPIs/Friends');
const Activity = require('../../Controllers/ApplicationAPIs/Activity');
const add = require('nodemon/lib/rules/add');
const friends = new Friends();
const activity = new Activity();


// router.use((req,res,next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// get list of tasks from your friends list to then get your own list of actitivities to display
router.get('/getFriendsActivity', async (req, res) => {
    try{
    user_id= req.query.user_id;
    // console.log(user_id);
    ids = await activity.getListOfFriendsFromMyID(user_id);
    // console.log(ids);
    const data = await activity.getListOfTasksFromIDList(ids);
    // console.log("ALL ACTIVITIES OF FRIENDS ARE:")
   
    console.log(data);
    
    res.json(data);
}
    catch(error){
        res.status(500).json({ error: error});
    }
});

// post a comment on a task given task_id, user_id and comment IN A BODY!!
router.post('/postComment', async (req, res) => {
    try{
    const {task_id, user_id, comment} = req.body;
    console.log("Inside addComment");
    console.log(req.body);
    console.log(task_id, user_id, comment);
    
    const result = await activity.PostComment(task_id, user_id, comment);
    console.log(result);
    res.send("Comment Added");
}
    catch(error){
        res.status(500).json({ error: error});
    }

});

// get all comments on all tasks of your friends' visible tasks
router.get('/getAllComments', async (req, res) => {
    user_id= req.query.user_id;
    ids = await activity.getListOfFriendsFromMyID(user_id);
    console.log("ids are:")
    console.log(ids);
    const data = await activity.getListOfTasksFromIDList(ids);
    console.log("task ids are:")
    console.log(data);
    // get tasks which you are able to view from the lists of tasks made public by your friends
    searchableTaskIDs= [];
    for(task in data){
        searchableTaskIDs.push(data[task].id);
    };
    console.log(searchableTaskIDs);
    if(searchableTaskIDs && searchableTaskIDs.length>=0){
    const result = await activity.ViewAllComments(searchableTaskIDs);
    console.log("results are:");
    console.log(result.data);
    res.json(result.data);}
    else{
        res.send("No comments to show");
    }

});


// REACTIONS TIME BABYYY

router.get('/getAllReactions', async (req, res) => {
    user_id= req.query.user_id;
    ids = await activity.getListOfFriendsFromMyID(user_id);
    console.log("ids are:")
    console.log(ids);
    const data = await activity.getListOfTasksFromIDList(ids);
    console.log("task ids are:")
    console.log(data);
    // get tasks which you are able to view from the lists of tasks made public by your friends
    searchableTaskIDs= [];
    for(task in data){
        searchableTaskIDs.push(data[task].id);
    };
    console.log(searchableTaskIDs);
    const AllReactions = await activity.GetAllReactionsGivenTaskIDList(searchableTaskIDs);

    console.log("All reactions are:");
    console.log(AllReactions.data);

    res.json(AllReactions.data);


});

router.get('/postReaction', async (req, res) => {
    try{
    const {task_id, user_id, reaction} = req.body;
    console.log("Inside addReaction");
    console.log(req.body);
    console.log(task_id, user_id, reaction);
    
    const result = await activity.PostReaction(task_id, user_id, reaction);
    console.log(result);
    res.send(result);
}
    catch(error){
        res.status(500).json({ error: error});
    }




});








router.get('/getListOfUserIDAndUserName', async (req, res) => {

        let { data, error } = await supabase
        .rpc('get_usernames_as_json', {
            user_ids
        })
        if (error) console.error(error)
        else console.log(data)


});







module.exports = router;



// router.post('/addComment', async (req, res) => {
//     try{
//     const {task_id, user_id, comment} = req.body;
//     console.log("Inside addComment");
//     console.log(req.body);
//     console.log(task_id, user_id, comment);
    
//     const result = await friends.addComment(task_id, user_id, comment);
//     res.json(result);
// }
//     catch(error){
//         res.status(500).json({ error: error});
//     }
// });