type CellData = {
  nums: number[]; // id, q, r, s
  t: string | null;
};

const d = 10;
export const initialBoard = generateInitialBoard()

function generateInitialBoard(): number[][] {
  const arr = Array.from({ length: 2 * d + 1 }, (_, i) => i - d);
  let id = 0;
  return arr.flatMap(q => arr.map(r => {
      const s = -q - r;
      return arr.includes(s) ? [id++, q, r, s] : null;
    })
  ).filter(Boolean) as number[][];
}

const lines = initialBoard.reduce((lines, x) => {
  lines[0][x[1] + d].push(x[0]);
  lines[1][x[2] + d].push(x[0]);
  lines[2][x[3] + d].push(x[0]);
  return lines;
}, Array.from({ length: 3 },
  () => Array.from({ length: 2 * d + 1 },
    () => [] as number[])));

export function calculateWinner(id: number, board: CellData[]): number[] {
  const qrs = board[id].nums.slice(1)
  const t = board[id].t;

  for (let i = 0; i < 3; i++) {
    let count = 0;
    const ids = lines[i][qrs[i] + d];
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
