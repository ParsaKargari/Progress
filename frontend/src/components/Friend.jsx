    import React, { useState } from 'react';
    import CircularProgress from '@mui/joy/CircularProgress';
    import '../css/MusicAnimation.css';
    export default function FriendProfile(props) {
        const [isPlaying, setIsPlaying] = useState(false);
        const { name, status } = props;

        return (
            <div className='flex flex-row justify-start items-center py-1.5 '>
                    <CircularProgress className='cursor-pointer'
                style={{ color: 'yellow' }} // Replace with your desired hex code
                determinate
                size="md"
                value={20}
                variant="solid"
            />
                <div className='flex flex-col align-items-center'>
                    <div className='flex flex-row'>
                        <div className='flex'>
                            <p className='font-bold text-DarkGrey font-standard text-[16px] ml-3 mr-1'>{name}</p>
                            <p className='font-bold text-friendsBracketAccent font-standard text-[16px]'>(6)</p>
                            <img className='ml-1.5' src='/images/OnlineDot.svg'></img>
                        </div>
                    </div>
                    <div className='flex flex-row mx-3 align-items-center'>
                        <img
                            className='mr-2 cursor-pointer'
                            src='/images/NowPlaying.svg'
                            onMouseEnter={() => setIsPlaying(true)}
                            onMouseLeave={() => setIsPlaying(false)}
                        ></img>
                        <p className={`font-regular text-DarkGrey font-light text-[16px]  ${isPlaying ? 'slide-left' : ''}`}>

                            {/* this is where status and song name would go */}
                            {isPlaying ? 'Now Playing' : status}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
