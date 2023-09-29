
import React, { useState } from 'react';
import PuzzleCreator from './PuzzleCreator';
import PuzzleSolver from './PuzzleSolver';

function Jigsaw() {
  const [uploadedImageSrc, setUploadedImageSrc] = useState('');

  return (
    <div className="App">
      {uploadedImageSrc ? (
        <PuzzleSolver imageSrc={uploadedImageSrc} />
      ) : (
        <PuzzleCreator setUploadedImageSrc={setUploadedImageSrc} />
      )}
    </div>
  );
}

export default Jigsaw;
