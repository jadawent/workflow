import SignUpComponent from "./SignUpComponent";
import styles from "../HomePage.module.css"
import signUpStyles from "../SignUpPage.module.css"
import React, {useEffect, useState} from "react";
import ReactModal from "react-modal";

function EmployeeTabComponent(){

    // USER LIST
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        async function getUserList(){
            const response = await fetch("http://localhost:8080/api/user/list", {
                method: "GET", 
                headers: {
                        "Content-Type": "application/json"
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

    return(
        <>
        <button className={styles.createNewTaskBtn} onClick={() => {setShowCreateEmployeesPopup(true)}}>Create Employee</button>
        <table width={"100%"}>
            <thead>
                <tr align={"left"}>
                    <th>Employees</th>
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
        {
            showCreateEmployeesPopup && (
                <ReactModal isOpen={showCreateEmployeesPopup}>
                    <div className={signUpStyles.signUpDiv}>
                        <SignUpComponent role={"Employee"} closeModal={() =>{setShowCreateEmployeesPopup(false)}} windowReload={() => {window.location.reload()}}/>
                        <button className={signUpStyles.btn} onClick={() =>{setShowCreateEmployeesPopup(false)}}>Cancel</button>
                    </div>
                </ReactModal>
            )
        }
        {
            showEmployeeInfoPopup && selectedUser && (
                <ReactModal isOpen={showEmployeeInfoPopup}>
                    <div className={signUpStyles.signUpDiv}>
                        <h2>Name: {selectedUser.firstName} {selectedUser.lastName}</h2>
                        <p>Username: {selectedUser.username}</p>
                        <p>Role: {selectedUser.userRoles[0].roleName}</p>
                        <p>Onboarding Date: {selectedUser.createdAt}</p>
                        <button className={signUpStyles.btn} onClick={() => {
                            setShowEmployeeInfoPopup(false);
                            setSelectedUser(null);
                        }}>Cancel</button>
                    </div>
                </ReactModal>
            )
        }
        </>
    )
};

export default EmployeeTabComponent;
