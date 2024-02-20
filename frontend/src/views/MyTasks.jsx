import { React, useState, useEffect } from 'react';

import { TaskComponent } from '../components/TaskComponent';

export function MyTasks () {

    


    return (
        <>
            <div className="bg-slate-300 flex-1 overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar">
                < TaskComponent />
                < TaskComponent />
                < TaskComponent />
            </div>
        </>
    )
}