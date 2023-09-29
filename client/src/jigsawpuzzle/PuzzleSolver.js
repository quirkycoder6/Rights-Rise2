
import React from 'react';
import { JigsawPuzzle } from 'react-jigsaw-puzzle';
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';

function PuzzleSolver({ imageSrc }) {
  return (
    <div>
      <h2>Solve the Jigsaw Puzzle</h2>
      <JigsawPuzzle imageSrc={imageSrc} rows={3} columns={3} />
    </div>
  );
}

export default PuzzleSolver;
