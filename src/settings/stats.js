import { secondsToTimeString } from "../puzzle/helpers";
import Storage from "../storage";

export default class Stats {

    constructor(){
        this.storage = new Storage()
        this.gamePlays = this.storage.get('gamePlays',[]);
    }

    sync(){
        this.gamePlays = this.storage.get('gamePlays',[]);
    }

    getAll(){ 
        let totalGamePlays = this.getTotalGamePlays();
        let totalTimeSpend = this.getTotalTimeSpend();
        let totalMoves = this.getTotalMovesCount();
        return {
            totalGamePlays,
            totalMoves,
            totalTimeSpendStr:this.timeFormatter(totalTimeSpend),
            averageMoves:totalGamePlays !== 0 ? Math.floor(totalMoves/totalGamePlays) : 0,
            averageTimeStr:totalGamePlays !== 0 ? secondsToTimeString(Math.floor(totalTimeSpend/totalGamePlays)) : '00:00' 
        }
    }

    getTotalTimeSpend(){
        return this.gamePlays.reduce((acc,item) => acc + item.duration,0);
    }

    wrap = (func) => (data) => func(data)

    timeFormatter = this.wrap(this.forHumans)

    getTotalTimeSpendHumanStr(){
        return this.timeFormatter(this.getTotalTimeSpend());
    }

    getTotalGamePlays(){
        return this.gamePlays.length;
    }

    getTotalMovesCount(){
        return this.gamePlays.reduce((acc,item) => acc + item.movesCount,0);
    } 

    forHumans(seconds) {
        var levels = [
            [Math.floor(seconds / 31536000), 'years'],
            [Math.floor((seconds % 31536000) / 86400), 'days'],
            [Math.floor(((seconds % 31536000) % 86400) / 3600), 'hrs'],
            [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'mins'],
            [(((seconds % 31536000) % 86400) % 3600) % 60, 'secs'],
        ];
        var returntext = '';

        if (levels[1][0] !== 0) {
            levels.splice(-2,2)
        } else if (levels[2][0] !== 0) {
            levels.splice(-1)
        }
    
        for (var i = 0, max = levels.length; i < max; i++) {
            if ( levels[i][0] === 0 ) continue;
            returntext += ' ' + levels[i][0] + ' ' + (levels[i][0] === 1 ? levels[i][1].substr(0, levels[i][1].length-1): levels[i][1]);
        };
        return returntext.trim();
    }

}