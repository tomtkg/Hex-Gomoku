import React from 'react';
import { Hexagon, Text } from 'react-hexgrid';

type CellProps = {
  data: {
    nums: number[]; // id, q, r, s
    t: string | null;
    win: boolean;
  }
  onClick: (id: number) => void;
};

export function Cell({ data, onClick }: CellProps): import("@emotion/react/jsx-runtime").JSX.Element {
  return (
    <Hexagon q={data.nums[1]} r={data.nums[2]} s={data.nums[3]} onClick={() => onClick(data.nums[0])}
      style={{ fill: data.win ? "#d3d3d3" : "#ffffff", stroke: "#000000", strokeWidth: .2 }}>
      <Text className={data.t === '×' ? 'cell_x' : 'cell_o'}>{data.t}</Text>
    </Hexagon>
  );
}
