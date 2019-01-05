import React,{Component} from 'react'

class Board extends Component {

    renderSquare(cell){
        let cellClass = 'square';
        if (!this.props.grid[cell.x][cell.y]) {
            cellClass+=' empty';
        }
        return <div className={cellClass} key={cell.x + cell.y} onClick={_ => this.props.handleCellClick(cell)}>
            {this.props.grid[cell.x][cell.y]}
        </div>
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
                {board}
            </div>
        )
    }
}

export default Board