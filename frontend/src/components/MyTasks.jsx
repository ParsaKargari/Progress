import { React, useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { TaskComponent } from './TaskComponent';

export function MyTasks () {

    


    return (
        <>
            <div className="bg-slate-300 flex-1 overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar">
            {/* taskDescription, dueDate, status, visibilityDB */}
                < TaskComponent taskDescription="Clean Apartment" status={true} visibilityDB={true} dueDate={dayjs('2024-02-20')} />
                < TaskComponent taskDescription="Complete ENSF401 Research Assignment" status={false} visibilityDB={true} dueDate={dayjs('2024-02-23')}/>
                < TaskComponent taskDescription="Laundry" status={false} visibilityDB={false} dueDate={dayjs('2024-02-24')}/>
            </div>
        </>
    )
}