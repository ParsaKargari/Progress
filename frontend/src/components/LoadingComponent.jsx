import React from 'react';
import '../css/Login.css';

function LoadingComponent() {
    return (
      <div className="flex justify-center items-center h-screen bg-primary fixed top-0 left-0 w-full h-full z-50">
        <img
          src="/images/o.svg" // Update the path to your logo accordingly
          className="logo-spin-twice"
          alt="Loading..."
        />
      </div>
    );
  }

export default LoadingComponent;