/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { getDictionary, selectorDictionary } from '../../store/reducers/dictionarySlice';
import { Link } from 'react-router-dom';
import { TRAINING_ROUTE } from '../../routes/routes';
import { updateScoreInDictionary } from '../../store/reducers/updateScoreInDictionarySlice';
import { useDispatch } from 'react-redux';
import ScoreTitle from '../../components/common UI/ScoreTitle';

const initialStateTraining = {
  questionNumber: 0,
  isTestCompleted: false,
  userRightAnswers: []
};

const TrainingOne = () => {
  console.log('render training one');
  const dispatch = useDispatch();

  const { userDictionary, trainingList, trainingListLength, isLoading } =
    useSelector(selectorDictionary);
  const [questionNumber, setQuestionNumber] = useState(initialStateTraining.questionNumber);
  const [isTestCompleted, setIsTestCompleted] = useState(initialStateTraining.isTestCompleted);
  const [userRightAnswers, setUserRightAnswers] = useState(initialStateTraining.userRightAnswers);

  console.log(trainingList);
  if (isLoading || !trainingList) return <Loader />;

  const question = trainingList[questionNumber].question;
  const questionDefinition = question.definition;
  const questionWord = question.word;
  const answers = trainingList[questionNumber].answers;

  const handleAnswer = (event, answer) => {
    const answerElement = event.target;
    if (answer === questionWord) {
      console.log('rigth!');
      setUserRightAnswers([...userRightAnswers, question]);
      answerElement.style.backgroundColor = 'lightgreen';
    } else {
      console.log('Wrong!');
      answerElement.style.backgroundColor = 'lightcoral';
    }
    setTimeout(() => {
      if (questionNumber < trainingListLength - 1) {
        setQuestionNumber((questionNumber) => questionNumber + 1);
      } else {
        setIsTestCompleted(true);
        dispatch(updateScoreInDictionary({ userDictionary, userRightAnswers }));
        dispatch(getDictionary());
      }
      answerElement.style.backgroundColor = '';
    }, 1000);
  };

  const handleStartOverAgain = () => {
    setQuestionNumber(initialStateTraining.questionNumber);
    setIsTestCompleted(initialStateTraining.isTestCompleted);
    setUserRightAnswers(initialStateTraining.userRightAnswers);
  };
  const handleStartNewTest = () => {
    setQuestionNumber(initialStateTraining.questionNumber);
    setIsTestCompleted(initialStateTraining.isTestCompleted);
    setUserRightAnswers(initialStateTraining.userRightAnswers);
  };

  // const stylesForAnswer = {
  //   correct: {
  //     backgroundColor: 'lightgreen'
  //   },
  //   wrong: {
  //     backgroundColor: 'lightcoral'
  //   }
  // };

  return (
    <main className="main">
      <div className="title">
        <h1>
          <span>«Definition - Words»</span>
        </h1>
        <ScoreTitle />
      </div>
      <div className="test-title">Choose the right word for the meaning:</div>

      {isTestCompleted ? (
        <div className="test-results">
          <div className="test-results__title">{`You answered ${userRightAnswers.length} out of 10 questions correctly`}</div>
          <div className="test-results__actions">
            <button onClick={handleStartNewTest} className="btn">
              Start a new test
            </button>
            <Link to={TRAINING_ROUTE.MAIN}>
              <button className="btn">Choose a different training</button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="test-definition">{questionDefinition}</div>
          <div className="test-answers">
            {answers.map((item, i) => {
              return (
                <div
                  key={i}
                  className="test-item"
                  onClick={(event) => handleAnswer(event, item.word)}>
                  {item.word}
                </div>
              );
            })}
            <div className="test-info">
              <div className="test-info__page">
                {`question ${questionNumber + 1} of ${trainingListLength}`}
              </div>
              <div className="test-info__right">
                Number of correct answers: {userRightAnswers.length}
              </div>
              <button onClick={handleStartOverAgain} className="btn">
                Start over again
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};
export default TrainingOne;
// // for (let i = dictionaryForAnswers.length - 1; i > 0; i--) {
// //   let j = Math.floor(Math.random() * (i + 1))
// //   ;[dictionaryForAnswers[i], dictionaryForAnswers[j]] = [dictionaryForAnswers[j], dictionaryForAnswers[i]]
