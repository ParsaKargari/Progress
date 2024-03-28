import React from 'react';
import '../css/Login.css';

/**
 * Component for displaying a loading indicator.
 * @returns {JSX.Element} LoadingComponent component.
 */
function LoadingComponent() {
    return (
      <div className="flex justify-center items-center h-screen bg-primary fixed top-0 left-0 w-full h-full z-50">
        {/* Loading animation or logo */}
        <img
          src="/images/o.svg" // Update the path to your logo accordingly
          className="logo-spin-twice"
          alt="Loading..."
        />
      </div>
    );
  }

export default LoadingComponent;
