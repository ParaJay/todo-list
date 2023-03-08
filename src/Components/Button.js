const Button = (props) => {
    return (
        <button id={props.id} className={props.className + " " + props.theme} onClick={props.onClick}>{props.text}</button>
    )
}

export default Button;