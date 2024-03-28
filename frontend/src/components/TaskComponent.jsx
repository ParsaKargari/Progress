import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import "../css/DatePicker.css";
import { useTasks } from '../context/TasksContext';
import { useAuth } from '../context/AuthContext';
import axios from "axios";

/**
 * Component to display a single task with options to edit, delete, and mark as completed.
 * @param {Object} props - Props containing task details.
 * @returns {JSX.Element} TaskComponent.
 */
export function TaskComponent(props) {
    const { uuid, taskDescription, dueDate, status, visibilityDB, plannedDate } = props;

    // Initialize state variables
    const [date, setDate] = useState(dueDate || ''); // Ensure date is not null
    const [planneddate, setPlanneddate] = useState(plannedDate);
    const [editing, setEditing] = useState(false);
    const [checked, setChecked] = useState(status);
    const [visibility, setVisibility] = useState(visibilityDB); 
    const { fetchTasks, triggerHeatmapRefresh } = useTasks();
    const { user } = useAuth();

    /**
     * Function to handle the change in checkbox status.
     * @param {Object} event - The event object.
     */
    const handleChange = async (event) => {
        const newCheckedStatus = event.target.checked;
        setChecked(newCheckedStatus); // Optimistically update the UI
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/tasks/updateCompletionStatus/${uuid}/${newCheckedStatus}`, { CompletionStatus: newCheckedStatus });
            if (!response.ok) {
                throw new Error('Failed to update completion status');
            }
            
            await axios.get(`${process.env.REACT_APP_API_URL}/tasks/updatePercentage/${user.id}`);
            fetchTasks(user.id);
            triggerHeatmapRefresh();
        } catch (error) {
            console.error(error);
            setChecked(!newCheckedStatus); // Revert the checkbox state if the update fails
        }
    };
    
    /**
     * Function to handle the change in visibility.
     * @param {boolean} newVisibility - The new visibility status.
     */
    const setVisibilityHandler = async (newVisibility) => { 
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/tasks/updateVisibility/${uuid}/${newVisibility}`);
            if (response.ok) {
                setVisibility(newVisibility); // Update visibility 
            } else {
                throw new Error('Failed to update visibility');
            }

            fetchTasks(user.id); // Fetch tasks again to update the UI
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Function to handle task deletion.
     */
    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/deleteTask/${uuid}`);
        } catch (error) {
            console.error(error);
        }
        fetchTasks(user.id);
        triggerHeatmapRefresh();
    };

    /**
     * Function to handle edit click.
     */
    const handleEditClick = async () => {
        if (editing) {
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/tasks/addDueDate/${uuid}/${date}`);
                fetchTasks(user.id); // Fetch tasks again to update the UI
            } catch (error) {
                console.error(error);
            }
        }
        setEditing(!editing);
    };

    /**
     * Function to format date.
     * @param {string} dateString - The date string.
     * @returns {string} Formatted date.
     */
    function formatDate(dateString) {
        if (!dateString) {
            return '--No Date Set--'; // Random placeholder instead of null can be changed
        }

        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return 'Invalid Date'; 
            }
            date.setDate(date.getDate() + 1);
            const formattedDate = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
            return formattedDate;
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Error';
        }
    }

    return (
        <div className="mb-2 flex flex-row">
            <div className="pr-2">
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    style={{
                        color: '#00789E',
                        borderRadius: '4px',
                    }}
                />
            </div>
            <div className="flex flex-col">
                <div className="font-standard text-DarkGrey flex flex-row items-center flex-wrap">
                    <h1
                        id={`${uuid}`}
                        className={`font-standard text-DarkGrey decoration-DarkGrey truncate font-bold text-base transition duration-500 ${checked ? 'line-through' : ''}`}
                    >
                        {taskDescription}
                    </h1>

                    <button
                        onClick={() => { setVisibilityHandler(!visibility) }}
                        className=" btn btn-circle bg-transparent rounded-full flex justify-center items-center ml-2 transition-opacity duration-500"
                    >
                        {visibility ? (
                            <img src="/images/eye.svg" alt="add task sign" />
                        ) : (
                            <img src="/images/closeEye.svg" alt="add task sign" />
                        )}
                    </button>
                </div>
                <div className="font-standard text-DarkGrey flex flex-row items-center flex-wrap">
                    {editing ? (
                        <>
                            <h5 className=" text-textcolour font-standard text-base decoration-2 truncate">
                                Planned for :
                            </h5>
                            <input type="date" value={planneddate} onChange={e => { setPlanneddate(e.target.value) }} className="dateInput ml-2 block focus:border-0 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 md:text-sm md:leading-6"></input>
                        </>
                    ) : (
                        <h5 id="formattedDate" className=" text-textcolour font-standard text-base decoration-2 truncate">
                            Planned for {formatDate(planneddate)}
                        </h5>
                    )}
                    {editing ? (
                        <>
                            <h5 className="ml-2 text-textcolour font-standard text-base decoration-2 truncate">
                                Due :
                            </h5>
                            <input type="date" value={date} onChange={e => { setDate(e.target.value) }} className="dateInput" class="dateInput ml-2 block focus:border-0 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 md:text-sm md:leading-6"></input>
                        </>
                    ) : (
                        <h5 className=" ml-2 text-textcolour font-standard text-base decoration-2 truncate">
                            Due {formatDate(date)}
                        </h5>
                    )}
                    {editing ? (
                        <h5 className=" ml-2 text-textcolour cursor-pointer font-standard text-base decoration-2 truncate" onClick={handleEditClick}>
                            Save
                        </h5>
                    ) : (
                        <h5 className=" ml-2 text-textcolour cursor-pointer font-standard text-base decoration-2 truncate" onClick={handleEditClick}>
                            Edit
                        </h5>
                    )}
                    <h5 className=" ml-2
                        text-textcolour cursor-pointer font-standard text-base decoration-2 truncate" onClick={handleDelete}>
                        Delete
                    </h5>
            </div>
        </div>
    </div>
);
}
