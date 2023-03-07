import React, {useState} from "react";
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
    const [modalIsOpen, setIsOpen] = useState(false);
    const closeCallback = props.closeCallback;
  
    function afterOpenModal() {
      subtitle.style.color = '#f00';
    }
  
    function closeModal(callback) {
      setIsOpen(false);
      let func = () => {};
      if(typeof callback === typeof func) callback();
      closeCallback();
    }

    const onSubmit = (callback) => {
        closeModal(callback);
    }

    if(props.open && !modalIsOpen) {
        setIsOpen(true);
    }
  
    return (
        <Modal
        isOpen={modalIsOpen || props.open}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => closeModal(props.closeCallback)}
        style={customStyles}
        contentLabel="Example Modal"
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