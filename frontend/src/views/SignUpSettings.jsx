import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {useNavigate } from "react-router-dom";

import "../css/Login.css";

export default function SignUpSettings() {
    const [spin, setSpin] = useState(false);
    const navigation = useNavigate();

    useEffect(() => {
        setSpin(true);
    }, []);

    function SignUp() {
        var userName = document.getElementById("inline-first-name").value;
        var status = document.getElementById("inline-status").value;
        if (userName === "" || status === "") {
            alert("Please fill out all fields!");
            return;
        }
        else {
            navigation(`/home`, {replace : true})
        }
    }



    return (
        <>
        <div className="flex justify-center items-center h-screen bg-primary">
            <div className="flex flex-col justify-center bg-white p-[70px] rounded-[50px]">
                <div className="flex flex-col justify-center items-center">

                    {/* Container for the SVGs */}
                    <div className="flex items-center space-x-0.5 pb-8">
                        {" "}
                        <img src={"/images/Pr.svg"} alt="Pr" />
                        <img
                            src={"/images/o.svg"}
                            alt="o"
                            className={`transform ${
                            spin ? "logo-spin-twice" : ""
                            }`}
                        />
                        <img
                            src={"/images/gress.svg"}
                            alt="gress."
                            className="transform translate-y-3"
                        />
                    </div>
                    
                </div>

                <form class="w-full max-w-sm">
                    <div class="flex flex-col">
                        <div class="md:flex md:items-center mb-4 flex-1">
                            <div class="flex-1">
                                <input class="hover:transition-colors hover:ease-in-out min-h-12 rounded-full bg-InputBox appearance-none hover:border-2 focus:border-2 w-full py-2 px-4 font-standard italic text-gray-700 leading-tight focus:outline-none focus:bg-white hover:border-Selected focus:border-Selected" id="inline-first-name" type="text" placeholder="Enter a username"/>
                            </div>
                        </div>

                        <div class="flex md:items-center mb-6 flex-1">
                            <div class="flex-1">
                                <input class="hover:transition-colors hover:ease-in-out hover:duration-300 min-h-12 rounded-full font-standard italic bg-InputBox appearance-none hover:border-2 focus:border-2 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white hover:border-Selected focus:border-Selected" id="inline-status" type="text" placeholder="Enter a status" />
                            </div>
                        </div>

                        

                        <div class="flex flex-1 justify-center">
                            <button class="border border-[#D3D3D3] min-h-12 min-w-20 rounded-full bg-white focus:shadow-outline focus:outline-none font-standard text-gray-800 font-bold py-2 px-4 " type="button" onClick={SignUp}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}