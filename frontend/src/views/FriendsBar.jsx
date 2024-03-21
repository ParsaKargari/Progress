import { React, useState, useEffect } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import Friend from '../components/Friend';
import MyUser from '../components/MyUser';
export function FriendsBar () {
    const[friendList, setFriendList] = useState([]);

    const test = {
        "tbhav": {
            "uuid": "randomKey1",
            "status": "myStatus"

        },
        "Beer God": {
            "uuid": "randomKey2",
            "status": "Drinking"
        },
    }


    useEffect(() => {
        setFriendList(test)
    }, []);

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
                {/* add friends go here */}
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
            <MyUser/>
        </div>
    
    )
}