import React, {useState, useEffect} from 'react'
import ReactModal from 'react-modal'
import styles from "../Dashboard.module.css"
import Select from 'react-select';
import secureLocalStorage from "react-secure-storage";


export default function TaskDetails(props) {

    const [taskName, setTaskName] = useState(props.selectedTask.taskName);
    const [taskBody, setTaskBody] = useState(props.selectedTask.taskBody);
    const [taskStatus, setTaskStatus] = useState(props.selectedTask.status);
    const [taskAssignee, setTaskAssignee] = useState(props.selectedTask.assignedTo);
    const [userList, setUserList] = useState([]);

    const closeTaskDetails = () => {
        props.setShowTaskDetails(false);
    }

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
            const userList = [];
            for (let i = 0; i < json.length; i++) {
                const userLabel = json[i].firstName + " " + json[i].lastName;
                userList.push(
                    {
                        value: json[i],
                        label: userLabel
                    }
                )
            }
            setUserList(userList);

        }
        getUserList();
    }, []);

    const handleUpdateTask = async() => {
        const upwd = secureLocalStorage.getItem("auth");
        const url ="http://localhost:8080/api/task/" + props.selectedTask.id;
    
        const data = {
            taskName: taskName,
            taskBody: taskBody,
            status: taskStatus,
            assignedTo: taskAssignee
        }

        try{
            const response = await fetch(url , {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic "+ upwd
                },
                body: JSON.stringify(data)
            });
            const result = await response.text();
            if(response.ok){
                alert("Task Updated!");
            }
            else{
                alert(result);
            }
        } catch (error){
            console.error(error)
        }
        window.location.reload();
        props.setShowTaskDetails(false);
    }

    return(
        <ReactModal className={styles.popupOverlay} isOpen={props.isOpen}>
            <div className={styles.taskDetailsPopup} >
                {/*put selected task here*/}
                <p> Task Name:</p>
                <input 
                    id="taskName" 
                    className={styles.largeInput}
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                ></input>
                <p> Task Details:</p>
                <input 
                    id="taskBody" 
                    className={styles.largeInput}
                    value={taskBody}
                    onChange={(e) => setTaskBody(e.target.value)}
                ></input>
                <p> Task Status:</p>
                <select
                    id="taskStatus"
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                >
                    <option>TO_DO</option>
                    <option>IN_PROGRESS</option>
                    <option>COMPLETE</option>
                </select>
                <p>Assignee</p>
                <select
                    id="taskAssignee"
                    value={taskAssignee ? JSON.stringify(taskAssignee) : ""}
                    onChange={(e) => setTaskAssignee(e.target.value ? JSON.parse(e.target.value) : null)}
                >
                    <option></option>
                    {userList.map((user) => {
                        return(
                            <option 
                                value={JSON.stringify(user.value)}
                            >
                                {user.label}
                            </option>
                        )
                    })}
                </select>
                <div className={styles.buttonContainer}>
                    <button className={styles.cancelBtn} onClick={closeTaskDetails}>Cancel</button>
                    <button className={styles.submitBtn} onClick={handleUpdateTask}>Update</button>
                </div>
            </div>
        </ReactModal>
    )
};