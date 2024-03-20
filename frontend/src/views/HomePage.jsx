import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SmallSize } from './SmallSize.jsx';
import { MediumSize } from './MediumSize.jsx';
import { LargeSize } from './LargeSize.jsx';

// Utility function for debouncing
function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export default function HomePage() {
    const [shouldRenderSmall, setShouldRenderSmall] = useState(false);
    const [shouldRenderMedium, setShouldRenderMedium] = useState(false);
    const [shouldRenderLarge, setShouldRenderLarge] = useState(false);

    useEffect(() => {
        const handleWindowResize = debounce(() => {
            if (window.innerWidth >= 1280) {
                setShouldRenderLarge(true);
                setShouldRenderSmall(false);
                setShouldRenderMedium(false);
            } else if (window.innerWidth < 768) {
                setShouldRenderSmall(true);
                setShouldRenderMedium(false);
                setShouldRenderLarge(false);
            } else {
                setShouldRenderMedium(true);
                setShouldRenderSmall(false);
                setShouldRenderLarge(false);
            }
        });

        handleWindowResize();

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    }, []);

    return (
        <>
            <div>
                {shouldRenderSmall && <SmallSize />}
                {shouldRenderMedium && <MediumSize />}
                {shouldRenderLarge && <LargeSize />}
            </div>
        </>
    );
}
