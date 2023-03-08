import Label from "./Label";
import Separator from "./Seperator";

const Notes = (props) => {
    let tds = props.notes;
    let filter = props.filter.toLowerCase();

    if(!tds) return <></>
    let wrapped = [];
    let unwrapped = [];

    const matchesFilter = (note) => {
        if(!filter) return true;

        return (note.title.toLowerCase().includes(filter) || note.text.toLowerCase().includes(filter))
    }

    for(let i = 0; i < tds.length; i++) {
        if(!matchesFilter(tds[i])) continue;
        let label = <Label
        key={i}
        theme={props.theme}
        index={i}
        title={tds[i].title}
        text={tds[i].text} 
        isChecked={tds[i].checked} 
        isHidden={tds[i].hidden}
        onCheck={() => props.onCheck(i)}
        onRemove={() => props.onRemove(i)}
        onHide={() => props.onHide(i)}
        onClick={() => props.onClick(i)}
        isExpanded={tds[i].expanded}
        isBlock={props.block}
        onColour={props.onColour}
        colour={tds[i].colour}
        >

         </Label>;

        let doWrap = props.block && !tds[i].expanded;

        if(doWrap) {
            wrapped.push(label);
            wrapped.push(<Separator key={"sep-" + i}/>)
        } else {
            unwrapped.push(label);
            unwrapped.push(<Separator key={"sep-" + i}/>)
        }
    }

    let sepWrapped = [];
    let curr = [];
    const perRow = 5;

    for(let i = 0; i < wrapped.length; i++) {
        if(wrapped[i].props.isHidden || (i > 0 && wrapped[i - 1].props.isHidden)) continue;

        curr.push(wrapped[i]);

        if(curr.length === (perRow * 2)) {
            sepWrapped.push(<div key={"c-w-" + i } className="wrapper">{curr}</div>);

            curr = [];
        }
    }

    if(curr.length > 0) sepWrapped.push(<div key={"c-w-x" } className="wrapper">{curr}</div>);

    return <>{unwrapped}{sepWrapped}</>;
}

export default Notes;