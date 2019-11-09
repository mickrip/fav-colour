import {useState, useEffect} from 'react';
import colors from "../helpers/colors";
import {getNextQuestion} from "../helpers/chooser";


const selections = () => {

    const [currentQuestion, setCurrentQuestion] = useState([]);

    useEffect(() => {
        // const help = getNextQuestion();
    }, []);

    const updateQuestion = () => {
        const result = getNextQuestion();
        setCurrentQuestion(result);
    };

    return {
        updateQuestion,
        currentQuestion,
        colors
    }


};

export default selections;
