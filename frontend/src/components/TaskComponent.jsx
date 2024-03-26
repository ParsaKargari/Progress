import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import "../css/DatePicker.css";
import { useTasks } from '../context/TasksContext';
import { useAuth } from '../context/AuthContext';

export function TaskComponent(props) {
    const { uuid, taskDescription, dueDate, status, visibilityDB, plannedDate } = props;

    // Initialize the date state with the dueDate prop
    const [date, setDate] = useState(dueDate || ''); // Ensure date is not null
    const [planneddate, setPlanneddate] = useState(plannedDate);
    const [editing, setEditing] = useState(false);
    const [checked, setChecked] = useState(status);
    const [visibility, setVisibility] = useState(visibilityDB); 
    const { fetchTasks } = useTasks();
    const { user } = useAuth();
    

    const handleChange = async (event) => {
        const newCheckedStatus = event.target.checked;
        setChecked(newCheckedStatus); // Optimistically update the UI
    
        try {
            const response = await fetch(`http://localhost:9000/tasks/updateCompletionStatus/${uuid}/${newCheckedStatus}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ CompletionStatus: newCheckedStatus }), // Ensure you send the new status in the body if needed by your API
            });
            if (!response.ok) {
                throw new Error('Failed to update completion status');
            }
            fetchTasks(user.id); // Fetch tasks again to update the UI only if you need to synchronize other parts of the task not related to the checkbox
        } catch (error) {
            console.error(error);
            setChecked(!newCheckedStatus); // Revert the checkbox state if the update fails
        }
    };
    
    const setVisibilityHandler = async (newVisibility) => { 
        console.log(uuid)
        console.log(newVisibility)
        try {
            const response = await fetch(`http://localhost:9000/Tasks/updateVisibility/${uuid}/${newVisibility}`, {
                method: 'POST'

            });
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

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:9000/Tasks/deleteTask/${uuid}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error(error);
        }
        fetchTasks(user.id); // Fetch tasks again to update the UI
    };

    const handleEditClick = async () => {
        if (editing) {
            try {
                const response = await fetch(`http://localhost:9000/tasks/addDueDate/${uuid}/${date}`, {
                    method: 'POST'
                });
                if (response.ok) {
                } else {
                    throw new Error('Failed to save due date');
                }

                fetchTasks(user.id); // Fetch tasks again to update the UI
            } catch (error) {
                console.error(error);
            }
        }
        setEditing(!editing);
    };

    function formatDate(dateString) {
        if (!dateString) {
            // Random placeholder instead of null can be changed
            return '--No Date Set--'; 
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
        <>
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
                            <h5 className=" ml-2 text-textcolour font-standard text-base decoration-2 truncate" onClick={handleEditClick}>
                                Save
                            </h5>
                        ) : (
                            <h5 className=" ml-2 text-textcolour font-standard text-base decoration-2 truncate" onClick={handleEditClick}>
                                Edit
                            </h5>
                        )}
                        <h5 className=" ml-2 text-textcolour font-standard text-base decoration-2 truncate" onClick={handleDelete}>
                            Delete
                        </h5>
                    </div>
                </div>
            </div>
        </>
    )
}
