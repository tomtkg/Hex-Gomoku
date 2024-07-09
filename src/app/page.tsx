'use client';

import React, { useState } from 'react';
import { HexGrid, Layout, Hexagon, Text } from 'react-hexgrid';

const d = 10;

type CellData = {
  id: number;
  q: number;
  r: number;
  s: number;
  t: string | null;
  win: boolean;
};

type CellProps = {
  data: CellData;
  onSquareClick: (id: number) => void;
};

function Cell({ data, onSquareClick }: CellProps): JSX.Element {
  const cellClass = data.t === '×' ? 'cell_x' : data.t === '○' ? 'cell_o' : 'cell';
  const bgColor = data.win ? "#d3d3d3" : "#fff";
  return (
    <Hexagon q={data.q} r={data.r} s={data.s}
      style={{ fill: bgColor, stroke: "#000", strokeWidth: .2 }}
      onClick={() => onSquareClick(data.id)}>
      <Text className={cellClass}>{data.t}</Text>
    </Hexagon>
  );
}

function createInitialBoard(): CellData[] {
  const arr: number[] = Array.from({ length: 2 * d + 1 }, (_, i) => i - d);
  const board: CellData[] = [];
  let id = 0;

  for (let q of arr) {
    for (let r of arr) {
      const s = -q - r;
      if (arr.includes(s)) {
        board.push({ id, q, r, s, t: null, win: false });
        id++;
      }
    }
  }
  return board;
}

function checkLines(): number[][][] {
  const lines: number[][][] = Array.from({ length: 3 },
    () => Array.from({ length: 2 * d + 1 }, () => []));

  const arr: number[] = Array.from({ length: 2 * d + 1 }, (_, i) => i - d);
  let id = 0;

  for (let q of arr) {
    for (let r of arr) {
      const s = -q - r;
      if (arr.includes(s)) {
        lines[0][q + d].push(id);
        lines[1][r + d].push(id);
        lines[2][s + d].push(id);
        id++;
      }
    }
  }
  return lines;
}

function calculateWinner(id: number, board: CellData[]): number[] {
  const qrs = [board[id].q + d, board[id].r + d, board[id].s + d];
  const t = board[id].t;
  const lines = checkLines();

  for (let i = 0; i < 3; i++) {
    let count = 0;
    const ids = lines[i][qrs[i]];
    for (let j = 0; j < ids.length; j++) {
      if (board[ids[j]].t === t) {
        count++;
        if (count === 5) {
          return ids.slice(j - 4, j + 1);
        }
      } else {
        count = 0;
      }
    }
  }
  return [];
}

export default function Game() {
  const [board, setBoard] = useState<CellData[]>(createInitialBoard());
  const [history, setHistory] = useState<number[]>([]);
  const [win, setWin] = useState<number[]>([]);

  const step = history.length;
  const xIsNext = step % 2 === 0;

  function handleClick(id: number) {
    if (board[id].t || win.length > 0) {
      return;
    }

    board[id].t = xIsNext ? '×' : '○';
    const winner = calculateWinner(id, board);

    if (winner.length > 0) {
      setWin(winner);
      for (let winId of winner) {
        board[winId].win = true;
      }
    }

    setBoard(board);
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

    setBoard(board);
    setHistory(history.slice(0, step - 1));
  }

  const text = [
    <><div className="space">Next player</div><div className="text_o">○</div></>,
    <><div className="space">Next player</div><div className="text_x">×</div></>,
    <><div className="space">Winner</div><div className="text_x">×</div></>,
    <><div className="space">Winner</div><div className="text_o">○</div></>
  ]
  let textid = 0;
  if (win.length > 0) textid += 2;
  if (xIsNext) textid++;

  return (
    <>
      <h1>
        <span>Step {step}</span>{text[textid]}
        <button className="button" onClick={goBack} disabled={step <= 0}>Go back</button>
      </h1>
      <div className="game">
        <div>
          <HexGrid width={1000} height={800}>
            <Layout size={{ x: 3.1, y: 3.1 }} flat={false} spacing={1} >
              {board.map((cell, index) => (
                <Cell key={index} data={cell} onSquareClick={handleClick} />
              ))}
            </Layout>
          </HexGrid>
        </div>
      </div>
    </>
  );
}
