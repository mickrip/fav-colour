import React, {useEffect, useState} from "react";
import ColorSquareStyles from "./ColorSquareStyles.jsx"

const ColorSquare = ({provided, col}) => {
    return (
        <div ref={provided.innerRef}
             {...provided.draggableProps}
             {...provided.dragHandleProps}>
            <ColorSquareStyles col={col}/>
        </div>
    );
};

export default ColorSquare;
