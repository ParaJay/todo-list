import React, { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import Label from "./Components/Label";
import Separator from "./Components/Seperator";

const App = () => {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [todos, setTodos] = useState([]);

    const onTitleChange = (e) => { setTitle(e.target.value); }
    const onTextChange = (e) => { setText(e.target.value); }

    const changeNote = (index, key, value, set=true) => {
        let tds = [...todos];
        let toChange = tds[index];

        if(value == "invert") value = !toChange[key];

        tds[index][key] = value;

        setTodos(tds);
    }

    const addNote = (e) => {
        e.preventDefault();

        let inputs = document.getElementsByClassName("todo-input");
        let t = [...todos];

        for(let i = 0; i < inputs.length; i++) inputs[i].value = "";

        t.push({text : text, title: title});

        setTodos(t);
    }

    const removeNote = (index) => {
        let tds = [...todos];
        tds.splice(index, 1);

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

        for(let i = 0; i < tds.length; i++) {
            tds[i].hidden = false;
        }

        setTodos(tds);
    }

    return (
        <>
            {getTodos(todos)}
            <br/><br/><br/>
            <Form onSubmit={addNote} onTextChange={onTextChange} onTitleChange={onTitleChange}></Form>
            <br/><br/>
            <button onClick={showAll}>Show All</button>
        </>
      );
}

export default App;
