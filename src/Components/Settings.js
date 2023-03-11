import React, { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

function Settings(props) {
    let subtitle;
    const [isVisible, setIsVisible] = useState(false);
    // const closeCallback = props.closeCallback;

    function afterVisible() {
        // subtitle.style.color = '#f00';
    }

    function dispose(callback) {
        setIsVisible(false);
        props.onClose();
        // let func = () => {};
        // if (typeof callback === typeof func) callback();
        // closeCallback();
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // props.onSubmit();
    }

    if (props.isVisible && !isVisible) {
        setIsVisible(true);
    }

    // const nameInput = <Input onChange={props.onTitleChange} text="Note Title"></Input>;
    // const textInput = <Input isTextArea={true} onChange={props.onTextChange} text="note"></Input>;
    // const submit = <input className="themed" type="submit" value="Add Note"></input>

    if(props.theme === "dark") {
        customStyles.content.backgroundColor = "#333";
    }

    return (
        <Modal
        isOpen={isVisible}
        onAfterOpen={afterVisible}
        onRequestClose={() => dispose(props.closeCallback)}
        style={customStyles}
        contentLabel="Existing Note"
        >
        <h2 className="centered-item themed" ref={(_subtitle) => (subtitle = _subtitle)}>Create Note</h2>
        <form onSubmit={(e) => onSubmit(e)} className="themed">
            {/* <Input onChange={props.onTitleChange} text="Note Title"></Input>
            <br/>
            <Input isTextArea={true} onChange={props.onTextChange} text="note"></Input>
            <br/>
            <input className="themed" type="submit" value="Add Note"></input> */}

                {/* <div className="wrapper dropdown-content"> */}
                    <div className="column-wrapper note-wrapper themed">
                        <Button onClick={props.callbacks["showAll"]} text="Show All"></Button>
                        <button className="invis">____</button>
                        <Button onClick={props.callbacks["toggleBlock"]} text={"view: " + (props.block ? "block" : "row")} ></Button>

                        <Button onClick={props.callbacks["toggleTheme"]} text={"theme: " + props.theme} ></Button>
                    </div>
                {/* </div> */}
        </form>

        {/* <div className="wrapper">
            <button className="left-item themed" onClick={() => onSubmit(props.onOverwrite)}>Overwrite</button>
            <button className="themed" onClick={() => onSubmit(props.onMerge)}>Merge</button>
            <button className="right-item themed" onClick={onSubmit}>Cancel</button>
        </div> */}
        </Modal>
        );
    }

  export default Settings;