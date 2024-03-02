import { React, useState, useLayoutEffect, useRef, useEffect  } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
            }, {
                emoji: '👍',
                by: 'Tony'
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
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentActivityIdForReaction, setCurrentActivityIdForReaction] = useState(null);

    const availableEmojis = ['👍', '❤️', '😂', '🎉', '😢', '🔥'];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    // Function to handle emoji selection
    const handleEmojiSelect = (emoji) => {
        handleReactionClick(currentActivityIdForReaction, emoji);
        handleClose();
    };  

    // Function to add or remove reaction
    const handleReactionClick = (activityId, emoji) => {
        const updatedActivities = activities.map(activity => {
            if (activity.id === activityId) {
                const reactionIndex = activity.reactions.findIndex(reaction => reaction.emoji === emoji && reaction.by === 'Current User');
                if (reactionIndex > -1) {
                    // Remove reaction
                    activity.reactions.splice(reactionIndex, 1);
                } else {
                    // Add reaction
                    activity.reactions.push({ emoji, by: 'Current User' });
                }
            }
            return activity;
        });
        setActivities(updatedActivities);
    };
    
    return (
        <div className="col-span-10 md:col-span-8 xl:col-span-4 bg-primary overflow-y-auto overflow-x-hidden h-screen max-h-screen" >
            <p className="text-27 font-bold py-14 px-6 text-DarkGrey font-standard">Activity</p>
            <div className="px-1">
                {activities.map((activity) => (
                    <div key={activity.id} onMouseEnter={() => setHoveredActivityId(activity.id)}
                         onMouseLeave={() => setHoveredActivityId(null)}
                         className="flex flex-col p-1 ml-4 mr-4 rounded-lg hover:bg-gray-100">
                        <div className="flex flex-col p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-16 font-bold text-text2 font-standard">
                                    {activity.user} <span className="font-medium">checked off {activity.activity}</span>
                                    <span className="ml-3 text-text3 font-medium">({activity.time})</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', height: '34px' }}>
                                    {hoveredActivityId === activity.id && (
                                        <>
                                            <IconButton size="small">
                                                <ChatBubbleOutlineIcon />
                                            </IconButton>
                                            <IconButton size="small" onClick={handleClick}>
                                                <EmojiEmotionsIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                                anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                                }}
                                            >
                                                {availableEmojis.map((emoji) => (
                                                <MenuItem key={emoji} onClick={() => handleEmojiSelect(emoji)}>
                                                    {emoji}
                                                </MenuItem>
                                                ))}
                                            </Menu>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='ml-2 mb-2'>
                                {Object.entries(activity.reactions.reduce((acc, { emoji, by }) => {
                                    if (!acc[emoji]) acc[emoji] = [];
                                    acc[emoji].push(by);
                                    return acc;
                                }, {})).map(([emoji, byArray]) => (
                                    <Tooltip key={emoji} title={byArray.join(', ')}>
                                        <Chip
                                            style={{ marginRight: '5px' }}
                                            icon={<span>{emoji}</span>}
                                            onClick={() => handleReactionClick(activity.id, emoji)}
                                            label={byArray.length}
                                        />
                                    </Tooltip>
                                ))}
                            </div>
                            {activity.comments.map((comment, index) => (
                                <div key={index} className="flex items-center mb-2 ml-6 pr-16">
                                    <div className="ml-2 text-text2 font-regular"><span className='font-semibold'>{comment[0]}</span> {comment[1]}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}