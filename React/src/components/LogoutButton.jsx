import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from "../LogoutButton.module.css"
import { useAuth } from './AuthContext.jsx'

function Logout() {

    const {logout} = useAuth();

    const handleLogout = async (e) => {
        logout();
        navigate('/login')
    }

    return (
        <div className={styles.logoutDiv}>
            <button className={styles.btn} onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;