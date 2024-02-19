import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
          <Box sx={{ p: 3 }}>
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
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
        <div className="col-span-10 md:col-span-8 xl:col-span-5 bg-red-300 overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar flex flex-rows">
            <div className="flex flex-col flex-1">

                {/**Create Task Bar ------------------------------------------------------------------------------------------ */}
                <div className="flex flex-cols h-28 bg-primary justify-center items-center">
                    
                    <input class="flex-1 m-3 hover:transition-colors hover:ease-in-out hover:duration-300 min-h-12 rounded-lg font-standard italic bg-AddTaskBg appearance-none py-2 px-4 text-gray-700 leading-tight focus:outline-none " id="inline-status" type="text" placeholder="New Task Title" />
                    
                    <button className="m-3 btn btn-circle bg-AddTaskBg w-12 h-12 rounded-full flex justify-center items-center">
                        <img src="/images/+.svg" alt="add task sign" />
                    </button>

                </div>


                {/**Main Show Tasks Section ---------------------------------------------------------------------------------- */}
                <div className="h-full bg-primary ">

                    <Box sx={{ width: '100%' }}>

                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="My Tasks" {...a11yProps(0)} />
                                <Tab label="Group Tasks" {...a11yProps(1)} />
                            </Tabs>
                        </Box>

                        <CustomTabPanel value={value} index={0}>
                            My Tasks
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={1}>
                            Group Tasks
                        </CustomTabPanel>


                    </Box>

                </div>

            </div>
        </div>

        </>
    )
}






// import { React, useState, useEffect } from 'react';

// import { ActivityBar } from './ActivityBar';

// export function TasksBar () {
//     const [shouldDisplayActivity, setShouldDisplayActivity] = useState(false)
//     const [shouldSwitchActivity, setShouldSwitchActivity] = useState(true)

//     useEffect(() => {
//         const handleDisplayActivity = () => {
//             if(window.innerWidth < 1280) {
//                 setShouldDisplayActivity(true);
//             }
//             else {
//                 setShouldDisplayActivity(false);
//             }
//         }

//         handleDisplayActivity();

//         window.addEventListener('resize', handleDisplayActivity);

//         return () => {
//             window.removeEventListener('resize', handleDisplayActivity);
//         };

//     }, []);

//     const switchDisplay = () => {
//         if(shouldDisplayActivity) {
//             setShouldSwitchActivity(false);
//         }
//         else {
//             setShouldSwitchActivity(true);
//         }
        
//     }


//     return (
//         <>

//         <div className="md:col-span-4 xl:col-span-4 bg-red-300 overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar flex flex-rows">
//         { shouldSwitchActivity ? (
//             <>
//             <div className="flex flex-col flex-1 bg-slate-600">
//                 {/**Create Task Bar */}
//                 <div className="flex flex-cols h-1/6 bg-cyan-300 justify-center items-center">
//                     <input class="flex-1 m-3 hover:transition-colors hover:ease-in-out hover:duration-300 min-h-12 rounded-lg font-standard italic bg-InputBox appearance-none py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white " id="inline-status" type="text" placeholder="New Task Title" />
//                     <button className="m-3 btn btn-circle bg-InputBox w-12 h-12 rounded-full">
                        
//                     </button>
//                 </div>

//                 {/**Main Show Tasks Section */}
//                 <div className="h-5/6 bg-red-600 min-w-10 min-h-10">

//                     <p>TASKS</p>

//                 </div>
//             </div>
//             </>
//         ) : (
//             <>
//                 <ActivityBar/>
//             </>
//         )}



//             {shouldDisplayActivity ? (
//                 <>
//                 {/**For arrow when screen is small */}
//                 <div className=" bg-green-900 w-1/12 flex" id='mediumActivity'>
//                     <button id="ActivityMenuButton" className="m-3 btn btn-circle bg-InputBox w-12 h-12 rounded-full" onClick={switchDisplay()}>
//                     </button>
//                 </div>
//                 </>
//             ) : (
//                 <></>
//             )}

//         </div>

//         </>
//     )
// }