import React,{Component} from "react";
import Puzzle from "./puzzle/Puzzle";
import Storage from "./storage";
import './game.css'
import { secondsToTimeString } from "./puzzle/helpers";

class Game extends Component {

    constructor(props){
        super(props)
        this.storage = new Storage();
        let bestPlay = this.getBestGamePlay(this.storage.get('gamePlays',[]))
        this.state = {
            bestPlay
        }
    }

    handleSolved(gameState){
        let bestPlay = this.getBestGamePlay(this.saveGamePlay(gameState));
        if (bestPlay) {
            this.setState({
                bestPlay
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

    render(){
        let bestCard = null
        if (this.state.bestPlay) {
            bestCard = (
                <div className="best">
                    <div className="best-title">
                        BEST
                    </div>
                    <div className="flex-content-space-between">
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
        <div className="container">
            <br/>
            <div className="flex-content-space-between">
                <div><h2 className="heading m-none">15 Puzzle</h2></div>
                {bestCard}
            </div>
            <br/>
            <Puzzle size={4} onSolved={gameState => this.handleSolved(gameState)}></Puzzle>
        </div>
        )
    }
}

export default Game;