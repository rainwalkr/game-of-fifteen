import React,{Component} from 'react'
import './puzzle.css'
import Board from './Board';

import {range,isOrdered,shuffle} from "./helpers";

class Puzzle extends Component {

    constructor(props){
        super(props)
        this.state = {
            grid:this.makeShuffledGrid(props.size),
            duration:0,
            movesCount:0,
            gameWon:false
        }
    }

    makeGrid(size,values) {
        return Array(size).fill(null).map((_,index) => {
            let start = index * size
            let end = start + size
            return values.slice(start,end);
        })
    }

    makeInitialGrid(size){
        return this.makeGrid(size,[...range(1,Math.pow(size,2) - 1),null])
    }

    makeShuffledGrid(size){
        let grid = this.makeGrid(size,[...shuffle(range(1,Math.pow(size,2) - 1)),null])
        if (!this.isGridWinnable(grid)) {
            return this.makeShuffledGrid(size)
        }
        return grid
    }
    /**
     * Only half of all arrangements(16!/2) is solvable , and that is above 10 billion
     * 
     * Grid arrangements solvability checking equation
     * http://mathworld.wolfram.com/15Puzzle.html
     */
    isGridWinnable(grid){
        let values = grid.reduce((values,row) => [...values,...row])
                        .filter(value => value !== null)
        let inversionSum = values.reduce((sum,value,currentIndex,allValues) => {
            let behindValues = allValues.slice(currentIndex)
            let inversion = behindValues.filter(behindValue => behindValue < value)
            return sum + inversion.length
        },0)
        return inversionSum % 2 === 0
    }

    isGridOrdered(grid){
        let gridSize = grid.length;
        let values = grid.reduce((values,row) => [...values,...row])
                        .filter(value => value !== null)
        return isOrdered(values) && grid[gridSize - 1][gridSize - 1] === null
    }

    getNeighbourCells(cell,grid){
        cell = {...cell}
        grid = [...grid]
        let neighbours = [
            {x:cell.x - 1, y:cell.y},
            {x:cell.x + 1, y:cell.y},
            {x:cell.x, y:cell.y - 1},
            {x:cell.x, y:cell.y + 1},
        ]
        return neighbours.filter(this.isAValidGridCell(grid));
    }

    isAValidGridCell = grid => cell => cell.x >= 0 && cell.y >= 0 && cell.x < grid.length && cell.y < grid.length

    findEmptyCell(cells,grid){
        return cells.find(cell => grid[cell.x][cell.y] === null)
    }

    findEmptyCellOnGrid(grid){
        let x,y;
        y = grid.findIndex(row => row.includes(null))
        x = grid[y].findIndex(square => square === null)
        return {x,y}
    }

    swapCellValues(cellOne,cellTwo,grid){
        grid = [...grid]
        let temp = grid[cellOne.x][cellOne.y];
        grid[cellOne.x][cellOne.y] = grid[cellTwo.x][cellTwo.y]
        grid[cellTwo.x][cellTwo.y] = temp
        return grid;
    }
    
    slideCell(cell,emptyCell,grid){
        return this.swapCellValues(cell,emptyCell,grid)
    }

    resetGame = () => {
        this.setState({
            grid:this.makeShuffledGrid(this.props.size),
            duration:0,
            movesCount:0,
            gameWon:false
        })
        clearInterval(this.interval);
    }

    handleCellClick = (cell) => {
        if (!this.interval) {
            this.interval = setInterval(() => this.tick(), 1000);
        }
        let grid = this.state.grid
        let emptyNeighbour,gameWon = this.state.gameWon;

        if (gameWon) {
            return
        }
        emptyNeighbour = this.findEmptyCell(this.getNeighbourCells(cell,grid),grid);
        if (emptyNeighbour) {
            grid = this.slideCell(cell,emptyNeighbour,grid);
            if (this.isGridOrdered(grid)) {
                gameWon = true;
                clearInterval(this.interval);
            }
            this.setState({
                grid,
                movesCount:this.state.movesCount + 1,
                gameWon
            })
        }
        
    }

    tick(){
        this.setState(state => ({
            duration: state.duration + 1
        }));
    }

    secondsToTimeString(seconds){
        var date = new Date(null);
        date.setSeconds(seconds);
        return date.toISOString().substr(14, 5);
    }


    render(){
        return(
            <div>
                <Board grid={this.state.grid} handleCellClick={this.handleCellClick}></Board>
                <p><strong>Moves</strong> {this.state.movesCount} </p>
                <p><strong>Duration</strong> {this.secondsToTimeString(this.state.duration)} </p>
                { this.state.gameWon? <h4>Game Won</h4>:null }
                <br/>
                <button onClick={this.resetGame}>Reset</button>
            </div>
            )
    }
}

export default Puzzle