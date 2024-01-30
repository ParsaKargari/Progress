import React from 'react';
import logo from './Images/Group 1.svg';
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


// this needs to be put in a env file at the end of the project for security.
const supabase = createClient(	'https://opibjtddqpdpnytgulvm.supabase.co',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9waWJqdGRkcXBkcG55dGd1bHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1MDU1MzUsImV4cCI6MjAyMjA4MTUzNX0.bzwZbig3eS8EiUof8ium4yDVIm607IlGL0xq6vaYiEU'
)
function Login() {
  return (
      <div className='flex justify-center items-center h-screen bg-primary'>
      <div className="flex flex-col justify-center bg-white p-[70px] rounded-[50px]">
        <img src={logo} className="mb-3" alt="logo"/>
{/* The Auth component is taken from supabase, it has a option to change styling*/}
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  defaultButtonText: '#727374',
                  defaultButtonBackgroundHover: ''
                },
                fontSizes: {
                  baseButtonSize: '17px',
                },
                fonts: {
                  labelFontFamily: `font-standard, ui-sans-serif, sans-serif`,
                },
                radii: {
                  borderRadiusButton: '15px',
                },
              },
            },
          }}          
          providers={['google', 'discord']}
          showLinks={['signOut']}
          onlyThirdPartyProviders={true}
          localization={{
            variables: {
              sign_in: {
                social_provider_text: 'Continue with {{provider}}',
              },
            },}}
        />
      </div>
    </div>
  );
}

export default Login;
