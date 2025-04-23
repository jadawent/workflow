import React, { createContext, useContext, useState } from 'react'
import secureLocalStorage from "react-secure-storage";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('isAuthenticated') === 'true'
    })

    const login = ( loginResponse ) => {
        setIsAuthenticated(true)
        sessionStorage.setItem('isAuthenticated', true)
        sessionStorage.setItem('ID', loginResponse.id);
        sessionStorage.setItem('ROLE', loginResponse.userRoles)
    }

    const logout = () => {
        setIsAuthenticated(false)
        sessionStorage.clear()
        secureLocalStorage.clear()
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}
