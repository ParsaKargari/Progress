import {React, useState, useEffect} from "react";
import { Outlet, useNavigate } from "react-router-dom";

/**Importing Components */
import { ActivityBar } from './ActivityBar.jsx'
import { TasksBar } from './TasksBar.jsx'
import { FriendsBar } from './FriendsBar.jsx'

export function SmallSize() {
    
    
    return (
        <>
            <div className="grid grid-cols-12 flex-cols h-screen bg-primary max-h-screen overflow-clip">
                <div className="col-span-1 bg-green-900 flex" id='taskButton'>
                    <button id="ActivityMenuButton" className="m-3 btn btn-circle bg-InputBox w-12 h-12 rounded-full" >
                    </button>
                </div>

                <TasksBar />

                <div className="col-span-1 bg-green-900 flex" id='activityButton'>
                    <button id="ActivityMenuButton" className="m-3 btn btn-circle bg-InputBox w-12 h-12 rounded-full" >
                    </button>
                </div>
            </div>
        </>
    )
}