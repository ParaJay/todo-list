const Label = (props) => {
    const hidden = props.isHidden;
    
    var labelClassName = "todo-label";

    if(props.isChecked) labelClassName += " checked";
    if(props.isHidden) labelClassName += " hidden";

    return (
        <div className={hidden ? "hidden" : "todo-wrapper"}>
            <h3 className={labelClassName}>{props.title}</h3>
            <p className={labelClassName}>{props.text}</p>

            <div className="wrapper">
                <div>
                    <button onClick={props.onCheck}>Check</button>
                </div>

                <div className="centered-item">
                <button onClick={props.onHide}>Hide</button>
                </div>

                <div className="right-item">
                    <button onClick={props.onRemove}>Delete</button>
                </div>
            </div>
        </div>
    )
};

export default Label;