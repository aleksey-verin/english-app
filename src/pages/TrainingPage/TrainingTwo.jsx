/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDictionary, selectorDictionary } from '../../store/reducers/dictionarySlice';
import { Link } from 'react-router-dom';
import { TRAINING_ROUTE } from '../../routes/routes';
import { updateScoreInDictionary } from '../../store/reducers/updateScoreInDictionarySlice';
import ScoreTitle from '../../components/common UI/ScoreTitle';

const initialStateTraining = {
  questionNumber: 0,
  isTestCompleted: false,
  userRightAnswers: [],
  userWrongAnswers: 0
};

const TrainingTwo = () => {
  console.log('render training one');
  const dispatch = useDispatch();

  const { userDictionary, trainingList, trainingListLength } = useSelector(selectorDictionary);
  const [questionNumber, setQuestionNumber] = useState(initialStateTraining.questionNumber);
  const [isTestCompleted, setIsTestCompleted] = useState(initialStateTraining.isTestCompleted);
  const [userRightAnswers, setUserRightAnswers] = useState(initialStateTraining.userRightAnswers);
  const [userWrongAnswers, setUserWrongAnswers] = useState(initialStateTraining.userWrongAnswers);

  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const question = trainingList ? trainingList[questionNumber].question : '';
  const questionDefinition = question.definition;
  const questionWord = question.word;
  const answers = trainingList ? trainingList[questionNumber].answers : '';

  const handleAnswer = (event, answer) => {
    const answerElement = event.target;
    setButtonsDisabled(true);
    console.log(answer);
    if (answer[0] === questionDefinition[0]) {
      setUserRightAnswers([...userRightAnswers, question]);
      answerElement.style.backgroundColor = 'limegreen';
    } else {
      setUserWrongAnswers((userWrongAnswers) => userWrongAnswers + 1);
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
  const numberOfWrongAnswers = userWrongAnswers;

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
          <span>«One word and four meanings</span>
        </h1>
        <ScoreTitle />
      </div>
      <div className="test content">
        {isTestCompleted ? (
          <div className="test-results">
            <div
              style={stylesForUserAnswer}
              className="test-results__title content">{`You answered ${userRightAnswers.length} out of 10 questions correctly`}</div>
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
            <div className="test-question content">{questionWord}</div>
            <div className="test-answers content">
              {answers
                ? answers.map((item, i) => {
                    return (
                      <button
                        key={i}
                        disabled={buttonsDisabled}
                        className="test-answers__item"
                        onClick={(event) => handleAnswer(event, item.definition)}>
                        {item.definition.join('; ')}
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
              {`question ${currentQuestion} of ${numberOfQuestions}`}
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
export default TrainingTwo;
