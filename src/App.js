import React, { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import NoteDialog from "./Components/NoteDialog";
import Notes from "./Components/Notes";

const App = () => {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState([]);
    const [dialog, setDialogue] = useState(false);
    const [block, setBlock] = useState(false);

    const colours = {};

    const onTitleChange = (e) => { setTitle(e.target.value); }
    const onTextChange = (e) => { setText(e.target.value); }

    const changeNote = (index, key, value, set=true) => {
        let tds = [...notes];
        let toChange = tds[index];

        if(value === "invert") value = !toChange[key];

        tds[index][key] = value;

        setNotes(tds);
    }

    const promptNote = () => {
        setDialogue(true);
    }

    const getIndex = (title) => {
        for(let i = 0; i < notes.length; i++) {
            if(notes[i].title === title) {
                return i;
            }
        }

        return -1;
    }

    const clearInputs = () => {
        let inputs = document.getElementsByClassName("note-input");

        for(let i = 0; i < inputs.length; i++) inputs[i].value = "";
    }

    const addNote = (e) => {
        if(e) e.preventDefault();

        if(noteExists(title)) {
            promptNote();
            return;
        }

        let t = [...notes];

        clearInputs();

        t.push({text : text, title: title});

        setNotes(t);
    }

    const removeNote = (index) => {
        let tds = [...notes];
        tds.splice(index, 1);

        setNotes(tds);
    }

    const checkNote = (index) => {
        changeNote(index, "checked", "invert");
    }

    const expandNote = (index) => {
        changeNote(index, "expanded", "invert");
    }

    const hideNote = (index) => {
        changeNote(index, "hidden", true);
        changeNote(index, "expanded", false);
    }

    const overwriteNote = () => {
        changeNote(getIndex(title), "text", text);
        setTimeout(() => clearInputs(), 0);
    }

    const colourNote = (index, colour) => {
        colours[notes[index].title] = colour;
        console.log(colour)
        changeNote(index, "colour", colour)
    }

    const mergeNote = () => {
        let index = getIndex(title);
        let ttext = notes[index].text;

        changeNote(index, "text", ttext + "\n" + text);

        clearInputs();
    }

    const noteExists = (title) => {
        for(let i = 0; i < notes.length; i++) {
            if(notes[i].title === title) {
                return true;
            }
        }

        return false;
    }

    const showAll = () => {
        let tds = [...notes];

        for(let i = 0; i < tds.length; i++) tds[i].hidden = false;

        setNotes(tds);
    }

    const toggleBlock = () => {
        setBlock(!block);
    }

    const ND = <NoteDialog visible={dialog} closeCallback={
        () => setDialogue(false)
    } onOverwrite={() => {overwriteNote(); addNote();}} onMerge={mergeNote}/>;

    return (
        <> 
            {ND}
            <Notes block={block} notes={notes} onCheck={checkNote} onRemove={removeNote} onHide={hideNote} onClick={expandNote} onColour={colourNote} colours={colours}></Notes>
            <br/><br/><br/>
            <Form onSubmit={addNote} onTextChange={onTextChange} onTitleChange={onTitleChange}></Form>
            <br/><br/>
            <button onClick={showAll}>Show All</button>
            <button onClick={() => toggleBlock()}>View as {block ? "Rows" : "Blocks"}</button>
        </>
      );
}

export default App;
