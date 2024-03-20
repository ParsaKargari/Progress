import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

import { GroupsList } from './GroupsList';
import { GroupTasks } from './GroupTasks';

function CustomTabPanel(props) {

    const { children, groupTab, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={groupTab !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {groupTab === index && (
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
    groupTab: PropTypes.number.isRequired,
};
  
function a11yProps(index) {

    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };

}

export function Groups () {
    const theme = useTheme();
    const [groupTab, setGroupTab] = useState(0);

    const handleChange = (event, newValue) => {
        setGroupTab(newValue);
    };

    const handleChangeIndex = (index) => {
        setGroupTab(index);
    };    

    return (
        <>
            <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar">
                
                

                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={groupTab}
                    onChangeIndex={handleChangeIndex}
                >

                    <CustomTabPanel groupTab={groupTab} index={0} aria-label="personal-tasks-tab">
                        <GroupsList />
                    </CustomTabPanel>

                    <CustomTabPanel groupTab={groupTab} index={1}>
                        <GroupTasks />
                    </CustomTabPanel>
                    
                    {/* 
                    <div className='flex flex-1 h-full w-full' groupTab={groupTab} index={2}>
                        <ActivityBar/>
                    </div> */}

                </SwipeableViews>

            </div>

        </>
    )
}