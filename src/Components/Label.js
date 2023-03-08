import Button from "./Button";

const getRandom = () => {
    const alpha = "abcdefghijklmnopqrstuvwxys";

    const alphabet = (alpha + alpha.slice().toUpperCase()).split("");
    var res = "";

    while(res.length < 8) res += alphabet[Math.floor(Math.random() * alphabet.length - 1)];

    return res;
}

const Label = (props) => {
    const hidden = props.isHidden;
    
    var labelClassName = "note-label";

    if(props.isChecked) labelClassName += " checked";
    if(hidden) labelClassName += " hidden";

    var wrapperClassName = props.theme + " " + props.isBlock && !props.isExpanded ? "block-item" : "note-wrapper";
    if(hidden) wrapperClassName += " hidden";

    var wrapperStyle = props.colour;

    if(!wrapperStyle) wrapperStyle = props.theme === "dark" ? "#333" : "#fff";

    if(!props.isExpanded) {
        return (
            <div className={wrapperClassName} onClick={props.onClick} style={{"backgroundColor": wrapperStyle}} id={props.title}>
                <h3 className={labelClassName}>{props.title}</h3>
            </div>
        )
    } else {
        let text = props.text;
        let newText = text.split("\n").map(e => <p key={getRandom() + "--"} className={labelClassName}>{e}</p>);

        return (
            <div className={wrapperClassName} style={{"backgroundColor": wrapperStyle}}>
                <div className="sub-wrapper" onClick={props.onClick} id={props.title}>
                    <h3 className={labelClassName}>{props.title}</h3>
                    {newText}
                </div>
                
                <div className="wrapper">
                    <div>
                        <Button text={"Check"} onClick={props.onCheck} theme={props.theme}></Button>
                    </div>
    
                    <div className="centered-item">
                        <Button text={"Hide"} onClick={props.onHide} theme={props.theme}></Button>
                    </div>

                    <input className={props.theme} type="color" id="labelColour" name="labelColour" defaultValue={wrapperStyle} onChange={(e) => props.onColour(props.index, e.target.value)}/>
    
                    <div className="right-item">
                        <Button text={"Delete"} onClick={props.onRemove} theme={props.theme}></Button>
                    </div>
                </div>
            </div>
        )
    }
};

export default Label;