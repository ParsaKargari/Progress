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
                    width: '35%',
                    height: '50%',
                    padding: '15px',
                    borderRadius: '20px',
                    },
                  }}
            >
                <div className='flex-row '>
                <p className='font-bold text-DarkGrey font-standard text-[20px] ml-3 mr-1'>{'Settings'}</p>
                
                    <p className='font-bold text-DarkGrey font-standard text-[16px] ml-3 mr-1'>Username</p>
                    

                    <p className='font-bold text-DarkGrey font-standard text-[16px] ml-3 mr-1'>Status</p>
                    <p className='font-bold text-DarkGrey font-standard text-[16px] ml-3 mr-1'>Ring Color</p>
                    <p className='font-bold text-DarkGrey font-standard text-[16px] ml-3 mr-1'>Connect Spotify</p>
                </div>

                <Button>Logout</Button>
            </Dialog>


        </div>
    );
}
