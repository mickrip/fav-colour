import React, {useEffect, useState} from "react";
import ColorSquareStyles from "./ColorSquareStyles.jsx"

const ColorSquare = ({provided, col, text}) => {
    return (
        <div ref={provided.innerRef}
             {...provided.draggableProps}
             {...provided.dragHandleProps}>
            <ColorSquareStyles col={col}>{text}</ColorSquareStyles>
        </div>
    );
};

export default ColorSquare;
