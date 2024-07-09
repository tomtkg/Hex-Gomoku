import { CellData } from './types';

const d = 10;
const arr: number[] = Array.from({ length: 2 * d + 1 }, (_, i) => i - d);
const lines = checkLines();

function checkLines(): number[][][] {
  const lines: number[][][] = Array.from({ length: 3 },
    () => Array.from({ length: 2 * d + 1 }, () => []));
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

export function createInitialBoard(): CellData[] {
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

export function calculateWinner(id: number, board: CellData[]): number[] {
  const qrs = [board[id].q + d, board[id].r + d, board[id].s + d];
  const t = board[id].t;

  for (let i = 0; i < 3; i++) {
    let count = 0;
    const ids = lines[i][qrs[i]];
    for (let j = 0; j < ids.length; j++) {
      if (board[ids[j]].t === t) {
        count++;
        if (count === 5) return ids.slice(j - 4, j + 1);
      } else {
        count = 0;
      }
    }
  }
  return [];
}
