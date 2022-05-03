import React, { Component } from "react";

import Form from "./components/Form";
import View from "./components/View";
import Popup from "./components/Popup";
import Notes from "./components/Notes";
import EditPopup from "./components/EditPopup";
import axios from "axios";

class App extends Component {
    state = {
        inputData: {
            firstname: "",
            lastname: "",
            phone: "",
            role: "",
            message: "",
        },
        showPopup: false,
        notes: [],
        currentNote: {},
        showEditPopup: false,
    };

    inputHandler = (e) => {
        this.setState({
            inputData: {
                ...this.state.inputData,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleFormSubmit = async () => {
        const response = await axios.post(
            "http://localhost:3010/notes",
            this.state.inputData
        );
        this.setState({
            inputData: {
                firstname: "",
                lastname: "",
                phone: "",
                role: "",
                message: "",
            },
            showPopup: !this.state.showPopup,
            notes: [...this.state.notes, response.data],
        });
    };

    popUpHandler = (e) => {
        e.preventDefault();
        this.setState({ showPopup: !this.state.showPopup });
    };

    closeHandler = () => {
        window.location.reload();
    };

    getNotes = async () => {
        const response = await axios.get("http://localhost:3010/notes");
        this.setState({ notes: response.data });
    };

    componentDidMount() {
        this.getNotes();
    }

    handleDelete = async (id) => {
        await axios.delete(`http://localhost:3010/notes/${id}`);
        const notes = this.state.notes.filter((note) => note.id !== id);
        this.setState({ notes: notes });
    };

    handleUpdate = async (event) => {
        event.preventDefault();
        await axios.put(
            `http://localhost:3010/notes/${this.state.currentNote.id}`,
            this.state.currentNote
        );
        const index = this.state.notes.findIndex(
            (note) => note.id === this.state.currentNote.id
        );
        const notesCopy = [...this.state.notes];
        notesCopy[index] = this.state.currentNote;
        this.setState({ showEditPopup: false, notes: notesCopy });
    };

    inputUpdateHandler = (e) => {
        this.setState({
            currentNote: {
                ...this.state.currentNote,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleShowUpdateForm = (note) => {
        this.setState({ showEditPopup: true, currentNote: note });
    };

    render() {
        return (
            <>
                <div className="form_area">
                    <Form
                        change={this.inputHandler}
                        submit={this.popUpHandler}
                    />
                    <View {...this.state.inputData} />
                </div>
                <div>
                    <Notes
                        notes={this.state.notes}
                        handleDelete={this.handleDelete}
                        handleShowUpdateForm={this.handleShowUpdateForm}
                    />
                </div>
                {this.state.showPopup && (
                    <Popup
                        close={this.closeHandler}
                        submit={this.handleFormSubmit}
                        {...this.state.inputData}
                    />
                )}
                {this.state.showEditPopup && (
                    <EditPopup
                        submit={this.handleUpdate}
                        {...this.state.currentNote}
                        change={this.inputUpdateHandler}
                    />
                )}
            </>
        );
    }
}

export default App;
