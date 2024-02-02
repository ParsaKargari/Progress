import {React, useState, useEffect} from "react";


/**Impoerting Components */
import { FriendsBar } from './FriendsBar.jsx';
import { ActivityBar } from './ActivityBar.jsx';
import { TasksBar } from './TasksBar.jsx';

export default function HomePage() {
    const [shouldRenderTasks, setShouldRenderTasks] = useState(true);
    const [shouldRenderActivity, setShouldRenderActivity] = useState(true);

    useEffect(() => {
    const handleResizeSmall = () => {
        if (window.innerWidth < 768) {
            setShouldRenderTasks(false);
        } else {
            setShouldRenderTasks(true);
        }
        };

        handleResizeSmall();

        window.addEventListener('resize', handleResizeSmall);

        return () => {
            window.removeEventListener('resize', handleResizeSmall);
        };
    }, []); 

    useEffect(() => {
        const handleResizeMedium = () => {
            if(window.innerWidth < 1280) {
                setShouldRenderActivity(false);
            }
            else {
                setShouldRenderActivity(true);
            }
        }

        handleResizeMedium();

        window.addEventListener('resize', handleResizeMedium);

        return () => {
            window.removeEventListener('resize', handleResizeMedium);
        };

    }, []);
        

    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-6 xl:grid-cols-11 xl:visible flex-cols h-screen bg-primary max-h-screen overflow-clip">
                <FriendsBar 

                />

                {shouldRenderTasks ? <TasksBar /> : null}


                {shouldRenderActivity ? <ActivityBar /> : null}
            </div>
        </>
    )
}