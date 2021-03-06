import React,{Component} from 'react'
import './puzzle.css'
import './ribbon.css'
import './themes.css'
import Board from './Board';

import {range,isOrdered,shuffle,secondsToTimeString,deepCopy} from "./helpers";

class Puzzle extends Component {

    constructor(props){
        super(props)
        this.state = this.getInitialPuzzleState(props.size)
    }

    getInitialPuzzleState(size){
        return {
            grid:this.makeShuffledGrid(size),
            duration:0,
            movesCount:0,
            gameWon:false,
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

    getNeighbours(cell,grid){
        cell = {...cell}
        grid = [...grid]
        let neighbours = [
            {
                cell:{x:cell.x, y:cell.y - 1},
                position:'left'
            },
            {
                cell:{x:cell.x, y:cell.y + 1},
                position:'right'
            },
            {
                cell:{x:cell.x - 1, y:cell.y},
                position:'top'
            },
            {
                cell:{x:cell.x + 1, y:cell.y},
                position:'down'
            },
        ]
        return neighbours.filter(neighbour => this.isAValidGridCell(grid)(neighbour.cell));
    }

    isAValidGridCell = grid => cell => cell.x >= 0 && cell.y >= 0 && cell.x < grid.length && cell.y < grid.length

    findEmptyCellAmong(cells,grid){
        return cells.find(cell => grid[cell.x][cell.y] === null)
    }

    findEmptyCellOnGrid(grid){
        let x,y;
        x = grid.findIndex(row => row.includes(null))
        y = grid[x].findIndex(square => square === null)
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

    moveEmptyCellTo(direction){
        if (!direction) {
            return
        }
        let grid = this.state.grid
        let emptyCell = this.findEmptyCellOnGrid(grid);
        let neighbours = this.getNeighbours(emptyCell,grid);
        let neighbour = neighbours.find(neighbour => neighbour.position === direction);
        if (neighbour) {
            this.handleCellClick(neighbour.cell)
        }
    }

    slideTo(direction){
        let invertedDirection={
            'top':'down',
            'down':'top',
            'left':'right',
            'right':'left'
        }
        this.moveEmptyCellTo(invertedDirection[direction])
    }

    reset = () => {
        this.setState(
            this.getInitialPuzzleState(this.props.size)
            ,_ => {
                this.props.onReset({
                    duration:this.state.duration,
                    movesCount:this.state.movesCount
                })
            })
        clearInterval(this.interval);
        this.interval = null;
    }

    handleCellClick = (cell) => {

        let grid = this.state.grid
        let emptyNeighbour,gameWon = this.state.gameWon;

        if (!this.interval) {
            this.interval = setInterval(() => this.tick(), 1000);
            this.props.onStart({
                grid:deepCopy(grid)
            })
        }

        if (gameWon) {
            return
        }
        emptyNeighbour = this.findEmptyCellAmong(this.getNeighbourCells(cell,grid),grid);
        if (emptyNeighbour) {
            grid = this.slideCell(cell,emptyNeighbour,grid);
            if (this.isGridOrdered(grid)) {
                gameWon = true;
                clearInterval(this.interval);
            }
            this.setState({
                grid,
                movesCount:this.state.movesCount + 1,
                gameWon,
            },_ => {
                if (this.state.gameWon) {
                    this.props.onSolved({
                        duration:this.state.duration,
                        movesCount:this.state.movesCount
                    })
                }
            })
        }
        
    }

    tick(){
        this.setState(state => ({
            duration: state.duration + 1
        }));
    }

    render(){
        return(
            <div className={this.props.theme}>
                <Board grid={this.state.grid} handleCellClick={this.handleCellClick}></Board>
                <br />
                <br />
                <div className="stats-board">
                    <div className="stat">
                        <svg width="20" height="19" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M17 16a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4.01V4a1 1 0 0 1 1-1 1 1 0 0 1 1 1v6h1V2a1 1 0 0 1 1-1 1 1 0 0 1 1 1v8h1V1a1 1 0 1 1 2 0v9h1V2a1 1 0 0 1 1-1 1 1 0 0 1 1 1v13h1V9a1 1 0 0 1 1-1h1v8z" /></svg>
                        <span className="stat-label">{this.state.movesCount}</span>
                    </div>
                    <div className="stat">
                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.32 7.1A8 8 0 1 1 9 4.06V2h2v2.06c1.46.18 2.8.76 3.9 1.62l1.46-1.46 1.42 1.42-1.46 1.45zM10 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM7 0h6v2H7V0zm5.12 8.46l1.42 1.42L10 13.4 8.59 12l3.53-3.54z" /></svg>
                        <span className="stat-label">{secondsToTimeString(this.state.duration)}</span>
                    </div>
                </div>
                { this.state.gameWon?
                    <div className="center pt-30">
                        <div className="roman-ribbon ooz-in">
                            <span>Puzzle Solved</span>
                        </div>
                    </div>
                    :null }
                <div className="center pt-30">
                    <button className="btn" onClick={this.reset}>Shuffle</button>
                </div>
            </div>
            )
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.slide.timestamp !== prevProps.slide.timestamp){
            this.slideTo(this.props.slide.direction)
        }
    }
}

export default Puzzle