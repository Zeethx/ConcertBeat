import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth';
import '../Home/Home.css';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        if (window.location.pathname !== '/'){
            return <Navigate to="/" />;
        }
        else{
            return <div className='login-error'>Login required</div>;
        }
        


    }

    return children;
};

export default ProtectedRoute;