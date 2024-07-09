import React from 'react';

type GameControlsProps = {
  step: number;
  goBack: () => void;
  resetGame: () => void;
};

export function GameControls({ step, goBack, resetGame }: GameControlsProps): JSX.Element {
  return (
    <div className="game_controls">
      <button className="button" onClick={goBack} disabled={step <= 0}>Go back</button>
      <button className="button" onClick={resetGame} disabled={step <= 0}>Reset</button>
    </div>
  );
}
