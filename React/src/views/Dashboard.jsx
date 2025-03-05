import React, {useEffect, useState} from "react";
import styles from "../Dashboard.module.css"
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import ReactModal from "react-modal";
import LogoutButton from '../components/LogoutButton'

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
                </TabList>
                <TabPanel>
                    <button align={"right"} className={styles.createNewTaskBtn} onClick={setShowPopupTrue}>Create New Task</button>
                    <div className={styles.swimlaneContainer}>
                        <div className={styles.swimlane}>
                            <h3> TO DO </h3>
                            <p>
                            {taskList.length > 0 ? taskList.filter((task) => task.status == "TO_DO").map((task, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <button
                                                className={styles.taskListBtn} onClick={() => handleTaskListClick(task)}>{task.taskName}
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
                                            className={styles.taskListBtn} onClick={() => handleTaskListClick(task)}>{task.taskName}
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
                                            className={styles.taskListBtn} onClick={() => handleTaskListClick(task)}>{task.taskName}
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
  