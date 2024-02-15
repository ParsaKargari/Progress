  import React, { StrictMode } from 'react';
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import ReactDOM from 'react-dom/client';
  import './index.css';
  // require('dotenv').config()

  // Importing Components
  import Login from './views/Login';
  import SignUpSettings from './views/SignUpSettings';
  import reportWebVitals from './tests/reportWebVitals';
  import HomePage from './views/HomePage';
  import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
  import ProtectedRoute from './components/ProtectedRoute';
  import { useAuth } from './context/AuthContext';

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
      <AuthProvider> {/* Wrap your application with AuthProvider */}
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} ></Route>
            <Route path="/signup" element={
            <ProtectedRoute>
              <SignUpSettings />
            </ProtectedRoute>
            } ></Route>
            <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );


  reportWebVitals();