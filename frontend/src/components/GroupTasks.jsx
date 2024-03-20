import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

import { GroupProfile } from './GroupProfile';
import { MyTasks } from './MyTasks';

export function GroupTasks(props) {

    const { GroupID, GroupName, Members, GroupStatus, Chat, Admin, grpList} = props;

    const test2 = {
        "task1": {
            "uuid": "randomKey1",
            "taskDescription": "Clean Apartment",
            "status": true,
            "visibilityDB": true,
            "dueDate": "2026-06-04",
            "plannedDate": "2024-02-04"
        },
        "task2": {
            "uuid": "randomKey2",
            "taskDescription": "Complete ENSF401 Research Assignment",
            "status": false,
            "visibilityDB": true,
            "dueDate": "2024-02-13",
            "plannedDate": "2024-02-04"
        },
        "task3": {
            "uuid": "randomKey3",
            "taskDescription": "Laundry",
            "status": false,
            "visibilityDB": false,
            "dueDate": "2024-02-04",
            "plannedDate": "2024-02-04"
        }
    }

    return (
        <>
            <div className='mb-5'>
                <GroupProfile
                    GroupID = {GroupID}
                    GroupName = {GroupName}
                    Members =  {Members}
                    GroupStatus = {GroupStatus}
                    Chat = {Chat}
                    Admin = {Admin}
                    grpList = {false}
                />
            </div>
            

            <MyTasks tasksList={test2}/>
        </>
    )
}