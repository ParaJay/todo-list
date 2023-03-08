const Button = (props) => {
    return (
        <button id={props.id} className={props.className + " themed"} onClick={props.onClick}>{props.text}</button>
    )
}

export default Button;