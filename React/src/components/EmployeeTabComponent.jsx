import SignUpComponent from "./SignUpComponent";
import styles from "../HomePage.module.css"
import signUpStyles from "../SignUpPage.module.css"
import React, {useEffect, useState} from "react";
import ReactModal from "react-modal";
import secureLocalStorage from "react-secure-storage";


function EmployeeTabComponent(){

    // USER LIST
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        async function getUserList(){
            const upwd = secureLocalStorage.getItem("auth");
            const response = await fetch("http://localhost:8080/api/user/list", {
                method: "GET", 
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic "+ upwd
                }
            });
            const result = await response.text();
            const json = JSON.parse(result);
            setUserList(json);
        }
        getUserList();
    }, []);

    // CREATE EMPLOYEE POPUP
    const [showCreateEmployeesPopup, setShowCreateEmployeesPopup] = useState(false);

    // EMPLOYEE INFO POPUP
    const [showEmployeeInfoPopup, setShowEmployeeInfoPopup] = useState(false);

    // SELECTED USER STATE
    const [selectedUser, setSelectedUser] = useState(null);

    async function deleteUser(userID){
        const url = `http://localhost:8080/api/user/${userID}`;
        if(userID == sessionStorage.getItem("ID")){
            alert("You can't delete yourself!");
        } else {
            const upwd = secureLocalStorage.getItem("auth");
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic "+ upwd
                }
            });
            if(response.ok){
                alert("User deleted!");
            } else {
                alert("Something went wrong...");
            }
            window.location.reload();
        }
    }

    return(
        <>
        <div className={styles.container}>
            <div>
            <button className={styles.createNewTaskBtn} onClick={() => {setShowCreateEmployeesPopup(true)}}>Create Employee</button>
            </div>
            <table width={"100%"}>
                <thead>
                    <tr align={"left"}>
                        <th className={styles.employeeHeader}>Employees</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.length > 0 ? userList.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td className={styles.employeeList} onClick={() => {
                                    setShowEmployeeInfoPopup(true)
                                    setSelectedUser(user);
                                }}> {user.firstName} {user.lastName} </td>
                            </tr>
                        );
                    }
                    ) : null}
                </tbody>
            </table>
        </div>
        {
            showCreateEmployeesPopup && (
                <ReactModal className={styles.popupOverlay} isOpen={showCreateEmployeesPopup}>
                    <div className={styles.popupContent}>
                        <SignUpComponent role={"Employee"} closeModal={() =>{setShowCreateEmployeesPopup(false)}} windowReload={() => {window.location.reload()}}/>
                        <button onClick={() =>{setShowCreateEmployeesPopup(false)}} className={signUpStyles.cancelBtn}>Cancel</button>
                    </div>
                </ReactModal>
            )
        }
        {
            showEmployeeInfoPopup && selectedUser && (
                <ReactModal className={styles.popupOverlay} isOpen={showEmployeeInfoPopup}>
                    <div className={signUpStyles.signUpDiv}>
                        <h2>Name: {selectedUser.firstName} {selectedUser.lastName}</h2>
                        <p>Username: {selectedUser.username}</p>
                        <p>Role: {selectedUser.userRoles[0].roleName}</p>
                        <p>Onboarding Date: {selectedUser.createdAt}</p>
                        <p>ID: {selectedUser.id}</p>
                        <button className={signUpStyles.submitBtn} onClick={() => {
                            setShowEmployeeInfoPopup(false);
                            setSelectedUser(null);
                        }}>Cancel</button>
                        <button className={[signUpStyles.submitBtn, signUpStyles.cancelBtn].join(' ')} onClick={() => {
                            setShowEmployeeInfoPopup(false);
                            setSelectedUser(null);
                            deleteUser(selectedUser.id);
                        }}>Delete</button>
                    </div>
                </ReactModal>
            )
        }
        </>
    )
};

export default EmployeeTabComponent;
