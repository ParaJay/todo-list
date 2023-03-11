//TODO: Add button, allow full focus of labels, will display LabelView.js with prps for label and cxhange vents

import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "./Components/Button";
import Form from "./Components/Form";
import Input from "./Components/Input";
import NoteCreator from "./Components/NoteCreator";
import NoteDialog from "./Components/NoteDialog";
import Notes from "./Components/Notes";
import Separator from "./Components/Seperator";
import Settings from "./Components/Settings";

const App = () => {
    const themes = ["default", "dark"];

    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState([]);
    const [dialog, setDialogue] = useState(false);
    const [block, setBlock] = useState(false);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("above");
    const [theme, setTheme] = useState(themes[0]);
    const [themeStyles] = useState({});
    const [isCreating, setIsCreating] = useState(false);
    const [isEditingSettings, setIsEditingSettings] = useState(false);
    const [view, setView] = useState(null);

    for(let i = 1; i < themes.length; i++) {
        let theme = themes[i];

        if(themeStyles[theme]) { continue };

        new Promise((resolve) => fetch((require("./themes/" + theme + ".txt"))).then(r => r.text()).then(text => {
            resolve(text);
        })).then((text) => {
            themeStyles[theme] = text;
        })
    }

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

        setIsCreating(false)

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

    const expandNote = (e, index) => {
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

    const editNote = (index) => {
        let inputs = document.getElementsByClassName("note-input");

        for(let i = 0; i < inputs.length; i++) {
            let inp = inputs[i];

            if(inp.placeholder.toLowerCase().includes("note")) {
                if(inp.tagName == "INPUT") {
                    inputs[i].value = notes[index].title;
                } else {
                    inputs[i].value = notes[index].text;
                }
            }
        }
    }

    const colourNote = (index, colour) => {
        colours[notes[index].title] = colour;
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

    function injectCss(css) {
        let styleSheet = document.createElement("style");
        styleSheet.setAttribute("type", "text/css");
        styleSheet.setAttribute("id", "themeStyle");
        styleSheet.innerText = css;
        document.head.appendChild(styleSheet);
      }

    useEffect(() => {
        var stylesheet = document.getElementById('themeStyle');
        if(stylesheet) stylesheet.parentNode.removeChild(stylesheet);

        injectCss(themeStyles[theme]);

        document.body.classList.add("themed");
    }, [theme]);

    if(dialog) return <NoteDialog isVisible={dialog} closeCallback={
        () => setDialogue(false)
    } onOverwrite={() => {overwriteNote(); addNote();}} onMerge={mergeNote} theme={theme}/>;

    if(isCreating) return <NoteCreator onSubmit={addNote} onTextChange={onTextChange} onTitleChange={onTitleChange} isVisible={isCreating} onClose={() => setIsCreating(false)} theme={theme}></NoteCreator>;

    return (
        <div className="themed" onClick={() => setIsCreating(false)}>
            <div className="navbar">
                <Input className="right nav-item" onChange={onSearchChange} text="Search"></Input>
                <Button onClick={() => setIsEditingSettings(true)} className="right nav-item" text="Settings"></Button>
            </div>

            <div className="">
                <h3>Notes</h3>
                <Notes filter={search} block={block} notes={notes} onCheck={checkNote} onRemove={removeNote} onHide={hideNote} onClick={expandNote} onEdit={editNote} onColour={colourNote} colours={colours}></Notes>
                <Settings isVisible={isEditingSettings} onClose={() => setIsEditingSettings(false)} callbacks = {
                    {
                        "toggleBlock": toggleBlock,
                        "onSearchChange": onSearchChange,
                        "toggleLocation": toggleLocation,
                        "toggleTheme": toggleTheme,
                        "showAll": showAll
                    }
                } location={location} theme={theme} block={block}></Settings>

                <Button className={"create-note btm-right"} onClick={(e) => {
                        e.stopPropagation();
                        setIsCreating(true);
                        }} text="+"/>
                </div>            
        </div>
    )
}

export default App;
