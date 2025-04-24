import React, {useState} from 'react'
import styles from "../PasswordReset.module.css"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../services/AuthContext.jsx'
import secureLocalStorage from "react-secure-storage";

function PasswordReset() {

    const [user, setUsername] = useState('');
    const [pass, setPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const navigate = useNavigate();
    const {logout} = useAuth();

    function resetPassword() {

        if(allValuesFilled()) {
            if(doPasswordsMatch()) {
                handleReset()
            } else {
                alert("Passwords do not match.")
            }
        } else {
            alert("All values must be filled.")
        }
    }

    const handleReset = async (e) => {

        const url = "http://localhost:8080/api/user/reset-password"
        const resetData = {
            username: user,
            password: pass
        }

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + secureLocalStorage.getItem("auth")
                },
                body: JSON.stringify(resetData)
            });
            const result = await response.json();

            if(response.ok) {
                console.log("MADE IT HERE")
                alert("Password reset successfully.")
                logout()
                navigate('/login')
            } else {
                alert(result);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function allValuesFilled() {
        if(user.length == 0 || pass.length == 0 || passwordMatch.length == 0) {
            return false
        }
        return true
    }

    function doPasswordsMatch() {
        if (pass === passwordMatch) {
            return true
        }
        return false
    }

    return (
        <>
            <main className={styles.main}>
                <div className={styles.signUpDiv}>
                    <p className={styles.caption}>Reset Your Password!</p>
                    <p className={styles.username}>Username</p>
                    <input type="text" className={styles.input} value={user} onChange={(e) => setUsername(e.target.value)} />
                    <p>Password</p>
                    <input type="password" className={styles.input} value={pass} onChange={(e) => setPassword(e.target.value)} />
                    <p>Re-type Password</p>
                    <input type="password" className={styles.input} value={passwordMatch} onChange={(e) => setPasswordMatch(e.target.value)} />
                    <button className={styles.btn} onClick={resetPassword}>Reset</button>
                    <p className={styles.caption} id="result"></p>
                </div>
            </main>
        </>
    );
}

export default PasswordReset