import React,{Component} from 'react'

class Board extends Component {

    renderSquare(cell){
        return <button className="square" key={cell.x + cell.y} onClick={_ => this.props.handleCellClick(cell)}>
            {this.props.grid[cell.x][cell.y]}
        </button>
    }
    render(){
        let board;
        board = this.props.grid.map((row,x) => {
            let boardRow = row.map((square,y) => {
                return this.renderSquare({x,y})
            })
            return (
                <div className="board-row" key={x}>
                    {boardRow}
                </div>   
            )
        })
        return (
            <div className="board">
            <div>
                {board}
            </div>
            </div>
        )
    }
}

export default Board