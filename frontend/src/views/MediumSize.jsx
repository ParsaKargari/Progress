import {React, useState, useEffect, Fragment} from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

/**Importing Components */
import { ActivityBar } from './ActivityBar.jsx'
import { TasksBar } from './TasksBar.jsx'
import { FriendsBar } from './FriendsBar.jsx'

export function MediumSize() {
    const [state, setState] = useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const activitytrigger = (anchor) => (
        <Box
        sx={{ width: '75vw' }}
        role="presentation"
        >
            
            <ActivityBar />
        
        </Box>
    );



    return (
        <>

            <div className="grid grid-cols-12 flex-cols h-screen bg-primary max-h-screen overflow-clip">
                <FriendsBar />
                
                <TasksBar />

                <div className="col-span-1 bg-primary flex flex-cols flex-1 justify-end items-center align-middle" id='activityTrigger'>

                    {['right'].map((anchor) => (
                        <Fragment key={anchor}>

                            <div onClick={toggleDrawer(anchor, true)} className="flex flex-cols m-3 mr-5 btn btn-circle bg-InputBox w-12 h-12 rounded-full" id="drawers">
                                
                                <button
                                    className="btn btn-circle bg-AddTaskBg min-w-12 min-h-12 rounded-full flex justify-center items-center"
                                >
                                    <img src="/images/MenuSwipe.svg" alt="add task sign" className="rotate-180"/>
                                </button>
                                                          
                            </div>
                            
                        </Fragment>
                    ))}
                    
                    {['right'].map((anchor) => (
                        <Fragment key={anchor}>
                            <Drawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                            >

                                {activitytrigger(anchor)}

                            </Drawer>
                        </Fragment>
                    ))} 

                </div>
            </div>
        </>
    )
}