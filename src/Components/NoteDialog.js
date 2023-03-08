import React, { useState } from "react";
import Modal from "react-modal";

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

    if (props.visible && !isVisible) {
        setIsVisible(true);
    }

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
            <button className="left-item" onClick={() => onSubmit(props.onOverwrite)}>Overwrite</button>
            <button onClick={() => onSubmit(props.onMerge)}>Merge</button>
            <button className="right-item" onClick={onSubmit}>Cancel</button>
        </div>
        </Modal>
        );
    }

  export default NoteDialog;