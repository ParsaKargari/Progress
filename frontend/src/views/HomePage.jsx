import {React, useState, useEffect} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';


/**Importing Components */
import { SmallSize } from './SmallSize.jsx'
import { MediumSize } from './MediumSize.jsx'
import { LargeSize } from './LargeSize.jsx'

const supabase = createClient(
    "https://opibjtddqpdpnytgulvm.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9waWJqdGRkcXBkcG55dGd1bHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1MDU1MzUsImV4cCI6MjAyMjA4MTUzNX0.bzwZbig3eS8EiUof8ium4yDVIm607IlGL0xq6vaYiEU"
  );


  let searchedText = "Stark"
/**
 * maybe concatenate more columns?
 */
async function searchUserName(){
    searchedText = searchedText.split(" ")
    let { data, error } = await supabase
    .rpc('fullname', {
    }).select()
    .textSearch('fullname', searchedText[0] + " or " + searchedText[1], {
        type: 'websearch',
        config: 'english',
    })
    if (error) console.error(error)
    else console.log(data)

}

let tableName = "Users"

let columnName = "FirstName"
let columnValue = "Tony Stark".split(" ")
async function searchCell(){
    searchedText = searchedText.split(" ")
    let { data, error } = await supabase
    .from("Users")
    .select("*").textSearch("Users", searchedText[0] + " or " + searchedText[1], {
        type: 'websearch',
        config: 'english',
    })
    // .match({ [columnName]: [columnValue[0]] });
    // console.log(data)
}


export default function HomePage() {
    const [shouldRenderSmall, setShouldRenderSmall] = useState(true);
    const [shouldRenderMedium, setShouldRenderMedium] = useState(true);
    const [shouldRenderLarge, setShouldRenderLarge] = useState(true);

    useEffect(() => {

        const handleWindowResize = () => {
            if(window.innerWidth > 1280) {
                setShouldRenderLarge(true);
                setShouldRenderSmall(false);
                setShouldRenderMedium(false);
            }
            else if(window.innerWidth < 768) {
                setShouldRenderSmall(true);
                setShouldRenderMedium(false);
                setShouldRenderLarge(false);
            }
            else if (768 < window.innerWidth < 1280) {
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
            
            <button onClick={searchCell} >search cell </button>
            <button onClick={searchUserName} >search User</button>
                {shouldRenderSmall ? <SmallSize /> : null}

                {shouldRenderMedium ? <MediumSize /> : null}

                {shouldRenderLarge ? <LargeSize /> : null}

            </div>
        </>
    )
}