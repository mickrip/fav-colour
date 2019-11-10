import React from 'react';
import ColorSquareStyles from './ColorSquareStyles.jsx';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  ...draggableStyle,
});

const ColorSquare = ({ provided, snapshot, col, text }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <ColorSquareStyles col={col}>{text}</ColorSquareStyles>
    </div>
  );
};

export default ColorSquare;
/*

 */
