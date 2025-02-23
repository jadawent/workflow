import React, {useEffect, useState} from "react";
import { navigate } from "react-router-dom"
import styles from "../HomePage.module.css"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { useAuth } from '../components/AuthContext.jsx'

function Dashboard(){
    const [taskList, setTaskList] = useState([]);
    const {logout} = useAuth();
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

    const handleLogout = async () => {
        logout();
        navigate('/')
    }

    return (
        <>
            <header>
                <nav className={styles.navBar}>
                    <button className={styles.btn} onClick={handleLogout}>Logout</button>
                </nav>
            </header>
            <Tabs>
                <TabList>
                    <Tab>Tasks</Tab>
                </TabList>
                <TabPanel>
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
            </Tabs>
        </>
    );
}

export default Dashboard;
  