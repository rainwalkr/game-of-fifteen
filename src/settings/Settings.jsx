import React,{Component} from "react";
import './settings.css'
import UserSettings from "./user-settings";

class Settings extends Component {

    constructor(props){
        super(props)
        this.userSettings = new UserSettings();
        this.state = this.userSettings.get();
        console.log(this.state)
    }

    changeTheme = (event) => {
        this.setState(
            {theme: event.target.value},
            _ => {
                this.userSettings.set(this.state)
                this.props.onUserSettingsChanged(this.state)
            }
        );
    }

    toggleDarkMode = event => {
        this.setState(
            {darkMode: !this.state.darkMode},
            _ => {
                this.userSettings.set(this.state)
                this.props.onUserSettingsChanged(this.state)
            }
        );
    }

    render(){
        const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
        return (
            <div className={showHideClassName}>
            <section className='modal-main'>
                <div className='header'>
                    <h2 className="heading">Settings</h2>
                    <div className="close" onClick={this.props.handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </div>
                </div>
                <div className="setting">
                    <div className="setting-title">Themes</div>
                    <select name="theme" value={this.state.theme} onChange={this.changeTheme} id="theme-select">
                        <option value="aqua">Aqua</option>
                        <option value="sky">Sky</option>
                        <option value="chocolate">Chocolate</option>
                        <option value="oreo">Oreo</option>
                        <option value="mud">Mud</option>
                        <option value="iron-man">Iron Man</option>
                        <option value="cadbury">Cadbury</option>
                        <option value="forest">Forest</option>
                    </select>
                </div>
                <div className="setting">
                    <div className="setting-title">Dark Mode</div>
                    <label className="switch">
                        <input type="checkbox" checked={this.state.darkMode} onChange={this.toggleDarkMode} />
                        <span className="slider"></span>
                    </label>
                </div>
            </section>
            </div>
        )
    }

}

export default Settings