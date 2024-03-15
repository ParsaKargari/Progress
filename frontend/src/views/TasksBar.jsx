import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { useAuth } from "../context/AuthContext";


import { ActivityBar } from './ActivityBar';
import { FriendsBar } from './FriendsBar';
import { MyTasks } from '../components/MyTasks';


function CustomTabPanel(props) {
    
    const { children, value, index, ...other } = props;
    
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{
                px: 2,  
                pt: 2, 
            }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {

    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };

}


export function TasksBar () {
    const { user } = useAuth();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [tasks, setTasks] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
      };    
    
    const handleAddTask = () => {
        const taskName = document.getElementById("inline-status").value
        console.log(taskName)
        
        fetch(`http://localhost:9000/tasks/${user.id}/${taskName}`)
        .then(res => res.json())
        .then(res => {
            try {
                
                setTasks(res);
                return res;
            }
            catch {

            }
         } );
    }


    return (
        <>
        <div className="col-span-10 md:col-span-8 xl:col-span-5 bg-red-300 overflow-y-hidden overflow-x-hidden h-full max-h-screen no-scrollbar flex flex-rows">
            <div className="flex flex-col flex-1 over">

                {/**Create Task Bar ------------------------------------------------------------------------------------------ */}
                <div className="flex flex-cols h-28 pt-3 bg-primary justify-center items-center">
                    
                    <div className="w-11/12 p-3">
                        <input class="flex-1 w-full hover:transition-colors hover:ease-in-out hover:duration-300 rounded-lg font-standard italic bg-AddTaskBg appearance-none py-2 px-4 text-gray-700 leading-tight focus:outline-none min-h-12" id="inline-status" type="text" placeholder="New Task Title" />
                    </div>

                    <div className="w-1/12">
                        <button onClick={handleAddTask} className=" btn btn-circle bg-AddTaskBg w-12 h-12 rounded-full flex justify-center items-center">
                            <img src="/images/+.svg" alt="add task sign" />
                        </button>
                    </div>

                </div>


                {/**Main Show Tasks Section ---------------------------------------------------------------------------------- */}
                <div className="h-full bg-primary ">

                    <Box sx={{
                            width: '100%' ,
                            height: '100%',
                        }}>

                        <Box sx={{ 
                                borderBottom: 1, 
                                borderColor: 'divider',
                            }}>

                            <Tabs
                                value={value} 
                                onChange={handleChange} 
                                aria-label="tasks tab" 
                                TabIndicatorProps={{
                                    style: {
                                    backgroundColor: "#334155"
                                    }
                                }}
                                sx={{
                                    "& .Mui-selected": {
                                        color: "#334155"
                                    },
                                    "& .MuiTabs-indicator": {
                                        color: "#334155"
                                    }
                                }}
                            >
                                
                                <Tab
                                sx={{
                                    color: 'DarkGrey',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                }}
                                label="My Tasks" {...a11yProps(0)} />

                                <Tab 
                                sx={{
                                    color: 'DarkGrey',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                }}
                                label="Group Tasks" {...a11yProps(1)} />
                            </Tabs>

                        </Box>
                        

                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >

                            <CustomTabPanel value={value} index={0} aria-label="personal-tasks-tab">
                                <MyTasks data={tasks}/>
                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={1}>
                                <FriendsBar />
                            </CustomTabPanel>

                        </SwipeableViews>


                    </Box>

                </div>

            </div>
        </div>

        </>
    )
}
