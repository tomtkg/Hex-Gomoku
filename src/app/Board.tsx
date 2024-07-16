import React, { useState } from 'react';
import { HexGrid, Layout } from 'react-hexgrid';
import { Cell } from './Cell';
import { initialBoard, calculateWinner } from './utils';
import { GameStatus } from './GameStatus';
import { GameControls } from './GameControls';

export function Board(): JSX.Element {
  const [history, setHistory] = useState<number[]>([]);
  const [win, setWin] = useState<number[]>([]);
  const step = history.length;

  const board = initialBoard.map((nums, id) => {
    const hStep = history.findIndex(hId => hId === id);
    const t = hStep === -1 ? null :
      hStep % 2 === 0 ? '×' : '○';
    return { nums, t, win: win.includes(id) };
  });

  function handleClick(id: number) {
    if (board[id].t || win.length > 0) return;

    board[id].t = step % 2 === 0 ? '×' : '○';
    setWin(calculateWinner(id, board));
    setHistory([...history, id]);
  }

  return (
    <>
      <div className="game_header">
        <GameStatus step={step} win={win} />
        <GameControls step={step}
          goBack={function () { setWin([]); setHistory(history.slice(0, step - 1)) }}
          resetGame={function () { setWin([]); setHistory([]) }}
        />
      </div>
      <div className="game">
        <HexGrid width="100%" height="100%" viewBox={"-50 -42 100 84"}>
          <Layout size={{ x: 2.5, y: 2.5 }} flat={false} spacing={1} >
            {board.map((cell, id) =>
              <Cell key={id} data={cell} onClick={handleClick} />
            )}
          </Layout>
        </HexGrid>
      </div>
    </>
  );
}
