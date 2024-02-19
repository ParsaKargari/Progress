import React from 'react';
import { ThumbUpOutlined, ChatBubbleOutlineOutlined } from '@mui/icons-material'; // Import the icons from MUI

export function ActivityBar() {
    // Sample data for activities, you can replace this with real data from your application
    const activities = [
        {
            id: 1,
            user: 'Random User',
            activity: 'Walk Dog',
            time: '18m ago',
            reactions: ['👍', '🐶'],
            comments: ['That looks sick!', 'Sick sick sick']
        },
        {
            id: 2,
            user: 'Thomas Bhavnani',
            activity: 'ENSF401 Work',
            time: '1h ago',
            reactions: ['👍', '📘'],
            comments: []
        },
        {
            id: 3,
            user: 'David Rodriguez',
            activity: 'Focus',
            time: '4h ago',
            reactions: ['👍', '🧘'],
            comments: []
        },
    ];

    return (
        <div className="col-span-10 md:col-span-8 xl:col-span-4 bg-white overflow-y-auto overflow-x-hidden h-screen max-h-screen">

            <p className="text-27 font-bold py-14 px-6 text-DarkGrey font-standard">Activity</p>

            <div className="px-1">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex flex-col p-3 rounded-lg">
                        <div key={activity.id} className="flex flex-col p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-16 font-bold text-text2 font-standard">{activity.user} <span className="font-medium"> checked off {activity.activity} </span>
                                                                                            <span className="ml-3 text-text3 font-medium"> ({activity.time})</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
