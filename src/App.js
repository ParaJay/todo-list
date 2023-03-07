import React, { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import Label from "./Components/Label";
import Separator from "./Components/Seperator";
import NoteDialog from "./Components/NoteDialog";

const App = () => {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [todos, setTodos] = useState([]);
    const [dialog, setDialogue] = useState(false);

    const onTitleChange = (e) => { setTitle(e.target.value); }
    const onTextChange = (e) => { setText(e.target.value); }

    const changeNote = (index, key, value, set=true) => {
        let tds = [...todos];
        let toChange = tds[index];

        if(value == "invert") value = !toChange[key];

        tds[index][key] = value;

        setTodos(tds);
    }

    const promptNote = () => {
        setDialogue(true);
    }

    const getIndex = (title) => {
        for(let i = 0; i < todos.length; i++) {
            if(todos[i].title === title) {
                return i;
            }
        }

        return -1;
    }

    const clearInputs = () => {
        let inputs = document.getElementsByClassName("todo-input");

        for(let i = 0; i < inputs.length; i++) inputs[i].value = "";
    }

    const addNote = (e) => {
        if(e) e.preventDefault();

        console.log("adding note");
        console.log(todos);

        if(noteExists(title)) {
            promptNote();
            console.log("note exists");
            return;
        }

        let t = [...todos];

        clearInputs();

        t.push({text : text, title: title});

        console.log("added component");

        setTodos(t);
    }

    const removeNote = (index) => {
        let tds = [...todos];
        tds.splice(index, 1);

        console.log("removing note");

        setTodos(tds);
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
        clearInputs();
    }

    const mergeNote = () => {
        let index = getIndex(title);
        let ttext = todos[index].text;

        changeNote(index, "text", ttext + "\n" + text);

        clearInputs();
    }

    const noteExists = (title) => {
        for(let i = 0; i < todos.length; i++) {
            if(todos[i].title === title) {
                return true;
            }
        }

        return false;
    }

    const getTodos = (tds) => {
        if(!tds) return <></>
        let todos = [];
    
        for(let i = 0; i < tds.length; i++) {
            todos.push(
            <Label
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
                >
    
            </Label>);
    
            todos.push(<Separator key={"sep-" + i}/>)
        }
    
        return <>{todos}</>;
    }

    const showAll = () => {
        let tds = [...todos];

        for(let i = 0; i < tds.length; i++) tds[i].hidden = false;

        setTodos(tds);
    }

    const ND = <NoteDialog open={dialog} closeCallback={
        () => setDialogue(false)
    } onOverwrite={() => {overwriteNote(); addNote();}} onMerge={mergeNote}/>;

    return (
        <> 
        {ND}
            {getTodos(todos)}
            <br/><br/><br/>
            <Form onSubmit={addNote} onTextChange={onTextChange} onTitleChange={onTitleChange}></Form>
            <br/><br/>
            <button onClick={showAll}>Show All</button>
        </>
      );
}

export default App;
