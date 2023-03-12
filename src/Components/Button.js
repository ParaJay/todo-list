const Button = (props) => {
    if(props.image) {
        return (
            <button onClick={props.onClick} className={props.className} id={props.id}>
                <img src={props.image} className={props.imageClassName + " icon"} onClick={(e) => {
                    e.stopPropagation();
                    if(props.onClick) props.onClick();
                }}/>
            </button>
        )
    }
    return (
        <button id={props.id} className={props.className + " themed"} onClick={props.onClick}>{props.text}</button>
    )
}

export default Button;