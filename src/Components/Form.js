import Input from "./Input";

const Form = (props) => {
    const nameInput = <Input onChange={props.onTitleChange} text="Note Title"></Input>;
    const textInput = <Input isTextArea={true} onChange={props.onTextChange} text="note"></Input>;
    const submit = <input className="themed" type="submit" value="Add Note"></input>

    return (
        <form onSubmit={props.onSubmit}>
            {nameInput}
            <br/>
            {textInput}
            <br/>
            {submit}
        </form>
    );
}

export default Form;