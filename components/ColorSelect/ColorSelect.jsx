import React, {useEffect, useState} from "react";
import ColorSelectStyles from "./ColorSelectStyles.jsx"
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import colors from "../../helpers/colors";
import ColorSquare from "../ColorSquare/ColorSquare";
import {useAppState} from "@bluechilli/bcstatemachine";

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: 8,
    overflow: 'auto',
});

const ColorSelect = () => {
    const foo = useAppState("selections");
    console.log("foo", foo);

    const onDragEnd = test => {
        console.log("TEST", test);
    };

    return (
        <>
            <ColorSelectStyles>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => {
                            return (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >
                                    {colors.map((col, key) => {
                                            return (
                                                <Draggable key={key} draggableId={col} index={key}>
                                                    {(provided, snapshot) => (
                                                        <ColorSquare provided={provided} col={col}/>
                                                    )}
                                                </Draggable>

                                            );
                                        }
                                    )}
                                </div>
                            )
                        }}

                    </Droppable>
                </DragDropContext>
            </ColorSelectStyles>
        </>
    );
};

export default ColorSelect;
