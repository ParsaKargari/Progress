import { React, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/Login.css";
import { LoadingProvider, useLoading } from '../context/LoadingContext';
import axios from "axios";
import { Snackbar } from "@mui/material";



// this needs to be put in a env file at the end of the project for security.
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

function Login() {
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setIsLoading } = useLoading();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  

  useEffect(() => {
    setIsLoading(true);
  
    if (user) {
      // Use axios to fetch the username using the user ID from the backend
      axios.get(`${process.env.REACT_APP_API_URL}/signUp/${user.id}`, {withCredentials: true})
        .then(response => {
          const data = response.data;
          if (data.length > 0 && data[0].Username) {
            // If username exists, navigate to home
            navigate(`/home`);
          } else {
            // If no username, navigate to signup (assuming you need to complete the signup process)
            navigate(`/signup`);
          }
        })
        .catch(error => {
          console.error("Failed to fetch username:", error);
          setSnackbarMessage("Failed to fetch username. Please try again."); // Set the snackbar message
          setSnackbarOpen(true); // Open the snackbar
        })
        .finally(() => {
          setIsLoading(false);
        });
  
      // Store user ID and email in localStorage
      localStorage.setItem("User_ID", user.id);
      localStorage.setItem("User_Email", user.email);
    } else {
      setSpin(true);
      console.log("No user detected.");
      setIsLoading(false);
    }
  }, [user, navigate, setIsLoading]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  
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
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}

export default Login;
