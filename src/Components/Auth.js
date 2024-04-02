import React, { createContext, useContext, useState } from 'react';

const Auth = createContext();

export const useAuth = () => useContext(Auth);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('refreshToken');
        return token ? true : false;
    });

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
    }

    return (
        <Auth.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </Auth.Provider>
    );
};
