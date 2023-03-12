import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "./Components/Button";
import Input from "./Components/Input";
import NoteCreator from "./Components/NoteCreator";
import NoteDialog from "./Components/NoteDialog";
import Notes from "./Components/Notes";
import Panel from "./Components/Panel";
import Settings from "./Components/Settings";
import { loadTheme } from "./themes";
import SettingsButton from "./Components/SettingsButton";
import { images } from "./images";

const App = () => {
    const themes = ["default", "dark"];

    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState([]);
    const [dialog, setDialogue] = useState(false);
    const [block, setBlock] = useState(false);
    const [search, setSearch] = useState("");
    const [theme, setTheme] = useState(themes[0]);
    const [themeStyles] = useState({});
    const [isCreating, setIsCreating] = useState(false);
    const [isEditingSettings, setIsEditingSettings] = useState(false);
    const [view, setView] = useState(null);

    const settingsButton = <SettingsButton
                            key="settings"
                            setIsEditingSettings={setIsEditingSettings} 
                            image = {images["settings"]}
                            ></SettingsButton>

    themes.map((e) => loadTheme(e));

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
            if(view) {
                overwriteNote();
                return;
            } else {
                promptNote();
                return;
            }
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
        setView(notes[index])
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

    const nc_onSubmit = isCreating ? addNote : () => {overwriteNote(); addNote(); setView(null); };

    if(view || isCreating) {
        return (
            <NoteCreator 
            onSubmit={nc_onSubmit}
            onTextChange={onTextChange} 
            onTitleChange={onTitleChange} 
            onSettingsClose={() => setIsEditingSettings(false)}
            onBack={() => view ? setView() : setIsCreating()} 
            onSettings={() => setIsEditingSettings(true)} 
            isEditingSettings={isEditingSettings}
            theme={theme}
            images={images}
            settingsButton={settingsButton}
            text={view ? view.text : undefined}
            title={view ? view.title : undefined}
            ></NoteCreator>
        )
    }

    const toggleSearchBar = () => { setSearchBar("invert"); }

    const setSearchBar = (value) => {
        let s = document.getElementsByClassName("search-bar")[0];

        if(s.style.visibility === value) return;

        if(value === "invert") value = s.style.visibility === "visible" ? "hidden" : "visible";

        if(s) s.style.visibility = value;
    }

    return (
        <div className="themed" onClick={() => {setIsCreating(false)}}>
            <Panel
                header = {
                    (<>
                    <h3 className="left top nav-item">Notes</h3>
                    <Input className="right nav-item search-bar top-label" onChange={onSearchChange} text="Filter"></Input>
                    <Button text="Search" image={images.search} className="stl top right" imageClassName="stl-img top right settings-img" onClick={toggleSearchBar}/>

                    {settingsButton}

                    </>)
                }

                body = {
                    (
                        <>
                        <br/><br/>
                        <Notes 
                        filter={search} 
                        block={block} 
                        notes={notes} 
                        onCheck={checkNote} 
                        onRemove={removeNote} 
                        onHide={hideNote} 
                        onClick={expandNote} 
                        onEdit={editNote} 
                        onColour={colourNote} 
                        colours={colours}></Notes>
                        </>
                    )
                }

                settings = {(
                    <Settings isVisible={isEditingSettings} onClose={() => setIsEditingSettings(false)} settings = {
                        {
                            "toggleBlock": { 
                                type: "button",
                                "value": toggleBlock,
                                text: "view: " + (block ? "block" : "row")
                            },

                            "separator1":"",

                            "toggleTheme": { 
                                type: "button",
                                "value": toggleTheme,
                                text: "theme: " + theme
                            },

                            "showAll": {
                                type: "button",
                                "value": showAll
                            }
                        }
                    } theme={theme} block={block}></Settings>
                )}
            
                footer = {
                    (
                        <Button className={"create-note btm-right"} onClick={(e) => {
                            e.stopPropagation();
                            setIsCreating(true);
                            }} text="+"/>
                    )
                }
            
            />
        </div>
    )
}

export default App;
