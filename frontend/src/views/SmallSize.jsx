import {React, useState, useEffect, Fragment} from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

/**Importing Components */
import { ActivityBar } from './ActivityBar.jsx'
import { TasksBar } from './TasksBar.jsx'
import { FriendsBar } from './FriendsBar.jsx'

export function SmallSize() {
    // ACTIVITY DRAWER ---------------------------------------------------------
    const [actState, setActState] = useState({
        right: false,
    });

    const toggleActDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setActState({ ...actState, [anchor]: open });
    };

    const activitytrigger = (anchor) => (
        <Box
        sx={{ width: '85vw' }}
        role="presentation"
        >
            
            <ActivityBar />
        
        </Box>
    );

    // FRIENDS DRAWER ---------------------------------------------------------
    const [friState, setFriState] = useState({
        left: false,
    });

    const toggleFriDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setFriState({ ...friState, [anchor]: open });
    };

    
    const friendstrigger = (anchor) => (
        <Box
        sx={{ width: '85vw' }}
        role="presentation"
        >
            
            <FriendsBar />
        
        </Box>
    );

    return (
        <>
            <div className="grid grid-cols-12 flex-cols h-screen bg-primary max-h-screen overflow-clip">
                <div className="col-span-1 bg-primary flex items-center" id='taskButton'>
                {['left'].map((anchor) => (
                        <Fragment key={anchor}>

                            <div onClick={toggleFriDrawer(anchor, true)} className="m-1 btn btn-circle bg-InputBox w-12 h-12 rounded-full">
                                
                                {/* <p>Friends</p> */}
                                <button
                                    className="btn btn-circle bg-AddTaskBg w-8 h-8 rounded-full flex justify-center items-center"
                                >
                                    <img src="/images/MenuSwipe.svg" alt="add task sign" className="scale-75"/>
                                </button>
                                                            
                            </div>
                            
                        </Fragment>
                    ))}
                    
                    {['left'].map((anchor) => (
                        <Fragment key={anchor}>
                            <Drawer
                                anchor={anchor}
                                open={friState[anchor]}
                                onClose={toggleFriDrawer(anchor, false)}
                            >

                                {friendstrigger(anchor)}

                            </Drawer>
                        </Fragment>
                    ))} 
                </div>

                <TasksBar />

                <div className="col-span-1 bg-primary flex items-center" id='activityButton'>
                    {['right'].map((anchor) => (
                            <Fragment key={anchor}>

                                <div onClick={toggleActDrawer(anchor, true)} className="m-1 btn btn-circle bg-InputBox w-12 h-12 rounded-full">
                                    
                                    {/* <p>Activity</p> */}
                                <button
                                    className="btn btn-circle bg-AddTaskBg w-8 h-8 rounded-full flex justify-center items-center"
                                >
                                    <img src="/images/MenuSwipe.svg" alt="add task sign" className="rotate-180 scale-75"/>
                                </button>

                                                                
                                </div>
                                
                            </Fragment>
                        ))}
                        
                        {['right'].map((anchor) => (
                            <Fragment key={anchor}>
                                <Drawer
                                    anchor={anchor}
                                    open={actState[anchor]}
                                    onClose={toggleActDrawer(anchor, false)}
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