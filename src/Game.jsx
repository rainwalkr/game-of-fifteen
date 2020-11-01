import React,{Component} from "react";
import Puzzle from "./puzzle/Puzzle";
import Settings  from "./settings/Settings";
import UserSettings  from "./settings/user-settings";
import Storage from "./storage";
import './game.css'
import './dark-mode.css'
import { secondsToTimeString,isObjectsEqual } from "./puzzle/helpers";

class Game extends Component {

    constructor(props){
        super(props)
        this.storage = new Storage();
        this.userSettings = new UserSettings();
        let bestPlay = this.getBestGamePlay(this.storage.get('gamePlays',[]))
        let userSettings = this.userSettings.get();
        this.state = {
            userSettings,
            showSettingsPanel:false,
            bestPlay,
            isGamePlaying:false,
            recordSmashed:false,
            puzzleSlide:{
                direction:null,
                timestamp:null
            },
            prevGameSolvedTimestamp:null
        }
    }
    handleStart = _ => {
        this.setState({
            isGamePlaying:true
        })
    }

    handleReset = _ => {
        this.setState({
            isGamePlaying:false,
            recordSmashed:false
        })
    }

    handleSolved = gameState => {
        let previousBestPlay = this.state.bestPlay;
        let currentBestPlay = this.getBestGamePlay(this.saveGamePlay(gameState));
        if (currentBestPlay) {
            let recordSmashed = previousBestPlay? !isObjectsEqual(previousBestPlay,currentBestPlay):false; 
            this.setState({
                bestPlay:currentBestPlay,
                isGamePlaying:false,
                recordSmashed,
                prevGameSolvedTimestamp:Date.now()
            })
        }
    }

    saveGamePlay(gameState){
        let gamePlays = this.storage.get('gamePlays',[])
        gamePlays.push(gameState)
        this.storage.set('gamePlays',gamePlays);
        return gamePlays;
    }

    sortGamePLays(gamePlays){
        return gamePlays.slice().sort((playA,playB) => {
            return playA.duration - playB.duration || playA.moveCounts - playB.moveCounts
        })
    }

    getBestGamePlay(gamePlays){
        let sortedGamePlays = this.sortGamePLays(gamePlays);
        return sortedGamePlays[0] || null;
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown.bind(this));
    }

    handleKeydown(e) {
        let moves = {
            39:'right',
            37:'left',
            38:'top',
            40:'down',
            87:'top',//w
            65:'left',//a
            83:'down',//s
            68:'right'//d
        }
        let direction = moves[e.keyCode]
        if (direction) {
            this.setState({
                puzzleSlide:{
                    direction,
                    timestamp:Date.now()
                }
            })
        }
    }

    showModal = () => {
        this.setState({ showSettingsPanel: true });
    }

    hideModal = () => {
        this.setState({ showSettingsPanel: false });
    }

    handleUserSettingsChange = userSettings => {
        this.setState({
            userSettings
        })
    }

    render(){
        let bestCard = null
        if (this.state.bestPlay) {
            let bestCardStyle = 'best';
            if (!this.state.isGamePlaying) {
                bestCardStyle += ' highlight';
            }
            if (this.state.recordSmashed) {
                bestCardStyle += ' flash';
            }
            bestCard = (
                <div className={bestCardStyle}>
                    <div className="flex-content-space-between">
                        <div className="flex-align-center">
                            <svg width="15" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M15 9a3 3 0 0 0 3-3h2a5 5 0 0 1-5.1 5 5 5 0 0 1-3.9 3.9V17l5 2v1H4v-1l5-2v-2.1A5 5 0 0 1 5.1 11H5a5 5 0 0 1-5-5h2a3 3 0 0 0 3 3V4H2v2H0V2h5V0h10v2h5v4h-2V4h-3v5z"/></svg>
                            <span className="best-stat-label">Best</span>
                        </div>
                        <div className="flex-align-center">
                            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M17 16a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4.01V4a1 1 0 0 1 1-1 1 1 0 0 1 1 1v6h1V2a1 1 0 0 1 1-1 1 1 0 0 1 1 1v8h1V1a1 1 0 1 1 2 0v9h1V2a1 1 0 0 1 1-1 1 1 0 0 1 1 1v13h1V9a1 1 0 0 1 1-1h1v8z" /></svg>
                            <span className="best-stat-label">{this.state.bestPlay.movesCount}</span>
                        </div>
                        <div className="flex-align-center">
                            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.32 7.1A8 8 0 1 1 9 4.06V2h2v2.06c1.46.18 2.8.76 3.9 1.62l1.46-1.46 1.42 1.42-1.46 1.45zM10 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM7 0h6v2H7V0zm5.12 8.46l1.42 1.42L10 13.4 8.59 12l3.53-3.54z" /></svg>
                            <span className="best-stat-label">{secondsToTimeString(this.state.bestPlay.duration)}</span>    
                        </div> 
                    </div>
                </div>
            )
        }
        return (
            <div id="app" className={this.state.userSettings.darkMode? 'dark-side':''}>
                <div className="container">
                    <br/>
                    <br/>
                    <div className="flex-content-space-between">
                        <div className="title"><span onDoubleClick={this.showModal}>15</span> Puzzle</div>
                        {bestCard}
                    </div>
                    <br/>
                    <Puzzle size={4}
                        theme={this.state.userSettings.theme} 
                        slide={this.state.puzzleSlide}
                        onStart={this.handleStart} 
                        onReset={this.handleReset} 
                        onSolved={this.handleSolved}></Puzzle>
                </div>
                <Settings
                    prevGameSolvedTimestamp={this.state.prevGameSolvedTimestamp} 
                    show={this.state.showSettingsPanel} 
                    onClose={this.hideModal} 
                    onUserSettingsChanged={this.handleUserSettingsChange}></Settings>
            </div>
        )
    }
}

export default Game;