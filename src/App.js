import React, { useEffect, useState } from "react";

import Form from "./components/Form";
import View from "./components/View";
import Popup from "./components/Popup";
import Notes from "./components/Notes";
import EditPopup from "./components/EditPopup";
import axios from "axios";

const App = () => {
    const [inputData, setInputData] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        role: "",
        message: "",
    });
    const [showPopup, setShowPopup] = useState(false);
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState({});
    const [showEditPopup, setShowEditPopup] = useState(false);

    const inputHandler = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async () => {
        const response = await axios.post(
            "http://localhost:3010/notes",
            inputData
        );
        setInputData({
            firstname: "",
            lastname: "",
            phone: "",
            role: "",
            message: "",
        });
        setShowPopup(!showPopup);
        setNotes([...notes, response.data]);
    };

    const popUpHandler = (e) => {
        e.preventDefault();
        setShowPopup(!showPopup);
    };

    const closeHandler = () => {
        window.location.reload();
    };

    const getNotes = async () => {
        const response = await axios.get("http://localhost:3010/notes");
        setNotes(response.data);
    };

    useEffect(() => {
        getNotes();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3010/notes/${id}`);
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        await axios.put(
            `http://localhost:3010/notes/${currentNote.id}`,
            currentNote
        );
        const index = notes.findIndex((note) => note.id === currentNote.id);
        const notesCopy = [...notes];
        notesCopy[index] = currentNote;
        setShowEditPopup(false);
        setNotes(notesCopy);
    };

    const inputUpdateHandler = (e) => {
        setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
    };

    const handleShowUpdateForm = (note) => {
        setShowEditPopup(true);
        setCurrentNote(note);
    };

    return (
        <>
            <div className="form_area">
                <Form change={inputHandler} submit={popUpHandler} />
                <View {...inputData} />
            </div>
            <div>
                <Notes
                    notes={notes}
                    handleDelete={handleDelete}
                    handleShowUpdateForm={handleShowUpdateForm}
                />
            </div>
            {showPopup && (
                <Popup
                    close={closeHandler}
                    submit={handleFormSubmit}
                    {...inputData}
                />
            )}
            {showEditPopup && (
                <EditPopup
                    submit={handleUpdate}
                    {...currentNote}
                    change={inputUpdateHandler}
                />
            )}
        </>
    );
};

export default App;
