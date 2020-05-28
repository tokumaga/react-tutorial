import React, { useState } from "react";
import {History, ISquare, Histories} from "../domain/entity";
import {calculateWinner, getStatus} from "../domain/services";
import Board from "./Board";


const Game = () => {
  const [Histories, setHistory] = useState<Histories>([
    { squares: Array<ISquare>(9).fill(null)}
  ]);

  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const handleClick = (i: number) => {
    const _history = Histories.slice(0, stepNumber + 1);
    const current = _history[_history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';

    setHistory(Histories.concat([{ squares }]));
    setStepNumber(Histories.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = Histories[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = Histories.map((step, move) => {
    const desc = move ?
        'Go to move #' + move :
        'Go to game start';
    return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
    );
  });

  const status = getStatus(winner, xIsNext);

  return (
      <div className="game">
        <div className="game-board">
          <Board
              squares={current.squares}
              onClick={handleClick}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
  );
};

export default Game;
