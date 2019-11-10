import React, { useEffect, useState } from 'react';
import ColorSelectStyles from './ColorSelectStyles.jsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ColorSquare from '../ColorSquare/ColorSquare';
import { useAppState } from '@bluechilli/bcstatemachine';
import { animSlideRightLeft, Appear } from '@bluechilli/appear';
import ColorSelectStylesInner from './ColorSelectStylesInner';
import LookupTable from '../LookupTable/LookupTable';
import { TOP } from '../../helpers/chooser';
import Button from '../Button/Button';
import ButtonContainerStyles from './ButtonContainerStyles';

const getListStyle = _ => ({
  display: 'flex',
  padding: 8,
  overflow: 'auto',
});

const ColorSelect = () => {
  const { updateQuestion, currentQuestion, updateAnswers, finished } = useAppState(
    'selections'
  );
  const [localCurrentQuestion, setLocationCurrentQuestion] = useState([]);
  const [showBlocks, setShowBlocks] = useState(false);

  useEffect(() => {
    updateQuestion();
    setShowBlocks(true);
  }, []);

  useEffect(() => {
    setLocationCurrentQuestion(currentQuestion);
  }, [currentQuestion]);

  const reorder = (startIndex, endIndex) => {
    const result = Array.from(localCurrentQuestion);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = res => {
    if (!res.destination) {
      return;
    }

    setLocationCurrentQuestion(reorder(res.source.index, res.destination.index));
  };

  return (
    <>
      <ColorSelectStyles>
        <Appear show={showBlocks && !finished} anim={animSlideRightLeft}>
          <ColorSelectStylesInner>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="colors" direction="horizontal" type="color">
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {localCurrentQuestion.map((qdata, key) => {
                        if (!qdata) return;

                        return (
                          <Draggable
                            shouldRespectForcePress={true}
                            key={qdata.id}
                            draggableId={qdata.id + 1}
                            index={key}
                          >
                            {(dragprovided, dragsnapshot) => (
                              <>
                                <ColorSquare
                                  provided={dragprovided}
                                  snapshot={dragsnapshot}
                                  col={qdata.name}
                                />
                              </>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </DragDropContext>
          </ColorSelectStylesInner>
        </Appear>
        <ButtonContainerStyles>
          <Appear show={!finished}>
            <Button
              onClick={() => {
                setShowBlocks(false);

                setTimeout(() => {
                  const answerKey = localCurrentQuestion.map(q => {
                    return q.id;
                  });
                  updateAnswers(answerKey);
                  setShowBlocks(true);
                }, 500);

                //console.log('CLICK', answerKey);
              }}
            >
              Next 🠞
            </Button>
          </Appear>
        </ButtonContainerStyles>
      </ColorSelectStyles>

      <LookupTable />
    </>
  );
};

export default ColorSelect;
