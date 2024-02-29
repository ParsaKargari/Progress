import { React, useState, useLayoutEffect, useRef, useEffect  } from 'react';
import Checkbox from '@mui/material/Checkbox';
import "../css/DatePicker.css";


export function TaskComponent (props) {

    const { taskDescription, dueDate, status, visibilityDB, plannedDate } = props;
    // console.log(taskDescription);
    // console.log(dueDate);
    // console.log(status);
    // console.log(visibilityDB);

    const [date, setDate] = useState(props.dueDate);
    const [planneddate, setPlanneddate] = useState(props.plannedDate);
    const [visibility, setVisibility] = useState(props.visibilityDB);
    const [editing, SetEditing] = useState(false);

    const [checked, setChecked] = useState(props.status);
    
    // useEffect(() => {
    //     if (checked === true){
    //         var task = document.getElementById(`TaskDescr-${taskDescription}`);
    //         task.classList.add("line-through");
    //     }
    // }, [props.status]);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if(event.target.checked === true){
            var task = document.getElementById(`TaskDescr-${taskDescription}`);
            task.classList.add("line-through");
        }
        else{
            var task = document.getElementById(`TaskDescr-${taskDescription}`);
            task.classList.remove("line-through");
        }
    };

    const handleEditClick =() => {
        SetEditing(!editing);
    }


    function formatDate(formatDate) {
        const date = new Date(formatDate);
        
        // const options = { weekday: 'long', day: 'numeric' };
        // const formattedDate = date.toLocaleDateString('en-US', options);

        // only day
        date.setDate(date.getDate() + 1);
        const formattedDate = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
        
        return formattedDate;
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
                        color: '#00789E', // Change color to your desired hex color
                        borderRadius: '4px', // Add border radius for rounded corners
                    }}
                />
                </div>

                <div className="flex flex-col">
                    <div className="font-standard text-DarkGrey flex flex-row items-center flex-wrap">
                        <h1 
                            id={`TaskDescr-${taskDescription}`}
                            className="font-standard text-DarkGrey decoration-DarkGrey decoration-2 truncate font-bold	text-base transition duration-500"
                        >

                            {props.taskDescription}

                        </h1>

                        
                        <button 
                        onClick={() => {setVisibility(!visibility)}}
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

                        {
                            editing ? 
                            <>
                                <h5
                                className=" text-textcolour font-standard text-base decoration-2 truncate"
                                >
                                    Planned for :
                                </h5>
                                
                                <input type="date" value={planneddate} onChange={e => {setPlanneddate(e.target.value)}} class="dateInput ml-2 block focus:border-0 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 md:text-sm md:leading-6"></input>
                            </>
                            :
                            <h5 
                            id="formattedDate"
                            className=" text-textcolour font-standard text-base decoration-2 truncate"
                            >
                                Planned for {formatDate(planneddate)}
                            </h5>
                        }

                        {
                            editing ? 
                            <>
                                <h5 
                                className="ml-2 text-textcolour font-standard text-base decoration-2 truncate"
                                >
                                    Due : 
                                </h5>

                                <input type="date" value={date} onChange={e => {setDate(e.target.value)}} className="dateInput" class="dateInput ml-2 block focus:border-0 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 md:text-sm md:leading-6"></input>
                            </>
                            
                            
                            :
                            <h5 
                            className=" ml-2 text-textcolour font-standard text-base decoration-2 truncate"
                            >   
                                Due {formatDate(date)}
                            </h5>
                        }

                        {
                            editing ?
                            <>
                                <h5 
                                    className=" ml-2 text-textcolour font-standard text-base decoration-2 truncate"
                                    onClick={handleEditClick}
                                >
                                    Save
                                </h5>
                            </>
                            :
                            <>
                                <h5 
                                    className=" ml-2 text-textcolour font-standard text-base decoration-2 truncate"
                                    onClick={handleEditClick}
                                >
                                    Edit
                                </h5>
                            </>
                        }

                        
                        <h5 
                            className=" ml-2 text-textcolour font-standard text-base decoration-2 truncate"
                        >
                            Delete
                        </h5>

                    </div>

                    
                </div>
            </div>
        </>
    )
}