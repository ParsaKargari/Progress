import axios from "axios";
import { useAuth } from "../context/AuthContext";
export default function RequestSent(props) {

    const  data  = props.name;
    const id = props.id;
    const {user} = useAuth();
    function cancel() {
        axios.get(`${process.env.REACT_APP_API_URL}/friends/declineFriend/${id}/${user.id}`)
        .catch();
        document.getElementById('removable').innerHTML='';
    }
    return (
        <div className='flex flex-row my-1 justify-between' id='removable'>
            <div className="font-standard text-DarkGrey text-16">
                {data}
            </div>
            <div className="flex flex-row">
            <div className="cursor-pointer px-5 text-textcolour font-standard text-16 decoration-2 truncate">
                
            </div>
            <div className="cursor-pointer text-textcolour font-standard text-16 decoration-2 truncate" onClick={cancel}>
                Cancel
            </div>
            </div>
   
        </div>
    )
}
