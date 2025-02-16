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
                    <button className={styles.btn} onClick={doSomething}>Sign Up</button>
                </div>
            </main>
        </>
    );
}


async function doSomething(){
    const user = document.getElementById("username");
    const pw = document.getElementById("password");
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
    } catch (error) {
        console.log(error);
    }
}

export default SignUpPage;
  