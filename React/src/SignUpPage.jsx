import { Link } from "react-router-dom"
import styles from "./SignUpPage.module.css"

function SignUpPage(){
    return (
        <>
            <header className={styles.header}>
                <Link to="/" className={styles.title}>WorkFlow</Link>
            </header>
            <main className={styles.main}>
                <div className={styles.signUpDiv}>
                    <p className={styles.caption}>For management only!</p>
                    <p className={styles.username}>Username</p>
                    <input id="username"></input>
                    <p>Password</p>
                    <input type="password" id="password"></input>
                    <button className={styles.btn} onClick={createUser}>Sign Up</button>
                    <p className={styles.caption} id="result"></p>
                </div>
            </main>
        </>
    );
}


async function createUser(){
    const user = document.getElementById("username");
    const pw = document.getElementById("password");
    const displayResult = document.getElementById("result");
    const url = "http://localhost:8080/api/create-user"; 
    // can change to https for secure transfer, but we will need to implement TLS/SSL in springboot too.
    const data = {
        username: user.value,
        password: pw.value,
        firstName: "Lady",
        lastName: "Gaga"
    }
    try{
        const response = await fetch(url , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.text();
        
        if (!response.ok){
            console.log(result);
            displayResult.innerText = "Sign up failed.";
            throw new Error(result);
        }
        console.log("User created:", result);
        displayResult.innerText = "Sign up success!";
    } catch (error) {
        console.error(error);
    }
}

export default SignUpPage;
  