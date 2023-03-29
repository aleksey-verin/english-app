/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { selectorDictionary } from '../store/reducers/userDictionarySlice';
// import { useFetchUserDictionaryQuery } from '../store/reducers/userDictionaryApi';

const TrainingPage = () => {
  const { userDictionary: dictionary } = useSelector(selectorDictionary);
  if (!dictionary) return <Loader />;
  // нужно выбирать случайно слова из словаря, чтобы они не повторялись
  // например если мы начали тренировку, то ставить метку на словах о том что уже такая тренировка была
  // или брать стек слов и удалять при успешном тесте
  // выбираем случайное слово
  // - убираем слова с прогрессом 100
  const dictionaryForTraining = dictionary.filter((item) => item.progress !== 100);
  if (dictionaryForTraining.length === 0) return;
  // находим случайную ячейку в массиве
  const randomItemInArray = +(Math.random() * (dictionaryForTraining.length - 1)).toFixed(0);
  // находим случайное слово
  const randomWord = dictionaryForTraining[randomItemInArray];
  // находим "остальные" слова без искомого
  const dicForAnswers = dictionaryForTraining.filter((_, index) => index !== randomItemInArray);
  // находим 3 случайных слова из "остальных" слов
  const randomArray = dicForAnswers.sort(() => 0.5 - Math.random()).slice(0, 3);
  randomArray.push(randomWord);
  // объединяем случайное слово и "остальные" 3 слова в один массив и перемешиваем
  const finalArray = [...randomArray].sort(() => 0.5 - Math.random()).slice(0, 4);
  const handleAnswer = (e) => {
    const element = e.target;
    if (element.textContent === randomWord.word) {
      // element.style.backgroundColor = 'lightgreen'
      setDictionary(
        dictionary.map((item) => {
          if (item.word === randomWord.word && item.definition === randomWord.definition) {
            item.progress += 20;
            return item;
          } else {
            return item;
          }
        })
      );
      localStorage.setItem('dictionary', JSON.stringify(dictionary));
    }
  };
  return (
    <main className="main">
      <div className="test">
        <h1>Training</h1>
      </div>
      <div className="test-title">Choose the right word for the meaning:</div>
      <div className="test-definition">{randomWord.definition}</div>
      <div className="test-answers">
        {finalArray.map((item, i) => {
          return (
            <div key={i} className="test-item" onClick={handleAnswer}>
              {item.word}
            </div>
          );
        })}
      </div>
    </main>
  );
};
export default TrainingPage;
// // for (let i = dicForAnswers.length - 1; i > 0; i--) {
// //   let j = Math.floor(Math.random() * (i + 1))
// //   ;[dicForAnswers[i], dicForAnswers[j]] = [dicForAnswers[j], dicForAnswers[i]]
