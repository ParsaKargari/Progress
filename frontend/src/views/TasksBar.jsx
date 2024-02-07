import { React, useState, useEffect } from 'react';

export function TasksBar () {

    return (
        <>
        <div className="col-span-10 md:col-span-8 xl:col-span-4 bg-red-300 overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar flex flex-rows">
            <div className="flex flex-col flex-1 bg-slate-600">
                {/**Create Task Bar */}
                <div className="flex flex-cols h-1/6 bg-cyan-300 justify-center items-center">
                    <input class="flex-1 m-3 hover:transition-colors hover:ease-in-out hover:duration-300 min-h-12 rounded-lg font-standard italic bg-InputBox appearance-none py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white " id="inline-status" type="text" placeholder="New Task Title" />
                    <button className="m-3 btn btn-circle bg-InputBox w-12 h-12 rounded-full">
                        
                    </button>
                </div>

                {/**Main Show Tasks Section */}
                <div className="h-5/6 bg-red-600">

                    <p>TASKS</p>

                </div>
            </div>
        </div>

        </>
    )
}






// import { React, useState, useEffect } from 'react';

// import { ActivityBar } from './ActivityBar';

// export function TasksBar () {
//     const [shouldDisplayActivity, setShouldDisplayActivity] = useState(false)
//     const [shouldSwitchActivity, setShouldSwitchActivity] = useState(true)

//     useEffect(() => {
//         const handleDisplayActivity = () => {
//             if(window.innerWidth < 1280) {
//                 setShouldDisplayActivity(true);
//             }
//             else {
//                 setShouldDisplayActivity(false);
//             }
//         }

//         handleDisplayActivity();

//         window.addEventListener('resize', handleDisplayActivity);

//         return () => {
//             window.removeEventListener('resize', handleDisplayActivity);
//         };

//     }, []);

//     const switchDisplay = () => {
//         if(shouldDisplayActivity) {
//             setShouldSwitchActivity(false);
//         }
//         else {
//             setShouldSwitchActivity(true);
//         }
        
//     }


//     return (
//         <>

//         <div className="md:col-span-4 xl:col-span-4 bg-red-300 overflow-y-auto overflow-x-hidden h-screen max-h-screen no-scrollbar flex flex-rows">
//         { shouldSwitchActivity ? (
//             <>
//             <div className="flex flex-col flex-1 bg-slate-600">
//                 {/**Create Task Bar */}
//                 <div className="flex flex-cols h-1/6 bg-cyan-300 justify-center items-center">
//                     <input class="flex-1 m-3 hover:transition-colors hover:ease-in-out hover:duration-300 min-h-12 rounded-lg font-standard italic bg-InputBox appearance-none py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white " id="inline-status" type="text" placeholder="New Task Title" />
//                     <button className="m-3 btn btn-circle bg-InputBox w-12 h-12 rounded-full">
                        
//                     </button>
//                 </div>

//                 {/**Main Show Tasks Section */}
//                 <div className="h-5/6 bg-red-600 min-w-10 min-h-10">

//                     <p>TASKS</p>

//                 </div>
//             </div>
//             </>
//         ) : (
//             <>
//                 <ActivityBar/>
//             </>
//         )}



//             {shouldDisplayActivity ? (
//                 <>
//                 {/**For arrow when screen is small */}
//                 <div className=" bg-green-900 w-1/12 flex" id='mediumActivity'>
//                     <button id="ActivityMenuButton" className="m-3 btn btn-circle bg-InputBox w-12 h-12 rounded-full" onClick={switchDisplay()}>
//                     </button>
//                 </div>
//                 </>
//             ) : (
//                 <></>
//             )}

//         </div>

//         </>
//     )
// }