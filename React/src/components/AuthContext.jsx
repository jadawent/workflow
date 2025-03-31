import React, { createContext, useContext, useState } from 'react'

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
    }

    const isManager = () => {
        return sessionStorage.ROLE === "Manager"
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}