import React from "react";

const Input = (props) => {
    const placeholder = `Enter ${props.text}...`
    const onChange = props.onChange;
    const className = "note-input themed " + props.className;

    if(props.isTextArea) {
        return (
            <textarea className={className}
                placeholder={placeholder}
                required={true} 
                cols={56} 
                rows={28} 
                resizable="false" 
                onChange={onChange}>
            </textarea>
        );
    } else {
        return (<input className={className} required={true} onChange={onChange} placeholder={placeholder}></input>);
    }
}

export default Input;