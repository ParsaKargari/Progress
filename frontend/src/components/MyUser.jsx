import React from 'react';
import { useState } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import '../css/MusicAnimation.css';
import Settings from './Settings';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CustomPicker } from 'react-color';

export default function FriendProfile() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
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
                
                    <p className='font-bold text-DarkGrey font-standard text-[16px] py-2 mr-1'>Username</p>
                    {/* place holder text would need to be changed according to users stuff */}
                    <input className='bg-[#F8F8F8] border rounded w-30% py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" id="fname" name="fname" placeholder="Current Username"></input>


                    <p className='font-bold text-DarkGrey font-standard text-[16px] py-2 mr-1'>Status</p>
                    <input className='bg-[#F8F8F8] border rounded w-30% py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" id="fname" name="fname" placeholder="Current Status"></input>

                    <p className='font-bold text-DarkGrey font-standard text-[16px] py-2 mr-1'>Ring Color</p>
                    <CircularProgress
                        className='cursor-pointer'
                        style={{ color: 'yellow' }}
                        determinate
                        size="md"
                        value={30}
                        variant="solid"
                        onClick={handleClickOpen}
                    />
                    <p className='font-bold text-DarkGrey font-standard text-[16px] py-2 mr-1'>Connect Spotify</p>

                    <button class="flex items-center justify-items-center content-center border border-[#1ED760] min-h-12 min-w-20 rounded-xl bg-white focus:shadow-outline focus:outline-none font-standard " type="button">
                                <img className='ml-1.5' src='/images/spotify.svg'></img>  
                                <p className=' text-[#1ED760] font-bold py-2 px-4'>Login with Spotify</p>
                    </button>
                    <p className='font-bold text-DarkGrey font-standard text-[16px] py-1 mr-1'>Logout</p>
                    
                    <button class="flex items-center justify-items-center content-center border border-[#ff635d]  rounded-xl bg-white focus:shadow-outline focus:outline-none font-standard " type="button " >
                                <p className=' text-[#ff635d] font-bold py-1.5 px-4'>Logout</p>
                    </button>
                    <div className='flex  items-center justify-center content-center py-2'>
                    <button class="flex items-center justify-center content-center border border-[#E2E8F0] rounded-xl bg-white focus:shadow-outline focus:outline-none font-standard w-[fit-content] px-4 py-1.5" type="button">
                    <p className='text-[#559EB5] font-bold'>Save</p>
                    </button>
                        </div>    
                

                </div>

            

      
            </Dialog>


        </div>
    );
}
