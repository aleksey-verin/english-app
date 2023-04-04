/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { selectorDictionary } from '../../store/reducers/dictionarySlice';

const TrainingOne = () => {
  console.log('render training one');
  // const dispatch = useDispatch();

  const { trainingList, trainingListLength, isLoading } = useSelector(selectorDictionary);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [userRightAnswers, setUserRightAnswers] = useState([]);

  console.log(trainingList);
  if (isLoading || !trainingList) return <Loader />;

  const question = trainingList[questionNumber].question;
  const questionDefinition = question.definition;
  const questionWord = question.word;
  const answers = trainingList[questionNumber].answers;

  const handleAnswer = (answer) => {
    if (answer === questionWord) {
      console.log('rigth!');
      setUserRightAnswers([...userRightAnswers, question]);
    } else {
      console.log('Wrong!');
    }
    if (questionNumber < trainingListLength - 1) {
      setQuestionNumber((questionNumber) => questionNumber + 1);
    } else {
      setIsTestCompleted(true);
    }
  };

  return (
    <main className="main">
      <div className="test">
        <h1>Training</h1>
      </div>
      <div className="test-title">Choose the right word for the meaning:</div>
      <div className="test-definition">{questionDefinition}</div>
      {isTestCompleted ? (
        <div className="test-results">{`You answered ${userRightAnswers.length} out of 10 questions correctly`}</div>
      ) : (
        <div className="test-answers">
          {answers.map((item, i) => {
            return (
              <div key={i} className="test-item" onClick={() => handleAnswer(item.word)}>
                {item.word}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
export default TrainingOne;
// // for (let i = dictionaryForAnswers.length - 1; i > 0; i--) {
// //   let j = Math.floor(Math.random() * (i + 1))
// //   ;[dictionaryForAnswers[i], dictionaryForAnswers[j]] = [dictionaryForAnswers[j], dictionaryForAnswers[i]]
