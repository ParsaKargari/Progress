import React, { createContext, useContext, useState, useCallback } from 'react';

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = useCallback(async (userId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/Tasks/getTasks/${userId}`);
            const json = await response.json();
            const tasks = json.data || [];
            setTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }, []);

    return (
        <TasksContext.Provider value={{ tasks, setTasks, fetchTasks }}>
            {children}
        </TasksContext.Provider>
    );
};
