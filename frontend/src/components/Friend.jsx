import React, { useState } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import '../css/MusicAnimation.css';

/**
 * Functional component for displaying friend profile information.
 * @param {Object} props - Component properties.
 * @param {string} props.name - Name of the friend.
 * @param {string} props.status - Status of the friend.
 * @param {number} props.percentage - Percentage completion.
 * @param {string} props.onlineStatus - Online status of the friend.
 * @returns {JSX.Element} FriendProfile component.
 */

export default function FriendProfile(props) {
    const [isPlaying, setIsPlaying] = useState(false);
    const { name, status, percentage, onlineStatus } = props;

    return (
        <div className='flex flex-row justify-start items-center py-1.5 '>
            {/* Circular progress bar */}
            <CircularProgress
                className='cursor-pointer'
                style={{ color: 'yellow' }} // Replace with your desired hex code
                determinate
                size="md"
                value={percentage}
                variant="solid"
            />
            <div className='flex flex-col align-items-center'>
                <div className='flex flex-row'>
                    <div className='flex'>
                        {/* Friend name */}
                        <p className='font-bold text-DarkGrey font-standard text-[16px] ml-3 mr-1'>{name}</p>
                        {/* Online status dot */}
                        {onlineStatus === 'Online' ? (
                            <img className='ml-1.5' src='/images/OnlineDot.svg' alt='Online' />
                        ) : (
                            <img className='ml-1.5' src='/images/OfflineDot.svg' alt='Offline' />
                        )}
                    </div>
                </div>
                <div className='flex flex-row mx-3 align-items-center'>
                    {/* Now playing icon */}
                    <img
                        className='mr-2 cursor-pointer'
                        src='/images/NowPlaying.svg'
                        onMouseEnter={() => setIsPlaying(true)}
                        onMouseLeave={() => setIsPlaying(false)}
                        alt='Now Playing'
                    />
                    {/* Friend status or now playing text */}
                    <p className={`font-regular text-DarkGrey font-light text-[16px]  ${isPlaying ? 'slide-left' : ''}`}>
                        {isPlaying ? 'Now Playing' : status}
                    </p>
                </div>
            </div>
        </div>
    );
}
