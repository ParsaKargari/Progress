import { React, useState, useEffect } from 'react';

import { GroupsList } from './GroupsList';

export function Groups () {
    

    return (
        <>
            <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar">
                
                <GroupsList />

            </div>

        </>
    )
}