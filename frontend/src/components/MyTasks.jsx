import React, { useState, useEffect } from 'react';
import { TaskComponent } from './TaskComponent';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TasksContext';

export function MyTasks() {
    const { tasks } = useTasks();
    const { user } = useAuth();

    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar">
            {tasks.map(task => (
                <TaskComponent
                    key={task.TaskID}
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
