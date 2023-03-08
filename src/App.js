import React, { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import Input from "./Components/Input";
import NoteDialog from "./Components/NoteDialog";
import Notes from "./Components/Notes";

const App = () => {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState([]);
    const [dialog, setDialogue] = useState(false);
    const [block, setBlock] = useState(false);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("above");

    const colours = {};

    const onTitleChange = (e) => { setTitle(e.target.value); }
    const onTextChange = (e) => { setText(e.target.value); }
    const onSearchChange = (e) => setSearch(e.target.value)

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

        if(notes[index].expanded) document.getElementById(notes[index].title).scrollIntoView(false);
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

    const toggleLocation = () => {
        setLocation(location === "above" ? "below" : "above");
        setTimeout(() => {
            if(location === "above") {
                window.scrollTo(0, 0);
            } else {
                window.scrollTo(0, window.screen.height);
            }
        });
    }

    const ND = <NoteDialog visible={dialog} closeCallback={
        () => setDialogue(false)
    } onOverwrite={() => {overwriteNote(); addNote();}} onMerge={mergeNote}/>;

    const Display = () => {
        let first;
        let second;

        let n = <Notes filter={search} block={block} notes={notes} onCheck={checkNote} onRemove={removeNote} onHide={hideNote} onClick={expandNote} onColour={colourNote} colours={colours}></Notes>
        let w = (
            <div className="wrapper">
                <div>
                    <Form onSubmit={addNote} onTextChange={onTextChange} onTitleChange={onTitleChange}></Form>
                </div>

                <div className="column-wrapper right-item note-wrapper">
                    <div className="right-item">
                        <button onClick={showAll}>Show All</button>
                        <button onClick={() => toggleBlock()}>View as {block ? "Rows" : "Blocks"}</button>
                    </div>

                    <div className="right-item">
                        <Input onChange={onSearchChange} text="Search"></Input>
                    </div>

                    <button id="change-display-loc" onClick={toggleLocation}>{"display: " + (location === "above" ? "below" : "above")}</button>
                </div>
            </div>
        )

        if(location === "above") {
            first = n;
            second = w;
        } else {
            first = w;
            second = n;
        }

        return (
            <>
                {ND}
                {first}
                {second}
            </>
        )
    }

    return Display();
}

export default App;
