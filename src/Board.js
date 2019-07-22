import React from 'react';
import Square from './Square';



class Board extends React.Component {
  createBoard(row, col) {
    const board = [];
    let cellCounter = 0;

    for (let i = 0; i < row; i += 1) {
      const columns = [];
      for (let j = 0; j < col; j += 1) {
        columns.push(this.renderSquare(cellCounter++));
      }
      board.push(<div key={i} className="board-row">{columns}</div>);
    }

    return board; //Renders a board using a double for-loop to make the table instead of hardcoding it.
  }

  renderSquare(i) {
    const winnerClass =
      this.props.winnerSquares &&
      (this.props.winnerSquares[0] === i ||
        this.props.winnerSquares[1] === i ||
        this.props.winnerSquares[2] === i)
        ? 'square--green'
        : '';

    return (
      <Square
        winnerClass={winnerClass}
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return <div>{this.createBoard(3, 3)}</div>; //Renders a board with 3 rows and 3 columns
  }
}

export default Board;
