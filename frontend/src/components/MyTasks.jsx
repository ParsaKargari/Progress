import React, { useState, useEffect } from 'react';
import { TaskComponent } from './TaskComponent';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TasksContext';

export function MyTasks() {
    const { tasks } = useTasks();
    const { user } = useAuth();

    // Sort tasks based on TaskID
    const sortedTasks = tasks.sort((a, b) => a.TaskID.localeCompare(b.TaskID));

    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar">
            {sortedTasks.map(task => (
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
