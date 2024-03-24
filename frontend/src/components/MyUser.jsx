// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react'; 


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
    const { user } = useAuth();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRingColorChange = (color) => {
        setRingColor(color.hex);
    };

    const handleSave = async () => {
        // get the username from the input field
        const username = document.getElementById('username').value;
        const status = document.getElementById('status').value;
        const color = ringColor;
        console.log('Username:', username);
        console.log('Status:', status);
        console.log('Color:', color);

        // Send the data to the backend
        await fetch(`http://localhost:9000/settings/updateSettings?user_id=${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, status, color }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setOpen(false); // Close the dialog after saving
            })
            .catch(error => {
                console.error('Error:', error);
            });

    };

    const handleLogout = async () => {
        try {
            await signOut(); // Call the signOut function from AuthContext
            // You can handle post-logout logic here, e.g., redirect to a login page
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };


    
    const handleSpotifyLogin = async () => {
        // Assuming you     have access to the user ID
        // Redirect to the backend route /Spotify/login along with the user ID
        // so that users can login from spotify and validate
        window.location.href = `http://localhost:9000/spotify/login?user_id=${user.id}`;
        // window.location.href = `http://localhost:9000/spotify/currently_playing?user_id=${user.id}`
        // upon completion or not, it will 
      }


// Function to check if interval fetching is allowed for Spotify
async function checkSpotifyIntervalAllowed() {
    try {
        const response = await fetch(`http://localhost:9000/spotify/isUserSignedIn?user_id=${user.id}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json(); // Await the JSON parsing
        
        console.log('Response:', data); // Log the actual data
        
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return false; // Return false in case of an error
    }
}

// Function to fetch currently playing song from Spotify
async function updateSongPlaying() {
    fetch(`http://localhost:9000/spotify/currently_playing?user_id=${user.id}`)
        .catch(error => {
            console.error('There was a problem updating the currently playing song:', error);
        });
}


useEffect(() => {
    checkSpotifyIntervalAllowed().then(async allowed => {
        if (allowed) {
            // Call the updateSongPlaying function initially when the page loads
            await updateSongPlaying();

            // Set interval to call the updateSongPlaying function repeatedly
            const interval_To_Update_Spotify = 150000; // Interval in milliseconds (e.g., 150000 ms = 2.5 minutes)
            const interval_Spotify_Update_Song = setInterval(updateSongPlaying, interval_To_Update_Spotify);
        } else {
            console.log('Interval fetching for Spotify not allowed by the API.');
        }
    });
}, []); // Empty dependency array ensures that this effect runs only once


useEffect(() => {
    async function LoadPersonalSettings() {
        try {
            const response = await fetch(`http://localhost:9000/settings/getSettings?user_id=${user.id}`);
            const data = await response.json();
            console.log('Settings Response:', data);
            setUsername(data[0].Username || "vishnudhanda(notfound)");
            setStatus(data[0].Status || "Database!");
            setRingColor(data[0].color || '#697689');
        } catch (error) {
            console.error('Error loading personal settings:', error.message);
        }
    }

    LoadPersonalSettings(); // Load personal settings when component mounts
}, [user.id]); // Load personal settings whenever user ID changes
    
      

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
                        <p className='font-bold text-DarkGrey font-standard text-[16px] ml-3 mr-1'> {username || "vishnudhanda(notfound)"}</p>
                        <p className='font-bold text-friendsBracketAccent font-standard text-[16px]'>(6)</p>
                    </div>
                </div>
                <div className='flex flex-row mx-3 align-items-center'>
                    <div className='flex flex-row'>
                        <p className='text-DarkGrey font-standard text-[16px]'>{status || "Database!"} </p>
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
                        <p className=' text-[#1ED760] font-bold py-0.5 px-4' onClick={handleSpotifyLogin}>Login with Spotify</p>
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
