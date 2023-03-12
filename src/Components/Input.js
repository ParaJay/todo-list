import React from "react";

const Input = (props) => {
    const placeholder = `Enter ${props.text}...`
    const onChange = props.onChange;
    const className = "note-input themed " + props.className;
    const defaultValue = props.defaultValue;

    if(props.isTextArea) {
        return (
            <textarea className={className + " textarea"}
                placeholder={placeholder}
                required={true} 
                resizable="false" 
                onChange={onChange}
                defaultValue={defaultValue}
                >
            </textarea>
        );
    } else {
        return (<input className={className} required={true} onChange={onChange} placeholder={placeholder} defaultValue={defaultValue} value={props.value}></input>);
    }
}

export default Input;