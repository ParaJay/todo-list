import Button from "./Button";

const SettingsButton = (props) => {
    return (
        <Button 
            onClick={() => props.setIsEditingSettings(true)} 
            className="right nav-item top settings-btn themed" 
            text=".." 
            image={props.image} 
            imageClassName="right nav-item settings-btn top themed settings-img">
        </Button>
    )
}

export default SettingsButton;