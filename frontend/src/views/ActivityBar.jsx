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
    const [hoveredActivityId, setHoveredActivityId] = useState(null);
    const [activities, setActivities] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentActivityIdForReaction, setCurrentActivityIdForReaction] = useState(null);
    const [commentInputActivityId, setCommentInputActivityId] = useState(null);
    const [AllComments, setAllComments] = useState([]);
    const [AllReactions, setAllReactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState(''); 
    const availableEmojis = ['👍', '❤️', '😂', '🎉', '😢', '🔥'];

    const { user } = useAuth();
    console.log("User: ", user);
    const user_id = user.id;

    const fetchActivities = async (userId) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/activity/getFriendsActivity?user_id=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      };
      
      const fetchAllComments = async (userId) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/activity/getAllComments?user_id=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      };
      
      const fetchAllReactions = async (userId) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/activity/getAllReactions?user_id=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      };
      
      const fetchSettings = async (userId) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/settings/getSettings?user_id=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      };

      useEffect(() => {
        const userId = user.id;
        setIsLoading(true);
      
        (async () => {
          try {
            const activities = await fetchActivities(userId);
            console.log("All Tasks", activities);
            // only set the activities with completionstatus = true, and PublicVisibility = true

            setActivities(activities.filter(activity => activity.CompletionStatus === true && activity.PublicVisibility === true));
      
            const comments = await fetchAllComments(userId);
            console.log("All Comments", comments);
            // Assume setAllComments is a state setter function you have defined
            setAllComments(comments);
      
            const reactions = await fetchAllReactions(userId);
            console.log("All Reactions", reactions);
            setAllReactions(reactions);
      
            const settings = await fetchSettings(userId);
            console.log("Settings", settings);
            // Assuming setUsername is a state setter function for updating username
            setUsername(settings[0]?.Username || "UsernameNotFound");
      
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setIsLoading(false);
          }
        })();
      
      }, []);
      
      


    const [newComments, setNewComments] = useState(activities.reduce((acc, activity) => {
        acc[activity.id] = '';
        return acc;
      }, {}));

    const handleCommentInputChange = (activityId, text) => {
        setNewComments({
          ...newComments,
          [activityId]: text,
        });
    };

    const handleCommentSubmit = async (activityId) => {
        const commentText = newComments[activityId].trim();
        if (commentText) {
            console.log(`Comment on activity ${activityId}:`, commentText);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/activity/postComment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: user_id,
                        task_id: activityId,
                        comment: commentText,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                setNewComments({
                    ...newComments,
                    [activityId]: '',
                });
                // fetch the comments again to update the UI
                const comments = await fetchAllComments(user_id);
                setAllComments(comments);
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        }
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
    const handleReactionClick = async (activityId, emoji) => {
        try {
            // convert emoji to string
            const response = await fetch(`${process.env.REACT_APP_API_URL}/activity/postReaction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any authentication headers if needed
                },
                body: JSON.stringify({
                    task_id: activityId,
                    user_id: user_id,
                    reaction: emoji,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Update the local state to reflect the new reaction
            // This is a simplified way; you might need to adjust based on your state structure
            const updatedActivities = activities.map(activity => {
                if (activity.id === activityId) {
                    // Simplified reaction update logic
                    const newReaction = { emoji, by: user.username }; // Adjust as needed
                    activity.reactions = [...(activity.reactions || []), newReaction];
                }
                return activity;
            });
            setActivities(updatedActivities);

            // fetch the reactions again to update the UI
            const reactions = await fetchAllReactions(user_id);
            setAllReactions(reactions);
    
            console.log("Reaction posted successfully");
        } catch (error) {
            console.error('Error posting reaction:', error);
        }
    };
    
    if (isLoading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <img
              src="/images/o.svg"
              alt="Loading..."
              className="logo-spin-twice" // This class applies the animation
            />
          </div>
        );
      }

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
                            {AllReactions && Object.entries(AllReactions.filter(reaction => reaction.task_id === activity.id)
                                .reduce((acc, { reaction_content, username_reacted }) => {
                                    if (!acc[reaction_content]) acc[reaction_content] = [];
                                    acc[reaction_content].push(username_reacted);
                                    return acc;
                                }, {}))
                                .map(([emoji, byArray]) => (
                                    <Tooltip key={emoji} title={byArray.join(', ')}>
                                    <Chip
                                        style={{
                                        marginRight: '5px',
                                        backgroundColor: byArray.includes(username) ? '#ADD8E6' : undefined, // Corrected to user.username
                                        }}
                                        icon={<span>{emoji}</span>}
                                        onClick={() => handleReactionClick(activity.id, emoji)}
                                        label={byArray.length}
                                    />
                                    </Tooltip>
                                ))}

                            </div>
                            {/* {activity && activity.comments && activity.comments.map((comment, index) => (
                                <div key={index} className="flex items-center mb-2 ml-6 pr-16">
                                    <div className="ml-2 text-text2 font-regular">
                                        <span className='font-semibold'>{comment[0]}</span> {comment[1]}</div>
                                </div>
                            ))} */}
                            {AllComments && AllComments
                            .filter(comment => comment.TaskID === activity.id)
                            .map((comment, index) => (
                                <div key={index} className="flex items-center mb-2 ml-6 pr-16">
                                    <div className="ml-2 text-text2 font-regular">
                                        <span className='font-semibold'>{comment.Username}</span> {comment.CommentText}
                                    </div>
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
