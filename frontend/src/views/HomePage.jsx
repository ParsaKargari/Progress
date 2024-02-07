import {React, useState, useEffect} from "react";
import { Outlet, useNavigate } from "react-router-dom";

/**Importing Components */
import { SmallSize } from './SmallSize.jsx'
import { MediumSize } from './MediumSize.jsx'
import { LargeSize } from './LargeSize.jsx'

export default function HomePage() {
    const [shouldRenderSmall, setShouldRenderSmall] = useState(true);
    const [shouldRenderMedium, setShouldRenderMedium] = useState(true);
    const [shouldRenderLarge, setShouldRenderLarge] = useState(true);

    useEffect(() => {

        const handleWindowResize = () => {
            console.log(window.innerWidth);
            if(window.innerWidth > 1280) {
                console.log("large");
                setShouldRenderLarge(true);
                setShouldRenderSmall(false);
                setShouldRenderMedium(false);
            }
            else if(window.innerWidth < 768) {
                console.log("small");
                setShouldRenderSmall(true);
                setShouldRenderMedium(false);
                setShouldRenderLarge(false);
            }
            else if (768 < window.innerWidth < 1280) {
                console.log("medium");
                setShouldRenderMedium(true);
                setShouldRenderSmall(false);
                setShouldRenderLarge(false);
            }
        }

        handleWindowResize();

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }

    }, []);
        

    return (
        <>
            <div>
                {shouldRenderSmall ? <SmallSize /> : null}

                {shouldRenderMedium ? <MediumSize /> : null}

                {shouldRenderLarge ? <LargeSize /> : null}

            </div>
        </>
    )
}