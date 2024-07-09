import React, { useState } from 'react';
import { HexGrid, Layout } from 'react-hexgrid';
import { Cell } from './Cell';
import { createInitialBoard, calculateWinner } from './utils';
import { CellData } from './types';
import { GameStatus } from './GameStatus';
import { GameControls } from './GameControls';

export function Board(): JSX.Element {
  const [board, setBoard] = useState<CellData[]>(createInitialBoard());
  const [history, setHistory] = useState<number[]>([]);
  const [win, setWin] = useState<number[]>([]);
  const step = history.length;

  function handleClick(id: number) {
    if (board[id].t || win.length > 0) {
      return;
    }

    board[id].t = step % 2 === 0 ? '×' : '○';
    const winner = calculateWinner(id, board);

    if (winner.length > 0) {
      for (let winId of winner) {
        board[winId].win = true;
      }
      setWin(winner);
    }
    setBoard([...board]);
    setHistory([...history, id]);
  }

  function goBack() {
    const id = history[step - 1];
    board[id].t = null;

    if (win.length > 0) {
      for (let winId of win) {
        board[winId].win = false;
      }
      setWin([]);
    }
    setBoard([...board]);
    setHistory(history.slice(0, step - 1));
  }

  function resetGame() {
    setBoard(createInitialBoard());
    setHistory([]);
    setWin([]);
  }

  return (
    <>
      <div className="game_header">
        <GameStatus step={step} win={win} />
        <GameControls step={step} goBack={goBack} resetGame={resetGame} />
      </div>
      <div className="game">
        <HexGrid width="100%" height="100%" viewBox={"-50 -42 100 84"}>
          <Layout size={{ x: 2.5, y: 2.5 }} flat={false} spacing={1} >
            {board.map((cell, index) => (
              <Cell key={index} data={cell} onSquareClick={handleClick} />
            ))}
          </Layout>
        </HexGrid>
      </div>
    </>
  );
}
