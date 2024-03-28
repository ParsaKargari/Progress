import React from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

/**
 * Component for displaying incoming friend requests.
 * @param {Object} props - Component properties.
 * @param {string} props.name - Name of the friend.
 * @param {string} props.id - ID of the friend.
 * @returns {JSX.Element} IncomingRequest component.
 */
export default function IncomingRequest(props) {
    const { name, id } = props;
    const { user } = useAuth();

    /**
     * Function to accept a friend request.
     */
    function accept() {
        axios.get(`${process.env.REACT_APP_API_URL}/friends/acceptFriend/${user.id}/${id}`)
            .catch(error => console.error("Error accepting friend request:", error));
        document.getElementById('removableIncoming').innerHTML='';
    }

    /**
     * Function to decline a friend request.
     */
    function decline() {
        axios.get(`${process.env.REACT_APP_API_URL}/friends/declineFriend/${user.id}/${id}`)
            .catch(error => console.error("Error declining friend request:", error));
        document.getElementById('removableIncoming').innerHTML='';
    }

    return (
        <div className='flex flex-row my-1 justify-between' id='removableIncoming'>
            {/* Display friend name */}
            <div className="font-standard text-DarkGrey text-16">
                {name}
            </div>
            {/* Accept and decline buttons */}
            <div className="flex flex-row">
                <div className="cursor-pointer px-5 text-textcolour font-standard text-16 decoration-2 truncate" onClick={accept}>
                    Accept
                </div>
                <div className="cursor-pointer text-textcolour font-standard text-16 decoration-2 truncate" onClick={decline}>
                    Decline
                </div>
            </div>
        </div>
    );
}
