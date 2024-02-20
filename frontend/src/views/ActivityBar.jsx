import React, { useState } from 'react';

export function ActivityBar() {
    const initialActivities = [
        {
            id: 1,
            user: 'Random User',
            activity: 'Walk Dog',
            time: '18m ago',
            reactions: [{
                emoji: '👍',
                by: 'Parsa'
            }, {
                emoji: '🐶',
                by: 'Shivam'
            }, {
                emoji: '🐕',
                by: 'Thomas'
            }],
            comments: [['TBhav', 'That looks sick! That looks sick! hat looks sick!  hat looks sick!  '], ['SDawg', 'Sick sick sick']]
        },
        {
            id: 2,
            user: 'Thomas Bhavnani',
            activity: 'ENSF401 Work',
            time: '1h ago',
            reactions: [{
                emoji: '🦥',
                by: 'Parsa'
            }],
            comments: []
        },
        {
            id: 3,
            user: 'David Rodriguez',
            activity: 'Focus',
            time: '4h ago',
            reactions: [],
            comments: []
        },
    ];

    const [hoveredActivityId, setHoveredActivityId] = useState(null);
    const [activities, setActivities] = useState(initialActivities);
    
    return (
        <div className="col-span-10 md:col-span-8 xl:col-span-4 bg-primary overflow-y-auto overflow-x-hidden h-screen max-h-screen">

            <p className="text-27 font-bold py-14 px-6 text-DarkGrey font-standard">Activity</p>

            <div className="px-1">
                {activities.map((activity) => (
                    <div onMouseEnter={() => setHoveredActivityId(activity.id)}
                        onMouseLeave={() => setHoveredActivityId(null)}>
                        <div key={activity.id} className="flex flex-col p-1 ml-4 mr-4 rounded-lg hover:bg-gray-100">
                            <div key={activity.id} className="flex flex-col p-3 rounded-lg">
                                {/* Map Activity */}
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-16 font-bold text-text2 font-standard">{activity.user} <span className="font-medium"> checked off {activity.activity} </span>
                                                                                                               <span className="ml-3 text-text3 font-medium"> ({activity.time})</span>
                                    </div>
                                    {hoveredActivityId === activity.id && (
                                        <div>
                                            <button onClick={() => {/* logic to display comment input */}}>
                                                Comment
                                            </button>
                                            <button onClick={() => {/* logic to display emoji picker and add reaction */}}>
                                                React
                                            </button>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Map Comments */}
                                {activity.comments.map((comment, index) => (
                                    <div key={index} className="flex items-center mb-2 ml-6 pr-16">
                                        <div className="ml-2 text-text2 font-regular"> <span className='font-semibold'>{comment[0]}</span> {comment[1]}</div>
                                    </div>
                                ))}

                                {/* Map Comment Input */}
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
