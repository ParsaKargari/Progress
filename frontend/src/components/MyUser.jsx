import React, { useState } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import '../css/MusicAnimation.css';

export default function FriendProfile() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isEditingStatus, setIsEditingStatus] = useState(false);

    // this needs to be got from the database
    const [status, setStatus] = useState("Get this from database!"); 

    const handleEditClick = () => {
        setIsEditingStatus(true);
    };

    const handleSaveClick = () => {
        setIsEditingStatus(false);
    };

    const handleStatusChange = (event) => {
        // Limiting status to 30 characters
        const newStatus = event.target.value.slice(0, 20);
        setStatus(newStatus);
    };

    return (
        <div className='flex flex-row justify-start items-center py-1.5 pb-3 border-t-2 border-betterWithFriends'>
            <CircularProgress
                className='cursor-pointer'
                style={{ color: 'yellow' }} // Replace with your desired hex code
                determinate
                size="md"
                value={20}
                variant="solid"
            />
            <div className='flex flex-col align-items-center'>
                <div className='flex flex-row'>
                    <div className='flex'>
                        <p className='font-bold text-DarkGrey font-standard text-[16px] ml-3 mr-1'>Vishnu Dhanda</p>
                        <p className='font-bold text-friendsBracketAccent font-standard text-[16px]'>(6)</p>
                    </div>
                </div>
                <div className='flex flex-row mx-3 align-items-center'>
                    {isEditingStatus ? (
                        <div className='flex flex-row'>
                            <input
                                className='pl-1 border-betterWithFriends'
                                type="text"
                                value={status}
                                onChange={handleStatusChange}
                                maxLength={20} // Limiting input to 30 characters
                            />
                            <button className='pl-2 text-DarkGrey font-standard font-regular' onClick={handleSaveClick}>Save</button>
                        </div>
                    ) : (
                        <div className='flex flex-row'>
                            <p className='text-DarkGrey font-standard text-[16px]'>{status}</p>
                            <img
                                className='pl-2 cursor-pointer'
                                src='/images/EditStatus.svg'
                                onClick={handleEditClick}
                                alt="Edit Status"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
