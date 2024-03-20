import { React, useState, useEffect } from 'react';

import { TaskComponent } from './TaskComponent';

export function MyTasks () {
    const[taskList, setTaskList] = useState([]);

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

    const test = {
        "task1": {
            "uuid": "randomKey1",
            "taskDescription": "Clean Apartment",
            "status": true,
            "visibilityDB": true,
            "dueDate": "2026-06-04",
            "plannedDate": "2024-02-04"
        },
        "task2": {
            "uuid": "randomKey2",
            "taskDescription": "Complete ENSF401 Research Assignment",
            "status": false,
            "visibilityDB": true,
            "dueDate": "2024-02-13",
            "plannedDate": "2024-02-04"
        },
        "task3": {
            "uuid": "randomKey3",
            "taskDescription": "Laundry",
            "status": false,
            "visibilityDB": false,
            "dueDate": "2024-02-04",
            "plannedDate": "2024-02-04"
        }
    }

    useEffect(() => {
        setTaskList(test)
    }, []);

    return (
        <>
            <div className="flex-1 overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar">

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