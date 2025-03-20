import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from "../LoginPage.module.css"
import { useAuth } from './AuthContext.jsx'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')

        const loginData = {
            username,
            password
        }

        try {
            const response = await axios.post('http://localhost:8080/api/login', loginData);
            if (response.status === 200) {
                login();
                localStorage.setItem("ID", response.data);
                navigate('/dashboard')
            } else {
                const errorData = await response.json()
                setError(errorData.message || 'Login failed for user. Please retry!')
            }
        } catch(error) {
                    setError('And error occurred. please retry')
       }
    }

    return (
            <>
                <header className={styles.header}>
                    <Link to="/" className={styles.title}>WorkFlow</Link>
                </header>
                <main className={styles.main}>
                    <div className={styles.loginDiv}>
                        <p className={styles.caption}>Login</p>
                        <p className={styles.username}>Username</p>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <p>Password</p>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button className={styles.btn} onClick={handleLogin}>Login</button>
                        <p className={styles.caption} id="result"></p>
                    </div>
                </main>
            </>
      );
}

