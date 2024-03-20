import { React, useState, useEffect } from 'react';

import { TaskComponent } from './TaskComponent';

export function MyTasks (props) {
    const { tasksList } = props;

    const[taskList, setTaskList] = useState(tasksList || []);

    const Addtask = (taskDescription, dueDate, status, visibilityDB, plannedDate, uuid) => {
        const newKey = "task" + (Object.keys(taskList).length + 1);
        
        const newTask = {
            "key": "randomKey" + (Object.keys(taskList).length + 1), // Generating a random key
            "taskDescription": taskDescription,
            "status": status,
            "visibilityDB": visibilityDB,
            "dueDate": dueDate,
            "plannedDate": plannedDate
        };

        const temp = [...taskList, newTask];
        setTaskList(temp)
    }

    return (
        <>
            <div className="flex-1 overflow-y-auto overflow-x-hidden h-full max-h-screen no-scrollbar">

                {
                    Object.keys(taskList).map(taskKey => (
                        <TaskComponent
                            uuid = {taskKey}
                            taskDescription = {taskList[taskKey].taskDescription}
                            status = {taskList[taskKey].status}
                            visibilityDB =  {taskList[taskKey].visibilityDB}
                            dueDate = {taskList[taskKey].dueDate}
                            plannedDate = {taskList[taskKey].plannedDate}
                        />
                    ))
                }

            </div>
        </>
    )
}