/* eslint-disable react/prop-types */
import React from 'react';
import Loader from '../components/Loader';
import { useFetchUserDictionaryQuery } from '../store/reducers/userDictionaryApi';

const WordsPage = () => {
  const { data: dictionary, isLoading } = useFetchUserDictionaryQuery();
  if (isLoading) return <Loader />;

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
              <div className="words-list__definition">{item.definition}</div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default WordsPage;
