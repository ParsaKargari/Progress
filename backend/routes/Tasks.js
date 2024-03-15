


const SupabaseConnector = require('../SupabaseConnector.js');
supabase = new SupabaseConnector();
client = supabase.getClient();

var express = require('express');
var router = express.Router();
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


router.get("/:id/:taskName", async function(req, res, next) {
    let today_date = new Date();
        var time_added = "" + today_date.getFullYear() + "-"
            + (today_date.getMonth() + 1) + "-"
            + today_date.getDate();
    await createTask(req.params.id, req.params.taskName, time_added, time_added, false);
    var tasks = await getTaskById(req.params.id);
    res.send(tasks);

});

module.exports = router;

async function createTask(userID, taskDescription, addedDate, dueDate, publicVisibility) {
    try {
        const result = await this.client
            .from('Tasks')
            .insert([{ UserID: userID, TaskDescription: taskDescription, AddedDate: addedDate, DueDate: dueDate, PublicVisibility: publicVisibility }])
            .select();
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

async function getTaskById(userID) {
            try {
                const result = await this.client
                    .from('Tasks')
                    .select('*')
                    .eq('UserID', userID);
                return result;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }


//  TO BE TESTED
// class Tasks {
//     constructor() {
//         this.supabase = new SupabaseConnector();
//         this.client = this.supabase.getClient();
//     }

//     static async createTask(userID, taskDescription, addedDate, dueDate, publicVisibility) {
//         try {
//             const result = await this.client
//                 .from('Tasks')
//                 .insert([{ UserID: userID, TaskDescription: taskDescription, AddedDate: addedDate, DueDate: dueDate, PublicVisibility: publicVisibility }])
//                 .select();
//             return result;
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }

//     async getTasks() {
//         try {
//             const result = await this.client
//                 .from('Tasks')
//                 .select('*');
//             return result;
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }

//     async getTaskById(taskId) {
//         try {
//             const result = await this.client
//                 .from('Tasks')
//                 .select('*')
//                 .eq('TaskID', taskId)
//                 .single();
//             return result;
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }
//     // async updateTaskById(taskId, columnName, newData) {
//     //     try {
//     //         const updateObject = {};
//     //         updateObject[columnName] = newData;

//     //         const result = await this.client
//     //             .from('Tasks')
//     //             .update(updateObject)
//     //             .eq('TaskID', taskId)
//     //             .single();

//     //         return result;
//     //     } catch (error) {
//     //         console.error(error);
//     //         throw error;
//     //     }
//     // }

//     async updateTaskById(taskId, columnName, newData) {
//         try {
//             const result = await this.client
//                 .from('Tasks')
//                 .update({ [columnName]: newData })
//                 .eq('TaskID', taskId)
//                 .select()
//             return result;
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }

//     async addComment(task_id, username, new_comment) {
//         try {
//             let { data, error } = await this.client
//                 .rpc('append_to_comments', {
//                     new_comment,
//                     task_id,
//                     username
//                 })
//             if (error) console.error(error)
//             else console.log(data)
//             return data;
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }

//     async addReaction(task_id, new_reaction, username) {
//         try {
//             let { data, error } = await this.client
//                 .rpc('add_to_reactions', {
//                     new_reaction,
//                     task_id,
//                     username
//                 })
//             if (error) console.error(error)
//             else console.log(data)
//             return data;
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }



//     async getHeatMapData(userID, startDate, endDate) {
//         try {
//             const tasks = await this.client
//                 .from('Tasks')
//                 .select('AddedDate')
//                 .eq('UserID', userID)
//                 .gte('DueDate', startDate)
//                 .lte('DueDate', endDate);
//             console.log(tasks.data)
//             let map = {};
//             tasks.data.forEach(task => {
//                 const key = task.AddedDate;
//                 if (!map[key]) {
//                     map[key] = 1;
//                 } else {
//                     map[key]++;
//                 }
//             });
//             // console.log(map);
//             return map;

//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }

// }

// module.exports = Tasks;