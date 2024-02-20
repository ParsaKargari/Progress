import { React, useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';


export function TaskComponent (props) {


    const [checked, setChecked] = useState(false);
    const [visibility, setVisibility] = useState(false);
    
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    

    return (
        <>
            <div className="bg-red-300 mb-2 flex flex-row">
                
                <div className="pr-2">
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                </div>

                <div className="flex flex-col ">
                    <div>
                        <h1>Task 1</h1>
                    </div>

                    <div>
                        <p>Due Edit Delete</p>
                    </div>
                </div>
            </div>
        </>
    )
}