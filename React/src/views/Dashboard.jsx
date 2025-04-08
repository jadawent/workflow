import React, {useEffect, useState} from "react";
import styles from "../Dashboard.module.css"
import signUpStyles from "../SignUpPage.module.css"
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import ReactModal from "react-modal";
import LogoutButton from '../components/LogoutButton'
import secureLocalStorage from "react-secure-storage";
import EmployeeTabComponent from "../components/EmployeeTabComponent.jsx";
import ShiftNotesComponent from "../components/ShiftNotesComponent.jsx";

function Dashboard(){
    const [taskList, setTaskList] = useState([]);
    useEffect(() => {
        async function getTasks(){
            const upwd = secureLocalStorage.getItem("auth");
            const response = await fetch("http://localhost:8080/api/task/list" , {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic "+ upwd
                },
            });
            const result = await response.text();
            const json = JSON.parse(result);
            setTaskList(json)
        }
        getTasks();
    }, [])

    const [showPopup, setShowPopup] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

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


    const [showTaskDetails, setShowTaskDetails] = useState(false);

    const setShowTaskDetailsTrue = (task) => {
        setShowTaskDetails(true);
        setSelectedTask(task);
    }

    const closeTaskDetails = () => {
        setShowTaskDetails(false);
    }

    const handleCloseTask = () => {
        closeTaskDetails();
        setSelectedTask(null);
    }

    const handleUpdateTask = () => {
        updateTask(task);
        closeTaskDetails();
    }

    const [selectedTab]  = useState(() => {
        return sessionStorage.getItem("selectedTab") || 0;
    });

    const handleSelect = (index, lastIndex, event) => {
        sessionStorage.setItem("selectedTab", index);
    }

    const isManager = () => {
        return sessionStorage.ROLE === "Manager"
    }

    return (
        <>
            <header>
                <nav className={styles.navBar}>
                    <LogoutButton/>
                </nav>
            </header>
            <Tabs defaultIndex={selectedTab} onSelect={handleSelect}>
                <TabList>
                    <Tab>Tasks</Tab>
                    {isManager() ? <Tab>Manage Employees</Tab> : null}
                    <Tab>Shift Notes</Tab>
                </TabList>

                <TabPanel>
                    <div className={styles.buttonContainer}>
                      {isManager() ? <button align={"right"} className={styles.createNewTaskBtn} onClick={setShowPopupTrue}>Create New Task</button> : null }
                    </div>
                    <div className={styles.swimlaneContainer}>
                        <div className={styles.swimlane}>
                            <h3> TO DO </h3>
                            <p>
                                {taskList.length > 0 ? taskList.filter((task) => task.status == "TO_DO").map((task, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <button
                                                    className={styles.taskListBtn} onClick={() => setShowTaskDetailsTrue(task)} >{task.taskName}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }) : null}
                            </p>
                        </div>
                        <div className={styles.swimlane}>
                            <h3> IN PROGRESS </h3>
                            <p>
                            {taskList.length > 0 ? taskList.filter((task) => task.status == "IN_PROGRESS").map((task, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                        <button
                                            className={styles.taskListBtn} onClick={() => setShowTaskDetailsTrue(task)} >{task.taskName}
                                        </button>
                                        </td>
                                    </tr>
                                    );
                                }
                                ) : null}
                            </p>
                        </div>
                        <div className={styles.swimlane}>
                            <h3> COMPLETE </h3>
                            <p>
                            {taskList.length > 0 ? taskList.filter((task) => task.status == "COMPLETE").map((task, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                        <button
                                            className={styles.taskListBtn} onClick={() => setShowTaskDetailsTrue(task)} >{task.taskName}
                                        </button>
                                        </td>
                                    </tr>
                                    );
                                }
                                ) : null}
                            </p>
                        </div>
                    </div>
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

                {showTaskDetails && selectedTask && (
                    <ReactModal isOpen={showTaskDetails}>
                        <div className={styles.taskDetailsPopup} >
                            {/*put selected task here*/}
                            <h2> Task Selected: {selectedTask.taskName}</h2>
                            <h2> Task Details: {selectedTask.taskBody}</h2>
                            <h2> Task Status: {selectedTask.status}</h2>
                            <div className={styles.buttonContainer}>
                                <button className={styles.btn} onClick={closeTaskDetails}>Cancel</button>
                                <button className={styles.btn} onClick={handleUpdateTask}>Update</button>
                            </div>
                        </div>
                    </ReactModal>

                )}
                <TabPanel>
                    <EmployeeTabComponent></EmployeeTabComponent>
                </TabPanel>
                <TabPanel>
                    <ShiftNotesComponent></ShiftNotesComponent>
                </TabPanel>
            
            </Tabs>
        </>
    );
}

async function createNewTask(){
    const upwd = secureLocalStorage.getItem("auth");
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
                "Content-Type": "application/json",
                "Authorization": "Basic "+ upwd
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

    async function updateTask(task){
    }
}

export default Dashboard;
  