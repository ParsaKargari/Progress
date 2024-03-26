import axios from "axios";
import { useAuth } from "../context/AuthContext";
export default function IncomingRequest(props) {
    const data = props.name;
    const id = props.id;
    const { user } = useAuth();


    function accept() {
        axios.get(`${process.env.REACT_APP_API_URL}/friends/acceptFriend/${user.id}/${id}`);

    }
    function decline() {
        axios.get(`${process.env.REACT_APP_API_URL}/friends/declineFriend/${user.id}/${id}`);

    }
    return (
        <div className='flex flex-row my-1 justify-between'>
            <div className="font-standard text-DarkGrey text-16">
                {data}
            </div>
            <div className="flex flex-row">
            <div className="cursor-pointer px-5 text-textcolour font-standard text-16 decoration-2 truncate" onClick={accept}>
                Accept
            </div>
            <div className="cursor-pointer text-textcolour font-standard text-16 decoration-2 truncate" onClick={decline}>
                Decline
            </div>
            </div>
   
        </div>
    )
}
