import React from "react";

export default function Pixel(props){
  const color = props.color;

  return (
    <div
      className="pixel"
      style={{ background: color }}
      onMouseOver={props.onMouseEvent}
      onMouseDown={props.onMouseEvent}
      // Prevent default events behaviour, so it is not inerrupting drawing
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onDragEnd={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
    >
    </div>
    );
}
