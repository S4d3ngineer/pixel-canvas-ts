import Pixel from '@/components/Canvas/Pixel/Pixel';
import { HandlePixelClick } from '@/App';

interface Props {
  pixels: string[][];
  handlePixelClick: HandlePixelClick;
  gridHeight: number;
  gridWidth: number;
}

function Canvas(props: Props) {
  function renderPixels() {
    const pixelComponents = [];
    for (let rowIndex = 0; rowIndex < props.gridHeight; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < props.gridWidth; columnIndex++) {
        row.push(
          <Pixel
            key={rowIndex + '.' + columnIndex}
            row={rowIndex}
            column={columnIndex}
            color={props.pixels[rowIndex][columnIndex]}
            onMouseEvent={props.handlePixelClick}
          />
        );
      }
      pixelComponents.push(row);
    }
    return pixelComponents;
  }

  return <div className='canvas'>{renderPixels()}</div>;
}

export default Canvas;
