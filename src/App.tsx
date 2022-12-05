import { useCallback, useState } from 'react';
import Canvas from '@/components/Canvas/Canvas';
import { downloadAsPNG } from '@/services/Download.service';
import React from 'react';
import Sidebar from './components/Layouts/Sidebar/Sidebar';
import Navbar from './components/Layouts/Navbar/Navbar';

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
  const blockSize = 16; // TODO make that it works only as input for download methods
  // const blocksHorizontal = width / blockSize;
  // const blocksVertical = height / blockSize;
  const defaultGridSize = {
    width: 32,
    height: 32,
  }

  const [gridSize, setGridSize] = useState(defaultGridSize);
  const [penColor, setPenColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffffff');
  const [pixelBlocks, setPixelBlocks] = useState(getBlankPixels());

  function getBlankPixels() {
    const pixels = [];
    for (let rowIndex = 0; rowIndex < defaultGridSize.height; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < defaultGridSize.width; columnIndex++) {
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

  function handleSizeChange() {
    return
  }

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
      <Navbar />
      <div className='app-content'>
        <Sidebar
          handleSizeChange={handleSizeChange}
          handleClear={handleClear}
          pixelBlocks={pixelBlocks}
          width={width}
          height={height}
          blockSize={blockSize}
        />
        <Canvas
          pixels={pixelBlocks}
          handlePixelClick={handlePixelClick}
          gridHeight={gridSize.height}
          gridWidth={gridSize.width}
        />
      </div>
    </div>
  );
}

export default App;
