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

    // UPDATE SHIFT NOTE POPUP
    const [showUpdateShiftNotePopup, setShowUpdateShiftNotePopup] = useState(false);

    // SHIFT NOTE INFO POPUP
    const [showShiftNoteInfoPopup, setShowShiftNoteInfoPopup] = useState(false);

    // SELECTED SHIFT NOTE STATE
    const [selectedShiftNote, setSelectedShiftNote] = useState(null);

    const handlePost = async () => {
        createShiftNote();
        setShowCreateShiftNotePopup(false);
    }

    const handleEdit = async () => {
        editShiftNote();
        setShowCreateShiftNotePopup(false);
    }

    const handleDelete = async () => {
        deleteShiftNote();
        setShowShiftNoteInfoPopup(false);
    }

    const isManager = () => {
        return sessionStorage.ROLE === "Manager";
    }

    const isCreator = () => {
        return selectedShiftNote.creator == sessionStorage.getItem("ID");
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
            setSelectedUser(result);
        } catch (error){
            console.error(error);
        }
    }

    const editNote = (selectedShiftNote) => {
        setShowUpdateShiftNotePopup(true);
        setShowShiftNoteInfoPopup(false);
        setSelectedShiftNote(selectedShiftNote);
        setSelectedUserFunction(selectedShiftNote);
    }
    
    return(
        <>
        <div className={styles.container}>
        <div>
            <button className={styles.createNewShiftNoteBtn} onClick={() => {setShowCreateShiftNotePopup(true)}}>Create Shift Note</button>
        </div>
        <div className={styles.shiftNotesContainer}>
        <table width={"100%"}>
            <thead>
                <tr align={"left"}>
                    <th className={styles.shiftNotesContainerHeader}>Shift Notes (click note for details)</th>
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
        </div>
    </div>
        {
            showCreateShiftNotePopup && (
                <ReactModal className={styles.popupOverlay}isOpen={showCreateShiftNotePopup}>
                    <div className={styles.createShiftNoteDiv}>
                        <h2 className={styles.font}> Create New Shift Note </h2>
                        <p>Title:</p>
                        <input id="title" className={styles.largeInput}></input>
                        <p>Message:</p>
                        <input id="body" className={styles.largeInput}></input>
                        <div className={styles.buttonContainer}>
                            <button className={styles.cancelBtn} onClick={() =>{setShowCreateShiftNotePopup(false)}}>Cancel</button>
                            <button className={styles.submitBtn} onClick={() => {
                                handlePost();
                            }}>Post</button>
                        </div>
                    </div>
                </ReactModal>
            )
        }
        {
            showShiftNoteInfoPopup && selectedShiftNote && (
                <ReactModal className={styles.popupOverlay}isOpen={showShiftNoteInfoPopup}>
                    <div className={styles.shiftNotesDiv}>
                        <h2>Title: {selectedShiftNote.title}</h2>
                        <p>Creator: {selectedUser?.firstName} {selectedUser?.lastName}</p>
                        <p>Message: {selectedShiftNote.body}</p>
                        <button className={styles.closeBtn} onClick={() => {
                            setShowShiftNoteInfoPopup(false);
                            setSelectedShiftNote(null);
                        }}>Close</button>
                        {isManager() ? <button className={styles.cancelBtn} onClick={() =>{handleDelete()}}>Delete</button> : null}
                        {isCreator() ? <button className={styles.submitBtn} onClick={() =>{editNote(selectedShiftNote)}}>Edit</button> : null}
                    </div>
                </ReactModal>
            )
        }
        {
            showUpdateShiftNotePopup && (
                <ReactModal className={styles.popupOverlay}isOpen={showUpdateShiftNotePopup}>
                    <div className={styles.createShiftNoteDiv}>
                        <p>Title:</p>
                        <input id="title" defaultValue={selectedShiftNote.title}></input>
                        <p>Message:</p>
                        <input id="body" defaultValue={selectedShiftNote.body}></input>
                        <div className={styles.buttonContainer}>
                            <button className={styles.cancelBtn} onClick={() =>{setShowUpdateShiftNotePopup(false)}}>Cancel</button>
                            <button className={styles.submitBtn} onClick={() => {
                                handleEdit();
                            }}>Post</button>
                        </div>
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

    async function editShiftNote(){
        const upwd = secureLocalStorage.getItem("auth");
        const url =`http://localhost:8080/api/shift-note/${selectedShiftNote.id}`;
        const noteTitle = document.getElementById("title");
        const noteBody = document.getElementById("body");
        const data = {
            "title" : noteTitle.value,
            "body" : noteBody.value
        };
        try{
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic "+ upwd
                },
                body: JSON.stringify(data)
            })
            if(response.ok){
                alert("Shift Note Updated!");
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