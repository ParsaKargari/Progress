import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './views/Login';
import SignUpSettings from './views/SignUpSettings';
import HomePage from './views/HomePage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingScreen from './components/LoadingComponent'; // Import LoadingScreen
import { LoadingProvider, useLoading } from './context/LoadingContext'; // Import LoadingProvider and useLoading hook
import reportWebVitals from './tests/reportWebVitals';
import { TasksProvider } from './context/TasksContext';

const App = () => {
  const { isLoading } = useLoading(); // Use the loading state

  return (
    <>
      {isLoading && <LoadingScreen />}
      <BrowserRouter>
        <TasksProvider>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/signup" element={
              <ProtectedRoute>
                <SignUpSettings />
              </ProtectedRoute>
            } />
            <Route path="/home" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }/>
          </Routes>
        </TasksProvider>
      </BrowserRouter>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <LoadingProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LoadingProvider>
);

reportWebVitals();
