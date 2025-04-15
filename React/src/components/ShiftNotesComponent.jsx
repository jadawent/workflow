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
                    <th className={styles.shiftNotesContainerHeader}>Shift Notes</th>
                </tr>
            </thead>
            <tbody>
                {shiftNotesList.length > 0 ? shiftNotesList.map((shiftNote, index) => {
                    return (
                        <tr key={index}>
                            <td className={styles.shiftNotesList} onClick={() => {
                                setShowShiftNoteInfoPopup(true);
                                setSelectedShiftNote(shiftNote);
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
                        <p>Title:</p>
                        <input id="title"></input>
                        <p>Message:</p>
                        <input id="body"></input>
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
                        <h2>{selectedShiftNote.title}</h2>
                        <p>{selectedShiftNote.body}</p>
                        <p>Posted by Creator ID: {selectedShiftNote.creator}</p>
                        <div className={styles.buttonContainer}>
                        <button className={styles.cancelBtn} onClick={() =>{handleDelete()}}>Delete</button>
                        <button className={styles.submitBtn} onClick={() => {
                            setShowShiftNoteInfoPopup(false);
                            setSelectedShiftNote(null);
                        }}>Close</button>
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

    async function deleteShiftNote(){
        const upwd = secureLocalStorage.getItem("auth");
        const id = selectedShiftNote.id
        const url =`http://localhost:8080/api/shift-note/delete/${id}`;
        const data ={
            "id" : id
        }
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic "+ upwd
                },
                body: JSON.stringify(data)
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