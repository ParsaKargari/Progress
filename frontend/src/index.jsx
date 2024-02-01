import React, { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';

// Importing Components
import Login from './views/Login';
import SignUpSettings from './views/SignUpSettings';
import reportWebVitals from './tests/reportWebVitals';
import HomePage from './views/HomePage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <Login />
  // </React.StrictMode>
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} ></Route>
        <Route path="/signup" element={<SignUpSettings />} ></Route>
        <Route path="/home" element={<HomePage />} ></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
