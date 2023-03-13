import React, { useState } from "react";
import Modal from "react-modal";
import { get, getSubOrDefault, themes } from "../themes";
import { convertCase } from "../utils";
import Button from "./Button";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

function Settings(props) {
    let subtitle;
    const [isVisible, setIsVisible] = useState(false);

    function afterVisible() {
    }

    function dispose() {
        setIsVisible(false);
        props.onClose();
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    if (props.isVisible && !isVisible) {
        setIsVisible(true);
    }

    customStyles.content["backgroundColor"] = getSubOrDefault(props.theme, "themed", "backgroundColor", "#fff");

    const create = () => {
        if(!props.settings) return <></>
        let settings = props.settings;

        let keys = Object.keys(settings);
        let res = [];

        keys.map(key => {
            let setting = settings[key];
            let type = setting.type;
            let value = setting.value;
            let text = setting.text;

            if(type === "button") {
                let button = <Button onClick={value} text={text ? text : convertCase(key, "camel", "space")} key={key}></Button>

                    res.push(button);
            } else if(key.toLowerCase().startsWith("separator")) {
                res.push(<button className="invis" key={key}>____</button>)
            }
        });

        return res;
    }

    return (
        <Modal
        isOpen={isVisible}
        onAfterOpen={afterVisible}
        onRequestClose={() => dispose(props.closeCallback)}
        style={customStyles}
        contentLabel="Settings"
        >
            <h2 className="centered-item themed" ref={(_subtitle) => (subtitle = _subtitle)}>Settings</h2>
            <form onSubmit={(e) => onSubmit(e)} className="themed">
                <div className="column-wrapper note-wrapper themed">
                    {create()}
                </div>
            </form>
        </Modal>
        );
    }

  export default Settings;