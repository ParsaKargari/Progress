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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Alert } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import Badge from '@mui/material/Badge';

export function FriendsBar() {

    const test = {}
    const [friendList, setFriendList] = useState([test]);
    const received = {}
    const sent = {}
    const { user } = useAuth();
    var friendSearchInput = '';
    const [requestsSent, setRequestsSent] = useState([sent]);
    const [requestsReceived, setRequestsReceived] = useState([received]);
    const [requestsSentComponents, setRequestsSentComponents] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');



    useEffect(() => {
        getFriends()
        getRequests()

    }, []);


    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        getFriends();
        getRequests();
    };

    async function getFriends() {
        var user_id = localStorage.getItem("User_ID");
        axios.get(`${process.env.REACT_APP_API_URL}/friends/${user.id}`).then(
            response => {
                const data = response.data;
                console.log(data);

                data.forEach(item => {
                    console.log(item);
                    var newKey = '' + item.friendUsername
                    console.log(newKey)
                    test[newKey] = { friendID: item.friendID, status: item.friendStatus, percentage: item.friendPercentage, friendOnlineStatus: item.friendOnlineStatus}

                })
                console.log("This is the friend: ",test)
                setFriendList(test)
            })
        axios.get(`${process.env.REACT_APP_API_URL}/tasks/updatePercentage/${user.id}`)
    }
    // Sample array of suggestions
    const suggestions = [
        { label: 'testUser' },
    ];

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };    


    function searchFriend(input) {
        console.log(input)
        axios.get(`${process.env.REACT_APP_API_URL}/friends/search/${input}/${user.id}`)
            .then(response => {
                // get requests, dont move forward until requests are fetched
                getRequests()

                // Update to use Snackbar for feedback
                if (response.data === 'This user has already sent you a friend request! Accept it to add them as a friend.') {
                    setSnackbarMessage(response.data);
                    setSnackbarSeverity('info');
                    setSnackbarOpen(true);
                } else if (response.data === 'User Already Added As Friend') {
                    setSnackbarMessage(response.data);
                    setSnackbarSeverity('info');
                    setSnackbarOpen(true);
                } else if (response.data === 'Friend Request Successfully Sent.') {
                    setSnackbarMessage(response.data);
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                    // close the dialog
                    // setOpen(false);
                } else {
                    setSnackbarMessage('An error occurred. Please try again.');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                }
                
            })
            .catch(error => {
                // Handle error scenario
                setSnackbarMessage('An error occurred.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    }
    
    async function getRequests() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/friends/getRequests/${user.id}`);
            console.log("GET REQUESTS RESPONSE", response);
    
            const updatedReceived = {}; 
            const updatedSent = {}; 
    
            response.data[1].forEach(item => {
                updatedReceived[item.id] = { name: item.username };
            });
            response.data[0].forEach(item => {
                updatedSent[item.id] = { name: item.username };
            });
    
            setRequestsReceived(updatedReceived);
            setRequestsSent(updatedSent);
        } catch (error) {
            console.error("Failed to fetch requests:", error);
            // Handle error
        }
    }
    

    useEffect(() => {
        // After requests sent are fetched, update the state
        // This will trigger a re-render of the component with updated data
        const requestSentComponents = Object.keys(requestsSent).map(friendKey => (
            <RequestSent
                id={friendKey}
                name={requestsSent[friendKey].name}
            />
        ));

        // Now update your component state
        setRequestsSentComponents(requestSentComponents);
    }, [requestsSent]);


    const [textInput, setTextInput] = useState('');

    const handleTextInputChange = event => {
        setTextInput(event.target.value);
        console.log(event.target.value);
    };






    return (
        <div className="col-span-10 md:col-span-3 xl:col-span-2 bg-primary flex-1 overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar px-8 flex flex-col justify-between">
            <div>
            <div className='flex flex-row justify-between mt-8 mb-6 align-middle border-solid border-2 rounded-lg p-0.5 border-[#E2E8F0] bg-friendsBackground'>
                <div className='flex flex-row items-center mx-1'> {/* Updated this line */}
                    {/* Friends logo with badge centered vertically */}
                    <Badge 
                        badgeContent={Object.keys(requestsReceived).length} 
                        color="primary" 
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <PeopleIcon color="action" style={{ fontSize: '1.5rem' }} />
                    </Badge>

                    {/* Friends title */}
                    <div className='font-bold text-DarkGrey font-standard text-[20px] mx-2'>
                        Friends
                    </div>
                </div>
                {/* Add friends icon */}
                <img onClick={handleClickOpen} className='mx-2 cursor-pointer' src={"/images/Plusicon.svg"} />
            </div>

                {
                    Object.keys(friendList).map(friendKey => (
                        <Friend
                            name={friendKey}
                            status={friendList[friendKey].status}
                            uuid={friendList[friendKey].uuid}
                            percentage={friendList[friendKey].percentage}
                            onlineStatus={friendList[friendKey].friendOnlineStatus}
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
                    <p className='font-bold text-DarkGrey font-standard text-[20px] mr-1' >{'Friends'}</p>
                    <div className='flex flex-row jusify-content align-items'>

                        <Autocomplete
                            size='small'
                            freeSolo
                            options={suggestions.map((option) => option.label)}
                            style={{
                                width: 300,

                            }}
                            renderInput={(params) => (
                                <TextField id='bruh'
                                    {...params}
                                    label="Search for Progress users..."
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleTextInputChange}

                                />
                            )}
                        />

                        <div className='flex justify-center content-center pl-5 items-center' >
                            <button className="flex items-center border border-[#E2E8F0] rounded-xl bg-white focus:shadow-outline focus:outline-none font-standard w-[fit-content] px-6 py-2" type="button" onClick={() => { searchFriend(textInput); getRequests() }}>
                                <p className='text-[#00789E] font-bold'>Send</p>
                            </button>
                        </div>
                    </div>
                    <p className='font-bold text-DarkGrey font-standard text-[16px] py-1.5 mr-1'>Requests Sent</p>
                    {requestsSentComponents}  
                    <p className='font-bold text-DarkGrey font-standard text-[16px] py-1.5 mr-1'>Requests Received</p>
                    {
                Object.keys(requestsReceived).map(friendKey => (
                    <IncomingRequest
                    id = {friendKey}
                    name = {requestsReceived[friendKey].name}
                    />
                ))
            }

                </div>
            </Dialog>
            {/* bottom left */}
            <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>


        </div>
    )
}
