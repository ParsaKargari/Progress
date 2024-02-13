import {React, useState, useEffect} from "react";


/**Importing Components */
import { ActivityBar } from './ActivityBar.jsx'
import { TasksBar } from './TasksBar.jsx'
import { FriendsBar } from './FriendsBar.jsx'

export function LargeSize() {
    
    return (
        <>

            <div className="grid grid-cols-11 flex-cols h-screen bg-primary max-h-screen overflow-clip">
                <FriendsBar />

                <TasksBar />

                <ActivityBar />
            </div>

        </>
    )
}