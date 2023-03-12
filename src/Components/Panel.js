const Panel = (props) => {
    return (
        <>
            <header className="header">
                {props.header}
            </header>

            <div id="body" className="">
                <br/><br/>
                {props.body}
                {props.settings}
            </div>            

            <footer className="over-border">
                {props.footer}
            </footer>
        </>
    )
}

export default Panel;