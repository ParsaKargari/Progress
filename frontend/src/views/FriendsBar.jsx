import { React } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import Friend from '../components/Friend';
import MyUser from '../components/MyUser';
export function FriendsBar() {

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


    return (
        <div className="col-span-10 md:col-span-3 xl:col-span-2 bg-primary flex-1 overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar px-8 flex flex-col justify-between">

            <div>
                <div className='flex flex-row justify-between mt-8 mb-6 align-middle border-solid border-2 rounded-lg p-0.5 border-[#E2E8F0] bg-friendsBackground'>
                    <div className='flex flex-row'>
                        {/* friends logo */}
                        <img className='mx-2'
                            src={"/images/Friends.svg"}
                        />
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
        </div>

    )
}