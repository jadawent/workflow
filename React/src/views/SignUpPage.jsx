import { Link, useNavigate } from "react-router-dom"
import styles from "../SignUpPage.module.css"

function SignUpPage(){
    const navigate = useNavigate();
    return (
        <>
            <header className={styles.header}>
                <Link to="/" className={styles.title}>WorkFlow</Link>
            </header>
            <main className={styles.main}>
                <div className={styles.signUpDiv}>
                    <p className={styles.caption}>For management only!</p>
                    <p>First Name*</p>
                    <input required id="firstName"></input>
                    <p>Last Name*</p>
                    <input id="lastName"></input>
                    <p>Username*</p>
                    <input id="username"></input>
                    <p>Password*</p>
                    <input type="password" id="password"></input>
                    <p>Confirm Password*</p>
                    <input type="password" id="confirmPassword"></input>
                    <button className={styles.btn} onClick={() => signUp(navigate)}>Sign Up</button>
                </div>
            </main>
        </>
    );
}

function doPasswordsMatch(pw, confirmPw){
    if (pw === confirmPw){
        return true;
    }
    return false;
}


function signUp(navigate){
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const user = document.getElementById("username").value;
    const pw = document.getElementById("password").value;
    const confirmPw = document.getElementById("confirmPassword").value;
    const displayResult = document.getElementById("result");
    if(allValuesFilled(firstName, lastName, user, pw, confirmPw)){
        if (doPasswordsMatch(pw, confirmPw) == true){
            createUser(firstName, lastName, user, pw, confirmPw, displayResult, navigate);
         } else {
             alert("Passwords do not match. Try again.");
         }
    } else {
        alert("Fill out each section");
    }
}

function allValuesFilled(firstName, lastName, user, pw, confirmPassword){
    // Theres GOTTA be a simpler way to do this.
    if(firstName.length == 0 || lastName.length == 0 ||
        user.length == 0 || pw.length == 0 || confirmPassword.length == 0){
        return false;
    }
    return true;
}

async function createUser(firstName, lastName, user, pw, confirmPw, displayResult, navigate){
    const url = "http://localhost:8080/api/create-user"; 
    // can change to https for secure transfer, but we will need to implement TLS/SSL in springboot too.
    const data = {
        username: user,
        password: pw,
        confirmPassword: confirmPw,
        firstName: firstName,
        lastName: lastName
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
        
        if(response.ok){
            console.log(result);
            alert("Sign up success!");
            navigate("/")
        }
        else {
            console.log(result);
            alert(result);
        }
    } catch (error) {
        console.error(error);
    }
}

export default SignUpPage;