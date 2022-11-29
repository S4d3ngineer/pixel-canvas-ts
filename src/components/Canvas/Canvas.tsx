import Pixel from '@/components/Canvas/Pixel/Pixel';
import { HandlePixelClick } from '@/App';
import s from './Canvas.module.scss';

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
      for (let columnIndex = 0; columnIndex < props.gridWidth; columnIndex++) {
        pixelComponents.push(
          <Pixel
            key={rowIndex + '.' + columnIndex}
            row={rowIndex}
            column={columnIndex}
            color={props.pixels[rowIndex][columnIndex]}
            onMouseEvent={props.handlePixelClick}
          />
        );
      }
    }
    return pixelComponents;
  }

  return (
    <div className={s.container}>
      <div className={s.background}></div>
      <div className={s.canvas}>{renderPixels()}</div>
    </div>
  )
}

export default Canvas;
