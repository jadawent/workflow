import { Link } from "react-router-dom"
import styles from "../HomePage.module.css"
import React, {useEffect, useState} from "react";
import secureLocalStorage from "react-secure-storage";

function HomePage(){

    const [emptyUserList, setEmptyUserList] = useState(false);
    useEffect(() => {
        async function initialization(){
            const response = await fetch("http://localhost:8080/api/initialization", {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                }
            });
            const result = await response.text();
            const userList = JSON.parse(result);
            if(userList.length === 0){
                setEmptyUserList(true);
            }
            else {
                setEmptyUserList(false);
            }
        }
        initialization();
    }, [])
    return (
        <>
        <div className={styles.container}>
        <header>
            <nav className={styles.navBar}>
                {emptyUserList && (
                <Link to="/signup" className={`${styles.btn} ${styles.signUp}`}>Sign Up</Link>
                )}
                <Link to="/login" className={`${styles.btn} ${styles.login}`}>Login</Link>
            </nav>
        </header>
        <main className={styles.main}>
            <h1>WORKFLOW</h1>
            <div className={styles.titleCard}>
                <div className={styles.description}>
                    <p>Streamline the Management Process</p>
                </div>
            </div>
        </main>
        </div>
        </>
    );
}

export default HomePage;
  