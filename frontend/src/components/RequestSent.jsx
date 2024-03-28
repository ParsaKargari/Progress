import React from 'react';
import axios from "axios";
import { useAuth } from "../context/AuthContext";

/**
 * Component for displaying friend requests sent by the user.
 * @param {Object} props - Props containing the name and id of the request.
 * @returns {JSX.Element} RequestSent component.
 */
export default function RequestSent(props) {
    const { name, id } = props;
    const { user } = useAuth();

    /**
     * Function to cancel a friend request.
     */
    function cancel() {
        axios.get(`${process.env.REACT_APP_API_URL}/friends/declineFriend/${id}/${user.id}`)
            .catch();
        document.getElementById('removable').innerHTML='';
    }

    return (
        <div className='flex flex-row my-1 justify-between' id='removable'>
            <div className="font-standard text-DarkGrey text-16">
                {name}
            </div>
            <div className="flex flex-row">
                <div className="cursor-pointer px-5 text-textcolour font-standard text-16 decoration-2 truncate"></div>
                <div className="cursor-pointer text-textcolour font-standard text-16 decoration-2 truncate" onClick={cancel}>
                    Cancel
                </div>
            </div>
        </div>
    );
}
