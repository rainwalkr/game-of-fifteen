import React,{Component} from "react";
import './settings.css'
import UserSettings from "./user-settings";
import Stats from "./stats";

class Settings extends Component {

    constructor(props){
        super(props)
        this.userSettings = new UserSettings();
        this.stats = new Stats();
        this.state = {
            ...this.userSettings.get(),
            currentTab:0,
            ...this.stats.getAll()
        };
    }

    changeTheme = (event) => {
        this.setState(
            {theme: event.target.value},
            _ => {
                this.props.onUserSettingsChanged(this.userSettings.set(this.state))
            }
        );
    }

    toggleDarkMode = event => {
        this.setState(
            {darkMode: !this.state.darkMode},
            _ => {    
                this.props.onUserSettingsChanged(this.userSettings.set(this.state))
            }
        );
    }

    loadStatsData(){
        this.stats.sync();
        this.setState({
            ...this.stats.getAll()
        })
    }
    
    render(){
        const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
        return (
            <div className={showHideClassName}>
            <section className='modal-main'>
                <div className='header'>
                    <h2 className="heading">Settings</h2>
                    <div className="close" onClick={this.props.onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </div>
                </div>
                <div className="tablist">
                    <button id="one-tab" role="tab" aria-selected={this.state.currentTab === 0} aria-controls="one" tabIndex="0" onClick={_ => this.setState({currentTab:0})} className="tab">General</button>
                    <button id="two-tab" role="tab" aria-selected={this.state.currentTab === 1} aria-controls="two" tabIndex="1" onClick={_ => this.setState({currentTab:1})} className="tab">Stats</button>
                </div>
                <br/>
                <div className="tab-panels">
                    <div role="tabpanel" aria-expanded={this.state.currentTab === 0} aria-hidden="false" aria-labelledby="one-tab" className="tab-panel">                    
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
                    </div>
                </div>
                <div role="tabpanel" aria-expanded={this.state.currentTab === 1} aria-hidden="true" aria-labelledby="two-tab" className="tab-panel">
                    <div className="stat-box">
                        <div>
                            <div className="val">{this.state.totalGamePlays}</div>
                            <div className="name">Game Plays</div>
                        </div>
                        <div>
                            <div className="val">{this.state.totalMoves}</div>
                            <div className="name">Moves</div>
                        </div>
                    </div>
                    <div className="stat-box">
                        <div>
                            <div className="val">{this.state.totalTimeSpendStr}</div>
                            <div className="name">Time Spend</div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="section">
                        <div className="text-center">Average</div>
                        <div className="stat-box">
                        <div>
                            <div className="val">{this.state.averageMoves}</div>
                            <div className="name">Moves</div>
                        </div>
                        <div>
                            <div className="val">{this.state.averageTimeStr}</div>
                            <div className="name">Time</div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.prevGameSolvedTimestamp !== prevProps.prevGameSolvedTimestamp){
            this.loadStatsData()
        }
    }

}

export default Settings