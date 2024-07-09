import React from 'react';
import { Hexagon, Text } from 'react-hexgrid';
import { CellData } from './types';

type CellProps = {
  data: CellData;
  onSquareClick: (id: number) => void;
};

export function Cell({ data, onSquareClick }: CellProps): JSX.Element {
  let cellClass = '';
  if (data.t === '×') cellClass = 'cell_x';
  if (data.t === '○') cellClass = 'cell_o';
  const bgColor = data.win ? "#d3d3d3" : "#ffffff";

  return (
    <Hexagon q={data.q} r={data.r} s={data.s}
      style={{ fill: bgColor, stroke: "#000000", strokeWidth: .2 }}
      onClick={() => onSquareClick(data.id)}>
      <Text className={cellClass}>{data.t}</Text>
    </Hexagon>
  );
}
