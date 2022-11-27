import { useCallback, useState } from 'react';
import Canvas from '@/components/Canvas/Canvas';
import { downloadAsPNG } from '@/services/Download.service';
import React from 'react';

export type HandleDivClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
) => void;

export type HandlePixelClick = (row: number, column: number) => HandleDivClick;

function App() {
  const [downloadButton, setDownloadButton] = useState({
    isDisabled: false,
    text: 'Save as png',
  });

  // TODO make those variables part of App's state using useState
  // and allow to alter them via UI
  const width = 512;
  const height = 512;
  const blockSize = 16;
  const blocksHorizontal = width / blockSize;
  const blocksVertical = height / blockSize;
  const bgColor = '#FFFFFF';
  const initialPixels = getBlankPixels();

  const [pixelBlocks, setPixelBlocks] = useState(initialPixels);
  const [penColor, setPenColor] = useState('#000000');

  function getBlankPixels() {
    const pixels = [];
    for (let rowIndex = 0; rowIndex < blocksVertical; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < blocksHorizontal; columnIndex++) {
        row.push(bgColor);
      }
      pixels.push(row);
    }
    return pixels;
  }

  const handlePixelClick: HandlePixelClick = useCallback(
    (rowIndex, columnIndex) => (e) => {
      if (e.buttons === 1) {
        const alterPixel = (currentPixelsState: string[][]) => {
          const newPixelsState = currentPixelsState.slice(0);
          const clonedTargetRow = currentPixelsState[rowIndex].slice(0);
          clonedTargetRow[columnIndex] = penColor;
          newPixelsState[rowIndex] = clonedTargetRow;
          return newPixelsState;
        };
        setPixelBlocks((pixelBlocks) => alterPixel(pixelBlocks));
      } else if (e.buttons === 2) {
        const erasePixel = (currentPixelsState: string[][]) => {
          const newPixelsState = currentPixelsState.slice(0);
          const clonedTargetRow = currentPixelsState[rowIndex].slice(0);
          clonedTargetRow[columnIndex] = bgColor;
          newPixelsState[rowIndex] = clonedTargetRow;
          return newPixelsState;
        };
        setPixelBlocks((pixelBlocks) => erasePixel(pixelBlocks));
      }
    },
    [penColor]
  );

  function handleClear() {
    const blankPixels = getBlankPixels();
    setPixelBlocks(blankPixels);
  }

  function handleDownloadClick() {
    setDownloadButton({
      ...downloadButton,
      isDisabled: true,
      text: 'Downloading should start soon',
    });
    const pixelData = {
      pixelBlocks,
      width,
      height,
      blockSize,
    };
    setTimeout(downloadAsPNG.bind(null, pixelData), 0);
    setTimeout(
      setDownloadButton.bind(null, {
        isDisabled: false,
        text: 'Save as png',
      }),
      0
    );
  }

  return (
    <div className='App'>
      <div className='panel'>
        <h1>Pixel Canvas</h1>
        <button id='clear' onClick={handleClear}>
          Clear
        </button>
      </div>
      <Canvas
        pixels={pixelBlocks}
        handlePixelClick={handlePixelClick}
        gridHeight={blocksVertical}
        gridWidth={blocksHorizontal}
      />
      <button
        id='save-img'
        onClick={handleDownloadClick}
        disabled={downloadButton.isDisabled}
      >
        {downloadButton.text}
      </button>
    </div>
  );
}

export default App;
