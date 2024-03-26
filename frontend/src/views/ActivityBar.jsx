import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ActivityHeatMap from '../components/ActivityHeatMap';
import TextField from '@mui/material/TextField';
import { useAuth } from "../context/AuthContext";
import { useEffect } from 'react';



export function ActivityBar() {
    // Initial activities
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


    const { user } = useAuth();
    const user_id = user.id;
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("User ID: ", user_id);
                const response = await fetch(`http://localhost:9000/activity/getFriendsActivity?user_id=${user_id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log("INSIDE FETCHING DATA FOR ACTIVITIES:");
                console.log(jsonData);



                // setActivities(jsonData);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        console.log("Activities: ", activities)

    }, []);

    const [hoveredActivityId, setHoveredActivityId] = useState(null);
    const [activities, setActivities] = useState(initialActivities);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentActivityIdForReaction, setCurrentActivityIdForReaction] = useState(null);
    const [commentInputActivityId, setCommentInputActivityId] = useState(null);

    const availableEmojis = ['👍', '❤️', '😂', '🎉', '😢', '🔥'];

    const [newComments, setNewComments] = useState(initialActivities.reduce((acc, activity) => {
        acc[activity.id] = '';
        return acc;
      }, {}));

    const handleCommentInputChange = (activityId, text) => {
        setNewComments({
          ...newComments,
          [activityId]: text,
        });
    };

    const handleCommentSubmit = (activityId) => {
        const comment = newComments[activityId];
        console.log(`Comment on activity ${activityId}:`, comment);
        setNewComments({
          ...newComments,
          [activityId]: '',
        });
      };

    const handleCommentClick = (activityId) => {
        setCommentInputActivityId(prevId => prevId === activityId ? null : activityId); // Toggle the input for the specific activity
    };

    const handleClick = (event, activityId) => {
        setAnchorEl(event.currentTarget);
        setCurrentActivityIdForReaction(activityId); // Set the activity ID when the emoji button is clicked
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
                const existingReactionIndex = activity.reactions.findIndex(reaction => reaction.emoji === emoji && reaction.by === 'Current User');
                if (existingReactionIndex > -1) {
                    // Remove the reaction if it exists
                    activity.reactions.splice(existingReactionIndex, 1);
                } else {
                    // Add the reaction if it does not exist
                    activity.reactions.push({ emoji, by: 'Current User' });
                }
            }
            return activity;
        });
        setActivities(updatedActivities);
    };
    
    return (
        <div className="col-span-10 md:col-span-8 xl:col-span-4 bg-primary overflow-y-auto overflow-x-hidden h-screen max-h-screen" >
            <p className="text-27 font-bold py-7 px-6 text-DarkGrey font-standard">Activity</p>
            <div className="ml-6">
                <ActivityHeatMap />
            </div>
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
                                            <IconButton size="small" onClick={() => handleCommentClick(activity.id)}>
                                                <ChatBubbleOutlineIcon />
                                            </IconButton>
                                            <IconButton size="small" onClick={(e) => handleClick(e, activity.id)}>
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
                                        style={{
                                            marginRight: '5px',
                                            backgroundColor: byArray.includes('Current User') ? '#ADD8E6' : undefined, // Light blue color for current user's reactions
                                        }}
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
                            {commentInputActivityId === activity.id && (
                            <div className="ml-6" in={commentInputActivityId === activity.id}>
                                <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                placeholder="Add a comment..."
                                value={newComments[activity.id]}
                                onChange={(e) => handleCommentInputChange(activity.id, e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter' && newComments[activity.id].trim()) {
                                    handleCommentSubmit(activity.id);
                                  }
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px', // Rounded corners
                                    backgroundColor: '#E2E8F0', // Light gray background color
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'transparent', // Transparent border when focused
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'transparent', // Transparent border on hover
                                    },
                                    '& fieldset': {
                                        borderColor: 'transparent', // Transparent border by default
                                    }
                                    },
                                    '& .MuiOutlinedInput-input': {
                                    padding: '10px 14px', // Custom padding for the input
                                    }
                                }}
                                />
                            </div>
                            )}

                        </div>
                    </div>
                ))}
            </div>
        </div>
        
    );
}
