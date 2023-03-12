import React from "react";
import Modal from "react-modal";
import { getSubOrDefault } from "../themes";
import Button from "./Button";
import Input from "./Input";
import Panel from "./Panel";
import Settings from "./Settings";

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

const NoteCreator = (props) => {
    customStyles.content["backgroundColor"] = getSubOrDefault(props.theme, "backgroundColor", "#fff");

    const onSubmit = (e) => {
        e.stopPropagation();
        
        props.onSubmit();
    }

    return (
        <Panel
            header = {[
                <Button key="back" onClick={props.onBack} className="back-btn left nav-item" text="<"></Button>,
                props.settingsButton,
                <Input key="input" className="invis center-nav-item nav-item" onChange={props.onTitleChange} text="Note Title"></Input>
                ]}

            body = {(
                <div className="overflow">
                    <form id="create-form" className="max" onSubmit={(e) => onSubmit(e)}>
                        <Input className="top top-label nav-item" onChange={props.onTitleChange} text="Note Title" value={props.title}></Input>
                        <Input isTextArea={true} onChange={props.onTextChange} text="note" defaultValue={props.text}></Input>
                        <Button className={"confirm-note btm-right"} text="&#10003;"/>
                    </form>
                </div>
            )}

            settings = {(
                <Settings isVisible={props.isEditingSettings} onClose={props.onSettingsClose} settings = {
                    {
                        "seperator1": ""
                    }
                } theme={props.theme}></Settings>  
            )}
        />
    );
}

  export default NoteCreator;