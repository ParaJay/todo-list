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

    const addNote = (e) => {
        e.preventDefault();

        let inputs = document.getElementsByClassName("todo-input");
        let t = [...todos];

        for(let i = 0; i < inputs.length; i++) inputs[i].value = "";

        t.push({text : text, title: title});

        setTodos(t);
    }

    const removeNote = (index) => {
        let t = todos.slice();
        t.splice(index, 1);

        setTodos(t);
    }

    const checkNote = (index) => {
        let t = todos.slice();

        let toChange = t[index];

        toChange.checked = !toChange.checked;

        t[index] = toChange;

        setTodos(t);
    }

    const hideNote = (index) => {
        let label = todos[index];
        let t = todos.slice();

        label.hidden = true;

        t[index] = label;

        setTodos(t);
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
                >
    
            </Label>);
    
            todos.push(<Separator key={"sep-" + i}/>)
        }
    
        return <>{todos}</>;
    }

    const showAll = () => {
        let td = [...todos];

        for(let i = 0; i < td.length; i++) {
            let t = td[i];

            t.hidden = false;
            td[i] = t;
        }

        setTodos(td);
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
