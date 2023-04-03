/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { selectorDictionary } from '../../store/reducers/dictionarySlice';
import { generateTaskList } from '../../utils/training/trainingHelper';
import { useDispatch } from 'react-redux';
import { selectorTrainingSlice } from '../../store/reducers/trainingSlice';
// import { setTrainingTasks } from '../../store/reducers/trainingSlice';
// import { useFetchUserDictionaryQuery } from '../store/reducers/userDictionaryApi';

const TrainingOne = () => {
  console.log('render training one');
  // const dispatch = useDispatch();

  const { userDictionary: dictionary, isLoading } = useSelector(selectorDictionary);
  const { trainingTasks } = useSelector(selectorTrainingSlice);

  console.log(trainingTasks);

  // const [taskList, setTaskList] = useState(null);

  // const { randomWord, finalArray } = dataTrainingDictionaryWord(dictionary);

  // const taskList = useMemo(() => {
  //   if (dictionary.length) {
  //     generateTaskList(dictionary);
  //   }
  // }, [dictionary]);

  // useEffect(() => {
  //   if (dictionary) {
  //     dispatch(setTrainingTasks(dictionary));
  //     // setTaskList(generateTaskList(dictionary));
  //   }
  // }, [dictionary]);

  // if (!dictionary.length) return null;
  // const taskList = generateTaskList(dictionary);
  // console.log(dictionary);
  // console.log(taskList);

  if (isLoading) return <Loader />;
  // const handleAnswer = (e) => {
  //   const element = e.target;
  //   if (element.textContent === randomWord.word) {
  //     console.log('rigth!');
  //     // element.style.backgroundColor = 'lightgreen'
  //     // setDictionary(
  //     //   dictionary.map((item) => {
  //     //     if (item.word === randomWord.word && item.definition === randomWord.definition) {
  //     //       item.progress += 20;
  //     //       return item;
  //     //     } else {
  //     //       return item;
  //     //     }
  //     //   })
  //     // );
  //   } else {
  //     console.log('Wrong!');
  //   }
  // };
  return (
    <main className="main">
      <div className="test">
        <h1>Training</h1>
      </div>
      <div className="test-title">Choose the right word for the meaning:</div>
      {/* <div className="test-definition">{randomWord.definition}</div> */}
      <div className="test-answers">
        {/* {finalArray.map((item, i) => {
          return (
            <div key={i} className="test-item" onClick={handleAnswer}>
              {item.word}
            </div>
          );
        })} */}
      </div>
    </main>
  );
};
export default TrainingOne;
// // for (let i = dictionaryForAnswers.length - 1; i > 0; i--) {
// //   let j = Math.floor(Math.random() * (i + 1))
// //   ;[dictionaryForAnswers[i], dictionaryForAnswers[j]] = [dictionaryForAnswers[j], dictionaryForAnswers[i]]
