import React from 'react';
import { HandlePixelClick } from '@/App';
import s from './Pixel.module.scss';

interface Props {
  row: number;
  column: number;
  color: string;
  onMouseEvent: HandlePixelClick;
}

function Pixel(props: Props) {
  return (
    <div
      className={s.pixel}
      style={{ background: props.color }}
      onMouseOver={props.onMouseEvent(props.row, props.column)}
      onMouseDown={props.onMouseEvent(props.row, props.column)}
      // Prevent default events behaviour, so it is not inerrupting drawing
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onDragEnd={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
    ></div>
  );
}

export default React.memo(Pixel);
