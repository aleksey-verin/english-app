/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDictionary, selectorDictionary } from '../../store/reducers/dictionarySlice';
import { Link } from 'react-router-dom';
import { TRAINING_ROUTE } from '../../routes/routes';
import {
  scoreValues,
  updateScoreInDictionary
} from '../../store/reducers/updateScoreInDictionarySlice';
import ScoreTitle from '../../components/common UI/ScoreTitle';

const initialStateTraining = {
  questionNumber: 0,
  isTestCompleted: false,
  userRightAnswers: [],
  userWrongAnswers: []
};

const TrainingOne = () => {
  console.log('render training one');
  const dispatch = useDispatch();

  const { userDictionary, trainingList, trainingListLength } = useSelector(selectorDictionary);
  const [questionNumber, setQuestionNumber] = useState(initialStateTraining.questionNumber);
  const [isTestCompleted, setIsTestCompleted] = useState(initialStateTraining.isTestCompleted);
  const [userRightAnswers, setUserRightAnswers] = useState(initialStateTraining.userRightAnswers);
  const [userWrongAnswers, setUserWrongAnswers] = useState(initialStateTraining.userWrongAnswers);

  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  // if (isLoading || !trainingList) return <Loader />;
  // if (isLoading) return <Loader />;
  const question = trainingList ? trainingList[questionNumber].question : '';
  const questionDefinition = question.definition;
  const questionWord = question.word;
  const answers = trainingList ? trainingList[questionNumber].answers : '';

  const handleAnswer = (event, answer) => {
    const answerElement = event.target;
    setButtonsDisabled(true);
    if (answer === questionWord) {
      setUserRightAnswers([...userRightAnswers, question]);
      answerElement.style.backgroundColor = 'limegreen';
    } else {
      setUserWrongAnswers([...userWrongAnswers, question]);
      answerElement.style.backgroundColor = 'lightcoral';
    }
    setTimeout(() => {
      if (questionNumber < trainingListLength - 1) {
        setQuestionNumber((questionNumber) => questionNumber + 1);
      } else {
        setIsTestCompleted(true);
        dispatch(
          updateScoreInDictionary({ userDictionary, userRightAnswers, score: scoreValues.medium })
        );
        dispatch(getDictionary());
      }
      answerElement.style.backgroundColor = '';
      setButtonsDisabled(false);
    }, 500);
  };

  const handleResetParams = () => {
    setQuestionNumber(initialStateTraining.questionNumber);
    setIsTestCompleted(initialStateTraining.isTestCompleted);
    setUserRightAnswers(initialStateTraining.userRightAnswers);
    setUserWrongAnswers(initialStateTraining.userWrongAnswers);
  };

  const currentQuestion = questionNumber + 1;
  const numberOfQuestions = trainingListLength || 10;
  const numberOfRightAnswers = userRightAnswers.length;
  const numberOfWrongAnswers = userWrongAnswers.length;

  const stylesForUserAnswer =
    numberOfRightAnswers > numberOfWrongAnswers
      ? { backgroundColor: 'lightgreen' }
      : numberOfRightAnswers < numberOfWrongAnswers
      ? { backgroundColor: 'lightcoral' }
      : null;

  return (
    <main className="main content">
      <div className="title">
        <h1>
          <span>«One meaning and four words»</span>
        </h1>
        <ScoreTitle />
      </div>
      <div className="test content">
        {isTestCompleted ? (
          <div className="test-results">
            <div
              style={stylesForUserAnswer}
              className="test-results__title content">{`You answered ${userRightAnswers.length} out of 10 questions correctly`}</div>
            <div className="test-results__words">
              <div className="test-results__words-wrong">
                <div className="test-results__words-wrong__title">Incorrect answers:</div>
                <div className="test-results__words-wrong__result">
                  {userWrongAnswers.map((item, index) => (
                    <div key={index} className="test-results__words-wrong__result-block">
                      <div className="test-results__words-wrong__result-block__question">
                        {item.word}
                      </div>
                      <div>–</div>
                      <div className="test-results__words-wrong__result-block__answer">
                        {item.definition}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="test-results__words-right"></div>
            </div>
            <div className="test-results__actions">
              <button onClick={handleResetParams} className="btn">
                Start a new test
              </button>
              <Link to={TRAINING_ROUTE.MAIN}>
                <button className="btn">Choose a different training</button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="test-question content">
              {questionDefinition
                ? questionDefinition.map((definition, index) => <div key={index}>{definition}</div>)
                : null}
            </div>
            <div className="test-answers">
              {answers
                ? answers.map((item, i) => {
                    return (
                      <button
                        key={i}
                        disabled={buttonsDisabled}
                        className="test-answers__item"
                        onClick={(event) => handleAnswer(event, item.word)}>
                        {item.word}
                      </button>
                    );
                  })
                : null}
            </div>
          </>
        )}
        {!isTestCompleted && (
          <div className="test-info">
            <div className="test-info__page info">
              {`${currentQuestion} of ${numberOfQuestions}`}
            </div>
            <div
              style={stylesForUserAnswer}
              className="test-info__correct info">{`Right: ${numberOfRightAnswers} | Wrong: ${numberOfWrongAnswers}`}</div>
            <button onClick={handleResetParams} className="btn">
              &#x21E6; Start over
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
export default TrainingOne;
