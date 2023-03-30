/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { selectorDictionary } from '../store/reducers/userDictionarySlice';

const WordsPage = () => {
  const { userDictionary: dictionary } = useSelector(selectorDictionary);
  if (!dictionary) return <Loader />;
  return (
    <main className="main">
      <div className="words">
        <h1>My words</h1>
      </div>
      <div className="words-list">
        {dictionary.map((item, i) => {
          return (
            <div key={i} className="words-list__item">
              <div className="words-list__word">{item.word}</div>
              <div className="words-list__definition">
                {item.definition.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default WordsPage;
