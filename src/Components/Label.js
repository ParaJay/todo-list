const Label = (props) => {
    const hidden = props.isHidden;
    
    var labelClassName = "todo-label";

    if(props.isChecked) labelClassName += " checked";
    if(props.isHidden) labelClassName += " hidden";

    if(!props.isExpanded) {
        return (
            <div className={hidden ? "hidden" : "todo-wrapper"} onClick={props.onClick}>
                <h3 className={labelClassName}>{props.title}</h3>
            </div>
        )
    } else {
        return (
            <div className={hidden ? "hidden" : "todo-wrapper"}>
                <div className="sub-wrapper" onClick={props.onClick}>
                    <h3 className={labelClassName}>{props.title}</h3>
                    <p className={labelClassName}>{props.text}</p>
                </div>
                
    
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
    }
};

export default Label;