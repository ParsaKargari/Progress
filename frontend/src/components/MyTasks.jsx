import React, { useState, useEffect } from 'react';
import { TaskComponent } from './TaskComponent';
import { useAuth } from '../context/AuthContext';

export function MyTasks() {
    const [taskList, setTaskList] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`http://localhost:9000/Tasks/getTasks/${user.id}`);
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
                    key={task.TaskID}
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
