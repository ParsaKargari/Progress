import { React } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import Friend from '../components/Friend';
import MyUser from '../components/MyUser';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import RequestSent from '../components/RequestSent';
import IncomingRequest from '../components/IncomingRequest';

export function FriendsBar() {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="col-span-10 md:col-span-3 xl:col-span-2 bg-primary flex-1 overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar px-8 flex flex-col justify-between">
            <div>
                <div className='flex flex-row justify-between mt-8 mb-6 align-middle border-solid border-2 rounded-lg p-0.5 border-[#E2E8F0] bg-friendsBackground'>
                    <div className='flex flex-row'>
                        {/* friends logo */}
                        <img className='mx-2' src={"/images/Friends.svg"} />
                        {/* friends title */}
                        <div className='font-bold text-DarkGrey font-standard text-[20px] mx-1'>
                            Friends
                        </div>
                    </div>
                    {/* add friends go here */}
                    <img onClick={handleClickOpen} className='mx-2 cursor-pointer' src={"/images/Plusicon.svg"} />
                </div>

                {/* Friends component begins here */}
                <Friend />
                <Friend />
                <Friend />

                {/* this needs to be hidden on increase in friends */}
                <div className='flex flex-col rounded-xl p-4 bg-betterWithFriends my-3'>
                    <p className='font-regular text-DarkGrey font-bold text-[16px]'>Progress is better with friends! (Thats the whole idea.)</p>
                    <p className='font-regular text-friendsBracketAccent font-regular text-[16px]'>Have them sign up then click the <u>“Add”</u> button above to send them a friend request.</p>
                </div>
            </div>
            <MyUser />

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
                <div className='flex-row px-2'>
                    <p className='font-bold text-DarkGrey font-standard text-[20px] mr-1'>{'Friends'}</p>
                    <div className='flex flex-row my-3'>
                        <input
                            style={{ width: '85%' }} // Adjust width as needed
                            className='bg-[#F8F8F8] border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type="text"
                            placeholder="Search for Progress users..."
                        />

                        <div className='flexit ems-center justify-center content-center pl-5'>
                            <button className="flex items-center justify-center content-center border border-[#E2E8F0] rounded-xl bg-white focus:shadow-outline focus:outline-none font-standard w-[fit-content] px-4 py-1.5" type="button">
                                <p className='text-[#559EB5] font-bold'>Send</p>
                            </button>
                        </div>
                    </div>
                    <p className='font-bold text-DarkGrey font-standard text-[16px] py-1.5 mr-1'>Requests Sent</p>
                    <RequestSent/>
                  
                    <p className='font-bold text-DarkGrey font-standard text-[16px] py-1.5 mr-1'>Requests Received</p>
                    <IncomingRequest/>
                </div>
            </Dialog>
        </div>
    )
}
