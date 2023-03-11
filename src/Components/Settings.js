import React, { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";

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

    function afterVisible() {
    }

    function dispose(callback) {
        setIsVisible(false);
        props.onClose();
    }

    const onSubmit = (e) => {
        e.preventDefault();
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
            <h2 className="centered-item themed" ref={(_subtitle) => (subtitle = _subtitle)}>Create Note</h2>
            <form onSubmit={(e) => onSubmit(e)} className="themed">
                <div className="column-wrapper note-wrapper themed">
                    <Button onClick={props.callbacks["showAll"]} text="Show All"></Button>
                    <button className="invis">____</button>
                    <Button onClick={props.callbacks["toggleBlock"]} text={"view: " + (props.block ? "block" : "row")} ></Button>

                    <Button onClick={props.callbacks["toggleTheme"]} text={"theme: " + props.theme} ></Button>
                </div>
            </form>
        </Modal>
        );
    }

  export default Settings;