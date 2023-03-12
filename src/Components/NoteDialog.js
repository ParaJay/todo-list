import React, { useState } from "react";
import Modal from "react-modal";
import { getSubOrDefault } from "../themes";

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

function NoteDialog(props) {
    let subtitle;
    const [isVisible, setIsVisible] = useState(false);
    const closeCallback = props.closeCallback;

    function afterVisible() {
        subtitle.style.color = '#f00';
    }

    function dispose(callback) {
        setIsVisible(false);
        let func = () => {};
        if (typeof callback === typeof func) callback();
        closeCallback();
    }

    const onSubmit = (callback) => {
        dispose(callback);
    }

    if (props.isVisible && !isVisible) {
        setIsVisible(true);
    }

    customStyles.content["backgroundColor"] = getSubOrDefault(props.theme, "backgroundColor", "#fff");

    return (
        <Modal
        isOpen={isVisible}
        onAfterOpen={afterVisible}
        onRequestClose={() => dispose(props.closeCallback)}
        style={customStyles}
        contentLabel="Existing Note"
        >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>This Note already exists, what do you want to do?</h2>
        <div className="wrapper">
            <button className="left-item themed" onClick={() => onSubmit(props.onOverwrite)}>Overwrite</button>
            <button className="themed" onClick={() => onSubmit(props.onMerge)}>Merge</button>
            <button className="right-item themed" onClick={onSubmit}>Cancel</button>
        </div>
        </Modal>
        );
    }

  export default NoteDialog;