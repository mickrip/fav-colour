import { useState, useEffect } from 'react';
import colors from '../helpers/colors';
import {
  getLookupTable,
  getNextQuestion,
  howManyLeft,
  processAnswers,
} from '../helpers/chooser';

const selections = () => {
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [lookupTable, setLookupTable] = useState([]);
  const [hml, setHml] = useState(Infinity);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setFinished(hml <= 5);
  }, [hml]);

  const updateAnswers = arr => {
    processAnswers(arr);
    updateQuestion();
  };

  const updateQuestion = () => {
    const result = getNextQuestion();
    setCurrentQuestion(result);
    setLookupTable(getLookupTable());
    setHml(howManyLeft());
  };

  return {
    updateQuestion,
    updateAnswers,
    currentQuestion,
    colors,
    lookupTable,
    howManyLeft: hml,
    finished,
  };
};

export default selections;
