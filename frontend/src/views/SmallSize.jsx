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
        onClick={toggleActDrawer(anchor, false)}
        onKeyDown={toggleActDrawer(anchor, false)}
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
        onClick={toggleFriDrawer(anchor, false)}
        onKeyDown={toggleFriDrawer(anchor, false)}
        >
            
            <FriendsBar />
        
        </Box>
    );

    return (
        <>
            <div className="grid grid-cols-12 flex-cols h-screen bg-primary max-h-screen overflow-clip">
                <div className="col-span-1 bg-green-900 flex" id='taskButton'>
                {['left'].map((anchor) => (
                        <Fragment key={anchor}>

                            <Button onClick={toggleFriDrawer(anchor, true)} className="m-3 btn btn-circle bg-InputBox w-12 h-12 rounded-full">
                                
                                <p>Friends</p>
                                                            
                            </Button>
                            
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

                <div className="col-span-1 bg-green-900 flex" id='activityButton'>
                    {['right'].map((anchor) => (
                            <Fragment key={anchor}>

                                <Button onClick={toggleActDrawer(anchor, true)} className="m-3 btn btn-circle bg-InputBox w-12 h-12 rounded-full">
                                    
                                    <p>Activity</p>
                                                                
                                </Button>
                                
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