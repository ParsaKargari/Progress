import React, { useState } from 'react';
import Friend from '../components/Friend';
import MyUser from '../components/MyUser';
import Dialog from '@mui/material/Dialog';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, Tab, Tabs, Autocomplete, TextField } from '@mui/material';


export function FriendsBar() {
    const [open, setOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    const requestsSent = ['Grinder1', 'Grinder2', 'Grinder3']; // TODO: Replace with actual data
    const requestsReceived = ['Grinder4', 'Grinder5', 'Grinder6', 'Grinder7']; //TODO: Replace with actual data
    const friendSuggestions = ['Friend 1', 'Friend 2', 'Friend 3'];
 
    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    }



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Sample array of suggestions
    const suggestions = [
        { label: 'Friend 1' },
        { label: 'Friend 2' },
        { label: 'Friend 3' },
    ];

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
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    },
                }}
            >   
                <div className='flex flex-row items-center'>
                    <Autocomplete
                        value={searchValue}
                        onChange={(event, newValue) => {
                            setSearchValue(newValue);
                        }}
                        freeSolo
                        options={friendSuggestions}
                        renderInput={(params) => <TextField {...params} label="Search for friends..." margin="normal" />}
                        style={{ width: 300, marginBottom: 20 }}
                    />
                    <Button variant="contained" style={{ marginLeft: 20, marginBottom: 10, height: 45 }}>Search</Button>

                </div>

                <div>
                    <Tabs value={tabValue} onChange={handleChangeTab} aria-label="Request tabs" centered>
                        <Tab label="Requests Sent" />
                        <Tab label="Requests Received" />
                    </Tabs>
                    {tabValue === 0 && (
                        <List>
                            {requestsSent.map((request, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={request} />
                                    <ListItemSecondaryAction>
                                        <Button size="small">Cancel</Button>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    )}
                    {tabValue === 1 && (
                        <List>
                            {requestsReceived.map((request, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={request} />
                                    <ListItemSecondaryAction>
                                        <Button size="small">Accept</Button>
                                        <Button size="small">Decline</Button>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </div>
            </Dialog>
        </div>
    )
}
