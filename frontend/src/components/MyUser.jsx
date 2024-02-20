import React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import '../css/MusicAnimation.css';

export default function FriendProfile() {
    return (
        <div className='flex flex-row justify-start items-center py-1.5 pb-3 border-t-2 border-betterWithFriends'>
            <CircularProgress
                className='cursor-pointer'
                style={{ color: 'yellow' }}
                determinate
                size="md"
                value={20}
                variant="solid"
            />
            <div className='flex flex-col align-items-center'>
                <div className='flex flex-row'>
                    <div className='flex'>
                        <p className='font-bold text-DarkGrey font-standard text-[16px] ml-3 mr-1'>vishnudhanda</p>
                        <p className='font-bold text-friendsBracketAccent font-standard text-[16px]'>(6)</p>
                    </div>
                </div>
                <div className='flex flex-row mx-3 align-items-center'>
                    <div className='flex flex-row'>
                        <p className='text-DarkGrey font-standard text-[16px]'>Database!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
