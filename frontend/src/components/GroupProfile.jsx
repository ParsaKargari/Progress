import React, { useState } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import '../css/MusicAnimation.css';


export function GroupProfile(props) {

    const { GroupID, GroupName, Members, GroupStatus, Chat, Admin, grpList} = props;

    return (
        <>

            <div className="flex flex-row justify-between items-center  border-b-2">
                <div className='flex flex-row items-center py-1.5'>
                    
                    <CircularProgress className='cursor-pointer'
                        determinate
                        size="md"
                        value={20}
                        variant="solid"
                    />

                    <div className='flex flex-col flex-start align-items-center'>

                        <div className='flex flex-row'>
                            <div className='flex'>
                                <p className='font-bold text-DarkGrey font-standard text-[16px] ml-3 mr-1'>{props.GroupName}</p>
                                <p className='font-bold text-friendsBracketAccent font-standard text-[16px]'>(6)</p>
                                <img className='ml-1.5' src='/images/OnlineDot.svg'></img>
                            </div>
                        </div>

                        <div className='flex flex-row mx-3 align-items-center'>
                            <p className={`font-regular text-DarkGrey font-light text-[16px] `}>
                                {props.GroupStatus}
                            </p>
                        </div>

                    </div>

                </div>

                {
                    grpList ?
                    (
                        <div className="text-friendsBracketAccent">
                            Edit
                        </div>
                    ) :
                    (
                        <div className="flex flex-row">
                            <div className="w-1/2 mr-2 mb-2">
                                <button className=" btn btn-circle bg-AddTaskBg w-12 h-12 rounded-xl flex justify-center items-center">
                                    <img src="/images/GroupChat.svg" alt="grp chat icon" />
                                </button>
                            </div>

                            <div className="w-1/2">
                                <button className=" btn btn-circle bg-AddTaskBg w-12 h-12 rounded-xl flex justify-center items-center">
                                    <img src="/images/BackButton.svg" alt="back button icon" />
                                </button>
                            </div>
                        </div>
                    )
                }

                
            </div>
        
        </>
        
    );
}
