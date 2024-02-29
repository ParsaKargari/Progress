import { React, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/Login.css";

// this needs to be put in a env file at the end of the project for security.
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);



function Login() {
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user === null) {
      console.log("user is null")
    }
    else {
      localStorage.setItem("User_ID", user.id)
      localStorage.setItem("User_Email", user.email)
    }
    
    if (user) {
      navigate(`/signup`);
    } else {
      setSpin(true);
    }
  }, [user, navigate]);
    

  
  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="flex flex-col justify-center bg-white p-[70px] rounded-[50px]">
        {/* Container for the SVGs */}
        <div className="flex items-center space-x-0.5 pb-2">
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

        {/* The Auth component is taken from supabase, it has a option to change styling*/}
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  defaultButtonText: "#727374",
                  defaultButtonBackgroundHover: "",
                },
                fontSizes: {
                  baseButtonSize: "17px",
                },
                fonts: {
                  labelFontFamily: `font-standard, ui-sans-serif, sans-serif`,
                },
                radii: {
                  borderRadiusButton: "15px",
                },
              },
            },
          }}
          providers={["google", "discord"]}
          showLinks={["signOut"]}
          onlyThirdPartyProviders={true}
          localization={{
            variables: {
              sign_in: {
                social_provider_text: "Continue with {{provider}}",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Login;
