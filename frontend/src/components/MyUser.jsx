import React, { useState } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import '../css/MusicAnimation.css';
import { BlockPicker } from 'react-color';
import Dialog from '@mui/material/Dialog';
import { useAuth } from '../context/AuthContext';


export default function FriendProfile() {
    const [open, setOpen] = useState(false);
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');
    const [ringColor, setRingColor] = useState('#697689'); // Default yellow color

    const { signOut } = useAuth();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRingColorChange = (color) => {
        setRingColor(color.hex);
    };

    const handleSave = () => {
        // Implement save functionality
    };

    const handleLogout = async () => {
        try {
            await signOut(); // Call the signOut function from AuthContext
            // You can handle post-logout logic here, e.g., redirect to a login page
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };



    return (
        <div className='flex flex-row justify-start items-center py-1.5 pb-3 border-t-2 border-betterWithFriends'>
            <CircularProgress
                className='cursor-pointer'
                style={{ color: 'yellow' }}
                determinate
                size="md"
                value={20}
                variant="solid"
                onClick={handleClickOpen}
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

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        width: '450px',
                        height: 'auto',
                        padding: '15px',
                        borderRadius: '20px',
                    },
                }}
            >
                <div className='flex-row px-3 py-1'>
                    <p className='font-bold text-DarkGrey font-standard text-[20px] mr-1'>{'Settings'}</p>

                    <p className='font-bold text-DarkGrey font-standard text-[16px] py-1 mr-1'>Username</p>
                    <input
                        className='bg-[#F8F8F8] border rounded w-30% py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Current Username"
                    />

                    <p className='font-bold text-DarkGrey font-standard text-[16px] py-1 mr-1'>Status</p>
                    <input
                        className='bg-[#F8F8F8] border rounded w-30% py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type="text"
                        id="status"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="Current Status"
                    />

                    <p className='font-bold text-DarkGrey font-standard text-[16px] py-2 mr-1'>Ring Color</p>
        
                    <CircularProgress
                        className='cursor-pointer'
                        style={{ color: ringColor }}
                        determinate
                        size="md"
                        value={30}
                        variant="solid"
                        
                    />
                    
                        <div>
                            <div/>
                            <BlockPicker color={ringColor} onChange={handleRingColorChange} triangle='hide' />
                        </div>
            
                    <p className='font-bold text-DarkGrey font-standard text-[16px] py-2 mr-1'>Connect Spotify</p>

                    <button className="flex items-center justify-items-center content-center border border-[#1ED760] min-h-12 min-w-20 rounded-xl bg-white focus:shadow-outline focus:outline-none font-standard " type="button">
                        <img className='ml-1.5' src='/images/spotify.svg' alt="Spotify Logo" />
                        <p className=' text-[#1ED760] font-bold py-0.5 px-4'>Login with Spotify</p>
                    </button>

                    <p className='font-bold text-DarkGrey font-standard text-[16px] py-0.5 mr-1'>Logout</p>

                    <button
                        className="flex items-center justify-items-center content-center border border-[#ff635d] rounded-xl bg-white focus:shadow-outline focus:outline-none font-standard "
                        type="button"
                        onClick={handleLogout} // Attach the logout handler here
                    >
                        <p className=' text-[#ff635d] font-bold py-1.5 px-4'>Logout</p>
                    </button>

                    <div className='flex  items-center justify-center content-center py-1'>
                        <button className="flex items-center justify-center content-center border border-[#E2E8F0] rounded-xl bg-white focus:shadow-outline focus:outline-none font-standard w-[fit-content] px-4 py-1.5" type="button" onClick={handleSave}>
                            <p className='text-[#559EB5] font-bold'>Save</p>
                        </button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
