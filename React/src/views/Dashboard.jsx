import React, {useEffect, useState} from "react";
import styles from "../HomePage.module.css"
import signUpStyles from "../SignUpPage.module.css"
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import ReactModal from "react-modal";
import LogoutButton from '../components/LogoutButton'
import EmployeeTabComponent from "../components/EmployeeTabComponent.jsx";

function Dashboard(){
    const [taskList, setTaskList] = useState([]);
    useEffect(() => {
        async function getTasks(){
            const response = await fetch("http://localhost:8080/api/task/list" , {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const result = await response.text();
            const json = JSON.parse(result);
            setTaskList(json)
        }
        getTasks();
    }, [])

    const [showPopup, setShowPopup] = useState(false);

    const setShowPopupTrue = () => {
        setShowPopup(true)
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleSubmit = async () => {
        createNewTask();
        closePopup();
    }

    return (
        <>
            <header>
                <nav className={styles.navBar}>
                    <LogoutButton/>
                </nav>
            </header>
            <Tabs>
                <TabList>
                    <Tab>Tasks</Tab>
                    <Tab>Manage Employees</Tab>
                </TabList>
                <TabPanel>
                    <button align={"right"} className={styles.createNewTaskBtn} onClick={setShowPopupTrue}>Create New Task</button>
                    <table width={"100%"}>
                        <thead>
                            <tr align={"left"}>
                                <th>Task Name</th>
                                <th>Task Description</th>
                                <th>Task Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskList.length > 0 ? taskList.map((task, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{task.taskName}</td>
                                        <td>{task.taskBody}</td>
                                        <td>{task.status}</td>
                                    </tr>
                                );
                            }
                            ) : null}
                        </tbody>
                    </table>
                </TabPanel>
                {showPopup && (
                    <ReactModal isOpen={showPopup}>
                        <div className={styles.popupContent}> 
                            <h2> Create New Task </h2>
                            <p className ={styles.taskName}>Task Name</p>
                            <input id="taskName" className={styles.largeInput}></input>
                            <p>Task Description</p>
                            <input id="taskBody" className={styles.largeInput}></input>
                            <div className={styles.buttonContainer}>
                                <button className={styles.btn} onClick={closePopup}>Cancel</button>
                                <button className={styles.btn} onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                        
                    </ReactModal>
                )}
                <TabPanel>
                    <EmployeeTabComponent></EmployeeTabComponent>
                </TabPanel>
            
            </Tabs>
        </>
    );
}

async function createNewTask(){
    const url ="http://localhost:8080/api/task";
    const taskName = document.getElementById("taskName");
    const desc = document.getElementById("taskBody")

    const data = {
        taskName: taskName.value,
        taskBody: desc.value
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
        alert("New Task Created!");
        navigate("Dashboard")
    }
    else{
        alert(result);
        }
    }catch (error){
    console.error(error)
    }
    window.location.reload();
}

export default Dashboard;
  