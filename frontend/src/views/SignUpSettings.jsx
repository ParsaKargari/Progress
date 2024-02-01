import React from "react";
import { Link, useParams } from "react-router-dom";

import "../css/Login.css";

export default function SignUpSettings() {

    return (
        <>
        <div className="flex justify-center items-center h-screen bg-primary">
            <div className="flex flex-col justify-center bg-white p-[70px] rounded-[50px]">
                {/* Container for the SVGs */}
                <div className="flex items-center space-x-0.5 pb-2">
                {" "}
                <img src={"/images/Pr.svg"} alt="Pr" />
                <img
                    src={"/images/o.svg"}
                    alt="o"
                />
                <img
                    src={"/images/gress.svg"}
                    alt="gress."
                    className="transform translate-y-3"
                />
                </div>
            </div>
        </div>
        </>
    )
}