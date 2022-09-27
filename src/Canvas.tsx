import Pixel from "./Pixel";
import { HandlePixelClick } from "./App";

interface Props {
  pixels: string[][];
  onMouseEvent: HandlePixelClick;
  gridHeight: number;
  gridWidth: number;
}

function Canvas(props: Props) {
  function renderPixels() {
    const pixelComponents = []
    for (let i = 0; i < props.gridHeight; i++) {
      const row = [];
      for (let j = 0; j < props.gridWidth; j++) {
        row.push(
          <Pixel
            key={i + '.' + j}
            color={props.pixels[i][j]}
            onMouseEvent={props.onMouseEvent(i, j)}
          />
        );
      }
      pixelComponents.push(row);
    }
    return pixelComponents;
  }

  return (
    <div className="canvas">
      {renderPixels()}
    </div>
  );
}

export default Canvas
