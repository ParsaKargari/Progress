import { React, useState, useEffect } from 'react';

import { TaskComponent } from './TaskComponent';

export function MyTasks () {
    const[taskList, setTaskList] = useState([]);

    const Addtask = () => {
        const newtask = generatetaskContents()
        const temp = [...taskList, newtask]
        setTaskList(temp)
    }

    const generatetaskContents = () => {
        let  now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        let date = now.toISOString().slice(0,16);
        const defaulttask = {
            title: "Untitled",
            date: date,
            content: ""
        }
        return defaulttask;
    }

    

    return (
        <>
            <div className="flex-1 overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar">
            {/* taskDescription, dueDate, status, visibilityDB */}
                < TaskComponent taskDescription="Clean Apartment" status={true} visibilityDB={true} dueDate={"2026-06-04"} plannedDate={"2024-02-04"}/>
                < TaskComponent taskDescription="Complete ENSF401 Research Assignment" status={false} visibilityDB={true} dueDate={"2024-02-13"} plannedDate={"2024-02-04"}/>
                < TaskComponent taskDescription="Laundry" status={false} visibilityDB={false} dueDate={"2024-02-04"} plannedDate={"2024-02-04"}/>


                {/* {
                    taskList.map((task, index) => {
                        return (
                            <>
                                <TaskComponent taskDescription="Clean Apartment" status={true} visibilityDB={true} dueDate={"2026-06-04"} plannedDate={"2024-02-04"} />
                            </>
                            
                        )
                    })
                } */}

            </div>
        </>
    )
}