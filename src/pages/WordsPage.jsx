/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import { selectorDictionary } from '../store/reducers/dictionarySlice';
import Edit from '../images/edit.png';
import { Link } from 'react-router-dom';
import { DICTIONARY_ROUTE } from '../routes/routes';
import { requestWord } from '../store/reducers/requestWordSlice';
import ScoreTitle from '../components/common UI/ScoreTitle';

const WordsPage = () => {
  const dispatch = useDispatch();
  const { userDictionary: dictionary, isLoading } = useSelector(selectorDictionary);
  return (
    <main className="main">
      <div className="words title">
        <h1>My words</h1>
        <ScoreTitle />
      </div>
      <div className="words-list">
        {isLoading && (
          <div className="words-list__item">
            <Loader />
          </div>
        )}
        {dictionary.map(({ word, definition }, i) => {
          return (
            <div key={i} className="words-list__item">
              <div className="words-list__word">{word}</div>
              <div className="words-list__definition">
                {definition.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
              <div className="words-list__edit">
                <Link to={DICTIONARY_ROUTE} onClick={() => dispatch(requestWord(word))}>
                  <img src={Edit} alt="edit" title="Edit the definition" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default WordsPage;
