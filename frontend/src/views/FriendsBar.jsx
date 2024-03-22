import { React, useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import CircularProgress from '@mui/joy/CircularProgress';
import Friend from '../components/Friend';
import MyUser from '../components/MyUser';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import RequestSent from '../components/RequestSent';
import IncomingRequest from '../components/IncomingRequest';
import axios from "axios";

export function FriendsBar () {
    const test = {}
    const[friendList, setFriendList] = useState([test]);
    const { user } = useAuth();

    
    function getFriends() {
    var user_id = localStorage.getItem("User_ID");
    axios.get(`${process.env.REACT_APP_API_URL}/friends/${user.id}`).then(
        response => {
            const data = response.data;
            console.log(data);
            
            data.forEach(item => {
                console.log(item);
                var newKey = '' + item.friendUsername
                console.log(newKey)
                test[newKey] = {friendID: item.friendID, status: item.friendStatus}
                
            })
            console.log(test)
            setFriendList(test)
            })
    }
    

    useEffect(() => {
        getFriends()
    }, []);



    function friends() {
        // var userName = document.getElementById("inline-first-name").value;
        // var status = document.getElementById("inline-status").value;
        // if (userName === "" || status === "") {
        //     alert("Please fill out all fields!");
        //     return;
        // }
        // else {
        //     navigation(`/home`, {replace : true})
        // }
        var user_id = localStorage.getItem("User_ID");
        // var user_email = localStorage.getItem("User_Email");
        fetch(`http://localhost:9000/friends/${user_id}`)
        // addUsername(userName, user_id);
        // addStatus(status, user_id);
        // addEmail(user_email, user_id);
    }
    const [open, setOpen] = useState(false);
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
                    { /* */}
                    <img className='mx-2 cursor-pointer'
                        src={"/images/Plusicon.svg"}
                    />
                </div>

            {
                Object.keys(friendList).map(friendKey => (
                    <Friend
                        name = {friendKey}
                        status = {friendList[friendKey].status}
                        uuid = {friendList[friendKey].uuid}
                    />
                ))
            }

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
                    <div className='flex flex-row jusify-content align-items'>

                        <Autocomplete
                           size='small'
                            freeSolo
                            options={suggestions.map((option) => option.label)}
                            style={{
                                width: 300,
                                
                              }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search for Progress users..."
                                    margin="normal"
                                    variant="outlined"
                                />
                            )}
                        />
                        
                        <div className='flex justify-center content-center pl-5 items-center'>
                            <button className="flex items-center border border-[#E2E8F0] rounded-xl bg-white focus:shadow-outline focus:outline-none font-standard w-[fit-content] px-6 py-2" type="button">
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
