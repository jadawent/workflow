import styles from "../SignUpPage.module.css"
import { useAuth } from '../components/AuthContext.jsx'
import { useNavigate } from "react-router-dom"
import secureLocalStorage from "react-secure-storage";

function SignUpComponent({role, closeModal, windowReload}){
    const {login} = useAuth();
    const navigate = useNavigate();
    function signUp(){
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const user = document.getElementById("username").value;
        const pw = document.getElementById("password").value;
        const confirmPw = document.getElementById("confirmPassword").value;
        const displayResult = document.getElementById("result");
        
        if(allValuesFilled(firstName, lastName, user, pw, confirmPw)){
            if (doPasswordsMatch(pw, confirmPw) == true){
                createUser(firstName, lastName, user, pw, confirmPw, displayResult, navigate, login);
             } else {
                 alert("Passwords do not match. Try again.");
             }
        } else {
            alert("Fill out each section");
        }
    } 


    function doPasswordsMatch(pw, confirmPw){
        if (pw === confirmPw){
            return true;
        }
        return false;
    }

    function allValuesFilled(firstName, lastName, user, pw, confirmPassword){
        // Theres GOTTA be a simpler way to do this.
        if(firstName.length == 0 || lastName.length == 0 ||
            user.length == 0 || pw.length == 0 || confirmPassword.length == 0){
            return false;
        }
        return true;
    }

    async function createUser(firstName, lastName, user, pw, confirmPw, displayResult, navigate, login){
        const upwd = secureLocalStorage.getItem("auth");
        const url = "http://localhost:8080/api/create-user"; 
        // can change to https for secure transfer, but we will need to implement TLS/SSL in springboot too.
        const data = {
            username: user,
            password: pw,
            confirmPassword: confirmPw,
            firstName: firstName,
            lastName: lastName,
            userRoles: [{
                roleName: role
            }]
        }
        try{
            const response = await fetch(url , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic "+ upwd
                },
                body: JSON.stringify(data)
            });
            const result = await response.text();
            
            if(response.ok){
                if(role === "Manager"){
                    alert("Sign up success!");
                    localStorage.setItem("ID", result)
                    login();
                    navigate('/dashboard')
                } else {
                    alert("Employee created!");
                }
                if(closeModal){
                    closeModal();
                }
                if(windowReload){
                    windowReload();
                }
            }
            else {
                alert(result);
            }
            }catch (error) {
                console.error(error);
        }
    }
    return (
        <>
            <p className={styles.caption}>For management only!</p>
            <p>First Name*</p>
            <input id="firstName"></input>
            <p>Last Name*</p>
            <input id="lastName"></input>
            <p>Username*</p>
            <input id="username"></input>
            <p>Password*</p>
            <input type="password" id="password"></input>
            <p>Confirm Password*</p>
            <input type="password" id="confirmPassword"></input>
            <button className={styles.btn} onClick={signUp}>Sign Up</button>
        </>   
    )
}

export default SignUpComponent;
