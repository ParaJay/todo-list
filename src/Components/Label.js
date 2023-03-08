const getRandom = () => {
    const alpha = "abcdefghijklmnopqrstuvwxys";
    const bet = alpha.slice().toUpperCase();

    const alphabet = (alpha + bet).split("");
    var res = "";

    while(res.length < 8) {
        res += alphabet[Math.floor(Math.random() * alphabet.length - 1)];
    }

    return res;
}

const Label = (props) => {
    const hidden = props.isHidden;
    
    var labelClassName = "note-label";

    if(props.isChecked) labelClassName += " checked";
    if(hidden) labelClassName += " hidden";

    var wrapperClassName = props.isBlock && !props.isExpanded ? "block-item" : "note-wrapper";
    if(hidden) wrapperClassName += " hidden";

    if(!props.isExpanded) {
        return (
            <div className={wrapperClassName} onClick={props.onClick}>
                <h3 className={labelClassName}>{props.title}</h3>
            </div>
        )
    } else {
        let text = props.text;
        let newText = text.split("\n").map(e => <p key={getRandom() + "-" + e} className={labelClassName}>{e}</p>);

        return (
            <div className={wrapperClassName}>
                <div className="sub-wrapper" onClick={props.onClick}>
                    <h3 className={labelClassName}>{props.title}</h3>
                    {newText}
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