import React from 'react';
import Board from './Board';

/* Give all examples of winning combinations and determine if a combination has occurred */
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winnerRow: lines[i] };
    }
  }

  return { winner: null, winnerRow: null };
};



/* Find location of where last move occurred by giving each sqaure a value between 1-8 */
const getLocation = (move) => {
  const locationMap = {
    0: 'row: 1, col: 1',
    1: 'row: 1, col: 2',
    2: 'row: 1, col: 3',
    3: 'row: 2, col: 1',
    4: 'row: 2, col: 2',
    5: 'row: 2, col: 3',
    6: 'row: 3, col: 1',
    7: 'row: 3, col: 2',
    8: 'row: 3, col: 3',
  };

  return locationMap[move]; /* Show last location of player */
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      currentStepNumber: 0,
      xIsNext: true,
    };
  }




  handleClick(i) {
    const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([ /* History button (shows what has happened)*/
        {
          squares,
          currentLocation: getLocation(i),
          stepNumber: history.length,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      currentStepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({

      currentStepNumber: step,
      xIsNext: step % 2 === 0,

    });
  } /* Jump to is used to calculate which step number has occurred  */

  sortMoves() {
    this.setState({
      history: this.state.history.reverse(),
    });
  } /* it sorts a history from ascending to descending or descending to ascending based on the current array sort*/
  refreshButton()
  {
    window.location.reload();
  }
  render() {
    const { history } = this.state;
    const current = history[this.state.currentStepNumber]; /* Step number determines currentness of button*/
    const { winner, winnerRow } = calculateWinner(current.squares); /* Checks after every new step if a winner has been found*/

/* Shows the buttons on the side, and determines if winner has occurred*/
    const moves = history.map((step, move) => {
    const currentLocation = step.currentLocation ? `(${step.currentLocation})` : '';

    const desc = step.stepNumber ? `Go to move #${step.stepNumber}` : 'Go to game start';

    const classButton = move === this.state.currentStepNumber ? 'button--green' : '';
      return (
        <li key={step.stepNumber}>
          <button className={`${classButton} button`} onClick={() => this.jumpTo(move)}>
            {`${desc} ${currentLocation}`}
          </button>
        </li>
      );

    });

    let status;
    if (winner) {
      status = `Winner ${winner}`;
    } else if (history.length == 10) /* If 9 moves have occured and no winner is found then it is a draw*/ {
      status = 'Draw. No one won.';
    }
    else if (history.length > 10)
    {
      status = "Sorry, the game is broken."
    }
    else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }


    return ( /*Render all game elements */
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerSquares={winnerRow}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button className = "button"> Rules</button>
          <button className = "button" onClick = {() => window.location.reload()}> Restart Game</button>
          <button className="button" onClick={() => this.sortMoves()}>
            Sort moves
          </button>
          <ol>{moves}</ol>
          <div className = "Ownership">
          <p>By Shailen Sheth </p>
          </div>


        </div>
      </div>
    );
  }
}

export default Game;
