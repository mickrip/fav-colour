import React, {useEffect, useState} from "react";
import ColorSelectStyles from "./ColorSelectStyles.jsx"
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import colors from "../../helpers/colors";
import ColorSquare from "../ColorSquare/ColorSquare";
import {useAppState} from "@bluechilli/bcstatemachine";
import orderBy from "lodash/orderBy";

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: 8,
    overflow: 'auto',
});

const ColorSelect = () => {
    const {updateQuestion, currentQuestion} = useAppState("selections");
    const [localCurrentQuestion, setLocationCurrentQuestion] = useState([]);
    console.log("selectionsState", currentQuestion);

    useEffect(() => {
        updateQuestion();
    }, []);

    useEffect(() => {
        console.log("CQ is updated");
        const _lcc = currentQuestion.map((_q, _k) => {
            _q.index = _k;
            return _q;
        });
        setLocationCurrentQuestion(_lcc);
        console.log("L", _lcc);

    }, [currentQuestion]);

    const findKeyByIndex = i => {
        return localCurrentQuestion.findIndex(q => {
            return q.index === i;
        });
    };

    const swapIndex = (sourceIndex, destIndex) => {
        console.log("SWAPPING INDEX", sourceIndex, destIndex);
        const sourceKey = findKeyByIndex(sourceIndex);
        const destKey = findKeyByIndex(destIndex);
        const lcq = localCurrentQuestion;
        lcq[sourceKey].index = destIndex;
        lcq[destKey].index = sourceIndex;
        setLocationCurrentQuestion(lcq);
        console.log("----- source dest key", sourceKey, destKey);
    };

    const onDragEnd = test => {
        const swapSource = test.source.index;
        const swapDest = test.destination.index;

        swapIndex(swapSource, swapDest);

    };

    console.log("CRASH", localCurrentQuestion);
    const test2 = orderBy(localCurrentQuestion, "index");
    console.log("OVER", test2);
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
                                    {localCurrentQuestion.map((qdata, key) => {
                                            return (
                                                <Draggable key={key} draggableId={qdata.id.toString()} index={key}>
                                                    {(provided, snapshot) => (
                                                        <ColorSquare provided={provided} col={qdata.name}
                                                                     text={qdata.index}/>
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
