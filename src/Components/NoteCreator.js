import React, { useState } from "react";
import Modal from "react-modal";
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

function NoteCreator(props) {
    let subtitle;
    const [isVisible, setIsVisible] = useState(false);

    function afterVisible() {
    }

    function dispose() {
        setIsVisible(false);
        props.onClose();
    }

    if (props.isVisible && !isVisible) {
        setIsVisible(true);
    }

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
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Create Note</h2>
        <form onSubmit={props.onSubmit}>
            <Input onChange={props.onTitleChange} text="Note Title"></Input>
            <br/>
            <Input isTextArea={true} onChange={props.onTextChange} text="note"></Input>
            <br/>
            <input className="themed" type="submit" value="Add Note"></input>
        </form>
        </Modal>
        );
    }

  export default NoteCreator;