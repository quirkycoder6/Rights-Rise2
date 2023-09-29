import React, { useState } from 'react';
import { JigsawPuzzle } from 'react-jigsaw-puzzle';
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';

function PuzzleCreator() {
  const [imageSrc, setImageSrc] = useState('');
  const [puzzleCreated, setPuzzleCreated] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
      setPuzzleCreated(true);
    }
  };

  return (
    <div>
      <h2>Create a Jigsaw Puzzle</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {puzzleCreated && (
        <JigsawPuzzle imageSrc={imageSrc} rows={3} columns={3} />
      )}
    </div>
  );
}

export default PuzzleCreator;
