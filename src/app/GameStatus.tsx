import React from 'react';

type GameStatusProps = {
  step: number;
  win: number[];
};

const text = [
  <><div className="text">Next player<div className="text_o">○</div></div></>,
  <><div className="text">Next player<div className="text_x">×</div></div></>,
  <><div className="text_win">Winner<div className="text_x">×</div></div></>,
  <><div className="text_win">Winner<div className="text_o">○</div></div></>
];

export function GameStatus({ step, win }: GameStatusProps): JSX.Element {
  let textid = 0;
  if (win.length > 0) textid += 2;
  if (step % 2 === 0) textid++;

  return <div className="game_status"><span>Step {step}</span>{text[textid]}</div>;
}
