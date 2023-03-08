import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "./Components/Button";
import Form from "./Components/Form";
import Input from "./Components/Input";
import NoteDialog from "./Components/NoteDialog";
import Notes from "./Components/Notes";

const App = () => {
    const themes = ["default", "light", "dark"];

    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState([]);
    const [dialog, setDialogue] = useState(false);
    const [block, setBlock] = useState(false);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("above");
    const [theme, setTheme] = useState(themes[0]);

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

    const toggleTheme = () => {
        let index = themes.indexOf(theme) + 1;

        if(index == themes.length) index = 0;

        setTheme(themes[index]);
    }

    const ND = <NoteDialog visible={dialog} closeCallback={
        () => setDialogue(false)
    } onOverwrite={() => {overwriteNote(); addNote();}} onMerge={mergeNote} theme={theme}/>;

    const Display = () => {
        let first;
        let second;

        let n = <Notes theme={theme} filter={search} block={block} notes={notes} onCheck={checkNote} onRemove={removeNote} onHide={hideNote} onClick={expandNote} onColour={colourNote} colours={colours}></Notes>
        let w = (
            <div className="wrapper">
                <div>
                    <Form theme={theme} onSubmit={addNote} onTextChange={onTextChange} onTitleChange={onTitleChange}></Form>
                </div>

                <div className="column-wrapper right-item note-wrapper">
                    <div className="right-item">
                        <Button onClick={showAll} theme={theme} text="Show All"></Button>
                        <button className="invis">____</button>
                        <Button onClick={() => toggleBlock()} text={"view: " + (block ? "rows" : "blocks")} theme={theme}></Button>
                    </div>
                    <br/>

                    <div className="right-item">
                        <Input theme={theme} onChange={onSearchChange} text="Search"></Input>
                    </div>

                    <br/>

                    <Button id="change-display-loc" onClick={toggleLocation} text={"display: " + (location === "above" ? "below" : "above")} theme={theme}></Button>

                    <Button onClick={toggleTheme} text={"theme: " + theme} theme={theme}></Button>
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
            <div className={theme}>
                {ND}
                {first}
                <br/><br/>
                {second}
            </div>
        )
    }

    useEffect(() => {
        switch (theme) {
        case "dark":
            document.body.classList.add("dark");
            document.body.classList.remove("light");
            break;
        case "light":
            document.body.classList.add("light");
            document.body.classList.remove("dark");
        default:
            document.body.classList.remove("light");
            document.body.classList.remove("dark");
            break;
        }
    }, [theme]);

    return Display();
}

export default App;
