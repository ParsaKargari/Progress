import { React, useState, useEffect } from 'react';

import { GroupProfile } from './GroupProfile';

export function GroupsList () {
    const[groupsList, setGroupsList] = useState([]);
    const[showAdd, setShowAdd] = useState(true);

    const AddGroup = (GroupID, GroupName, Members, GroupStatus, Chat, Admin) => {
        const newGroup = {
            "GroupID": GroupID,
            "GroupName": GroupName,
            "Members": Members,
            "GroupStatus": GroupStatus,
            "Chat": Chat,
            "Admin": Admin
        };
    
        const temp = [...groupsList, newGroup];
        setGroupsList(temp);
    }

    const groupTasksList = [
        {
            "uuid": "task1",
            "GroupID": "group1",
            "GroupName": "Home",
            "Members": ["Member 1", "Member 2", "Member 3"],
            "GroupStatus": "Bro what",
            "Chat": "Group chat 1",
            "Admin": "Admin 1"
        },
        {
            "uuid": "task2",
            "GroupID": "group2",
            "GroupName": "The Homies",
            "Members": ["Member 4", "Member 5"],
            "GroupStatus": "Not Grinding",
            "Chat": "Group chat 2",
            "Admin": "Admin 2"
        },
        {
            "uuid": "task3",
            "GroupID": "group3",
            "GroupName": "Group 3",
            "Members": ["Member 6", "Member 7", "Member 8"],
            "GroupStatus": "Grinding",
            "Chat": "Group chat 3",
            "Admin": "Admin 3"
        }
    ]

    useEffect(() => {
        if (groupTasksList.length < 4){
            setShowAdd(true);
        }
        else {
            setShowAdd(false);
        }
    }, groupTasksList);


    useEffect(() => {
        setGroupsList(groupTasksList)
    }, []);

    return (
        <>
            {
                Object.keys(groupsList).map(groupKey => (
                    <GroupProfile
                        uuid = {groupKey}
                        GroupID = {groupsList[groupKey].GroupID}
                        GroupName = {groupsList[groupKey].GroupName}
                        Members =  {groupsList[groupKey].Members}
                        GroupStatus = {groupsList[groupKey].GroupStatus}
                        Chat = {groupsList[groupKey].Chat}
                        Admin = {groupsList[groupKey].Admin}
                    />
                ))
            }
            

            {   
                
                showAdd ? 
                    <div className="flex flex-col bg-AddTaskBg mt-2 rounded-xl p-4 ">
                        <div className='font-regular text-DarkGrey text-[16px] justify-center content-center items-center'>
                            <p className='text-center'>Have your friends sign up and create or join a group!</p>
                        </div>
                    </div>
                :
                    <>
                    
                    </>
            }
        </>
    )
}