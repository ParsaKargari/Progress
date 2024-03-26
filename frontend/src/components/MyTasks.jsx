import React, { useState, useEffect } from 'react';
import { TaskComponent } from './TaskComponent';
import { useAuth } from '../context/AuthContext';

export function MyTasks() {
    const [taskList, setTaskList] = useState([]);
    const { user } = useAuth();
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


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`http://localhost:9000/Tasks/getTasks/${user.id}`);
                // const response = await fetch(`http://localhost:9000/Tasks/getTasks/some-user-id`);
                const json = await response.json();
                const tasks = json.data || []; 
                setTaskList(tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    

    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar">
            {taskList.map(task => (
                <TaskComponent
                    uuid={task.TaskID}
                    taskDescription={task.TaskDescription}
                    status={task.CompletionStatus}
                    visibilityDB={task.PublicVisibility}
                    dueDate={task.DueDate}
                    plannedDate={task.AddedDate}
                />
            ))}
        </div>
    );
}
