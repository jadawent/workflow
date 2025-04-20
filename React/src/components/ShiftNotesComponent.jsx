import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import secureLocalStorage from "react-secure-storage";
import styles from "../ShiftNotes.module.css"


function ShiftNotesComponent(){
    // Shift Notes List
    const [shiftNotesList, setShiftNotesList] = useState([]);
    useEffect(() => {
        async function getShiftNotesList(){
            const upwd = secureLocalStorage.getItem("auth");
            const response = await fetch("http://localhost:8080/api/shift-note/list",{
                method: "GET",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : "Basic " + upwd
                }
            });
            const result = await response.text();
            const json = JSON.parse(result);
            setShiftNotesList(json);
        }
        getShiftNotesList();
    }, []);

    // CREATE SHIFT NOTE POPUP
    const [showCreateShiftNotePopup, setShowCreateShiftNotePopup] = useState(false);

    // SHIFT NOTE INFO POPUP
    const [showShiftNoteInfoPopup, setShowShiftNoteInfoPopup] = useState(false);

    // SELECTED SHIFT NOTE STATE
    const [selectedShiftNote, setSelectedShiftNote] = useState(null);

    const handlePost = async () => {
        createShiftNote();
        setShowCreateShiftNotePopup(false);
    }

    const handleDelete = async () => {
        deleteShiftNote();
        setShowShiftNoteInfoPopup(false);
    }

    const isManager = () => {
        return sessionStorage.ROLE === "Manager";
    }

    const [selectedUser, setSelectedUser] = useState(null);

    async function setSelectedUserFunction(shiftNote){
        const upwd = secureLocalStorage.getItem("auth");
        const id = shiftNote.creator;
        const url = `http://localhost:8080/api/user/get-user/${id}`;
        try{
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic "+ upwd,
                }
            });
            const result = await response.json();
            console.log(result);
        } catch (error){
            console.error(error);
        }
    }
    
    return(
        <>
        <button className={styles.createNewShiftNoteBtn} onClick={() => {setShowCreateShiftNotePopup(true)}}>Create Shift Note</button>
        <table width={"100%"}>
            <thead>
                <tr align={"left"}>
                    <th>Shift Notes</th>
                </tr>
            </thead>
            <tbody>
                {shiftNotesList.length > 0 ? shiftNotesList.map((shiftNote, index) => {
                    return (
                        <tr key={index}>
                            <td className={styles.shiftNotesList} onClick={() => {
                                setShowShiftNoteInfoPopup(true);
                                setSelectedShiftNote(shiftNote);
                                setSelectedUserFunction(shiftNote);
                            }}>{shiftNote.title}</td>
                        </tr>
                    )
                }) : null}
            </tbody>
        </table>
        {
            showCreateShiftNotePopup && (
                <ReactModal isOpen={showCreateShiftNotePopup}>
                    <div className={styles.shiftNotesDiv}>
                        <p>Title:</p>
                        <input id="title"></input>
                        <p>Message:</p>
                        <textarea id="body" className={styles.messageBodyTextArea}></textarea>
                        <button className={styles.btn} onClick={() => {
                            handlePost();
                        }}>Post</button>
                        <button className={styles.btn} onClick={() =>{setShowCreateShiftNotePopup(false)}}>Cancel</button>
                    </div>
                </ReactModal>
            )
        }
        {
            showShiftNoteInfoPopup && selectedShiftNote && (
                <ReactModal isOpen={showShiftNoteInfoPopup}>
                    <div className={styles.shiftNotesDiv}>
                        <h2>Title: {selectedShiftNote.title}</h2>
                        <p>Creator ID: {selectedShiftNote.creator}</p>
                        {/* <p>Creator: {selectedUser.firstName} {selectedUser.lastName}</p> */}
                        <p>Message: {selectedShiftNote.body}</p>
                        <button className={styles.btn} onClick={() => {
                            setShowShiftNoteInfoPopup(false);
                            setSelectedShiftNote(null);
                        }}>Cancel</button>
                        {isManager() ? <button className={styles.btn} onClick={() =>{handleDelete()}}>Delete</button> : null}
                    </div>
                </ReactModal>
            )
        }
        </>
    );


    async function createShiftNote(){
        const upwd = secureLocalStorage.getItem("auth");
        const url =`http://localhost:8080/api/shift-note/create/${sessionStorage.getItem("ID")}`;
        const noteTitle = document.getElementById("title");
        const noteBody = document.getElementById("body");
        const data = {
            "title" : noteTitle.value,
            "body" : noteBody.value
        };
        try{
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic "+ upwd
                },
                body: JSON.stringify(data)
            })
            if(response.ok){
                alert("Shift Note Posted!");
                window.location.reload();
            }
        } catch (error){
            console.log(error);
            alert("Something went wrong.");
        }
    };

    async function deleteShiftNote(){
        const upwd = secureLocalStorage.getItem("auth");
        const id = selectedShiftNote.id
        const url =`http://localhost:8080/api/shift-note/delete/${id}`;

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic "+ upwd
                }
            })
            if(response.ok){
                alert("Shift Note Deleted!");
                window.location.reload();
            }
        } catch (error){
            console.log(error);
            alert("Something went wrong.");
        }
    }

}

export default ShiftNotesComponent;