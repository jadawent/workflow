import styles from "../SignUpPage.module.css"
import { useAuth } from '../services/AuthContext.jsx'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import secureLocalStorage from "react-secure-storage";

function SignUpComponent({initial, closeModal, windowReload}){
    const {login} = useAuth();
    const navigate = useNavigate();

    const [role, setRole] = useState("Manager");
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    function signUp(){
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const user = document.getElementById("username").value;
        const pw = document.getElementById("password").value;
        const confirmPw = document.getElementById("confirmPassword").value;
        const displayResult = document.getElementById("result");
        
        if(allValuesFilled(firstName, lastName, user, pw, confirmPw)){
            if (doPasswordsMatch(pw, confirmPw) == true){
                createUser(firstName, lastName, user, pw, confirmPw, displayResult, navigate, login, role);
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

    const isInitial = () => {
        return initial === true;
    }

    async function createUser(firstName, lastName, user, pw, confirmPw, displayResult, navigate, login, role){
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
        let response;
        try{
            response = await fetch(url , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            
            
            if(response.ok){
                const result = await response.json();
                // Auth Header
                if(secureLocalStorage.getItem('auth') == null) {
                    const upwd = btoa(unescape(encodeURIComponent(user + ":" + pw)));
                    secureLocalStorage.setItem("auth", upwd)
                }

                if(role === "Manager"){
                    alert("Manager created!");
                    login(result)
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
                const errorMessage = await response.text();
                alert(errorMessage);
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
            {!isInitial() ? 
            <>
                <p>Role:</p>
                <label>
                <input type="radio" value="Manager" checked={role === "Manager"} onChange={handleRoleChange}/>
                Manager
                </label>
                <label>
                <input type="radio" value="Employee" checked={role === "Employee"} onChange={handleRoleChange}/>
                Employee
                </label>
            </>
            : null}
                

            <button className={styles.submitBtn} onClick={signUp}>Sign Up</button>
        </>   
    )
}

export default SignUpComponent;
