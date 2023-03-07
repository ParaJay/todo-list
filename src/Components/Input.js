import React from "react";

const Input = (props) => {
    const placeholder = `Enter ${props.text}...`
    const onChange = props.onChange;

    if(props.isTextArea) {
        return (
            <textarea className="note-input" 
                placeholder={placeholder}
                required={true} 
                cols={56} 
                rows={28} 
                resizable="false" 
                onChange={onChange}>
            </textarea>
        );
    } else {
        return (<input className="note-input" required={true} onChange={onChange} placeholder={placeholder}></input>);
    }
}

export default Input;