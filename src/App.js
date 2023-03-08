import React, { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import Label from "./Components/Label";
import Separator from "./Components/Seperator";
import NoteDialog from "./Components/NoteDialog";

const App = () => {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState([]);
    const [dialog, setDialogue] = useState(false);
    const [block, setBlock] = useState(false);

    const onTitleChange = (e) => { setTitle(e.target.value); }
    const onTextChange = (e) => { setText(e.target.value); }

    const changeNote = (index, key, value, set=true) => {
        let tds = [...notes];
        let toChange = tds[index];

        if(value == "invert") value = !toChange[key];

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

    const overwriteNote = async () => {
        changeNote(getIndex(title), "text", text);
        setTimeout(() => clearInputs(), 0);
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

    const getNotes = (tds) => {
        if(!tds) return <></>
        let wrapped = [];
        let unwrapped = [];
    
        for(let i = 0; i < tds.length; i++) {
            let label = <Label
            key={i}
            title={tds[i].title}
            text={tds[i].text} 
            isChecked={tds[i].checked} 
            isHidden={tds[i].hidden}
            onCheck={() => checkNote(i)}
            onRemove={() => removeNote(i)}
            onHide={() => hideNote(i)}
            onClick={() => expandNote(i)}
            isExpanded={tds[i].expanded}
            isBlock={block}
            >

             </Label>;

            let doWrap = block && !tds[i].expanded;

            if(doWrap) {
                wrapped.push(label);
                wrapped.push(<Separator key={"sep-" + i}/>)
            } else {
                unwrapped.push(label);
                unwrapped.push(<Separator key={"sep-" + i}/>)
            }
        }

        let sepWrapped = [];
        let curr = [];
        const perRow = 5;

        for(let i = 0; i < wrapped.length; i++) {
            curr.push(
                wrapped[i]
            )

            if(curr.length === (perRow * 2)) {
                sepWrapped.push(<div key={"c-w-" + i } className="wrapper">{curr}</div>);

                curr = [];
            }
        }

        if(curr.length > 0) {
            sepWrapped.push(<div key={"c-w-x" } className="wrapper">{curr}</div>);
        }

        return <>{unwrapped}{sepWrapped}</>;
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

    const wrapNotes = () => {
        let nts = getNotes(notes);
        let wrapped = [];
        let unwrapped = [];
        let doWrap = false;

        console.log(nts);

        for(let i = 0; i < nts.length; i++) {
            let index = notes.indexOf(nts[i].title);

            console.log(nts[i]);

            if(block && !nts[i].isExpanded) doWrap = true;

            if(doWrap) {
                wrapped.push(nts[i]);
            } else {
                unwrapped.push(nts[i]);
            }
        }

        return (
            <>
            <div className="column-wrapper">{wrapped}</div>
            {unwrapped}
            </>
        )
    }

    const notesWrapperClassName = block ? "wrapper" : "column-wrapper";

    return (
        <> 
            {ND}
            {getNotes(notes)}
            <br/><br/><br/>
            <Form onSubmit={addNote} onTextChange={onTextChange} onTitleChange={onTitleChange}></Form>
            <br/><br/>
            <button onClick={showAll}>Show All</button>
            <button onClick={() => toggleBlock()}>View as {block ? "Rows" : "Blocks"}</button>
        </>
      );
}

export default App;
