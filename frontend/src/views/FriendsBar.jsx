import { React } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import Friend from '../components/Friend';

export function FriendsBar () {

    return (
        <div className="col-span-10 md:col-span-3 xl:col-span-3 bg-primary flex-1 overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar px-8">

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

                <img className='mx-2'
                        src={"/images/Plusicon.svg"}
                        />
            </div>

            {/* Friends component begins here */}
            <Friend/>
            <Friend/>
            <Friend/>
        </div>
    )
}