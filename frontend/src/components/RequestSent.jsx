export default function RequestSent(props) {

    const  data  = props.name;
    return (
        <div className='flex flex-row my-1 justify-between'>
            <div className="font-standard text-DarkGrey text-16">
                {data}
            </div>
            <div className="flex flex-row">
            <div className="cursor-pointer px-5 text-textcolour font-standard text-16 decoration-2 truncate">
                
            </div>
            <div className="cursor-pointer text-textcolour font-standard text-16 decoration-2 truncate">
                Cancel
            </div>
            </div>
   
        </div>
    )
}
