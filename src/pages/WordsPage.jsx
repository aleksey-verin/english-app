/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { updateInUserDictionary } from '../store/reducers/updateInUserDictionarySlice';
import { selectorDictionary } from '../store/reducers/userDictionarySlice';
// import { useFetchUserDictionaryQuery } from '../store/reducers/userDictionaryApi';

const WordsPage = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log('before disp');
    dispatch(updateInUserDictionary());
  };

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
              <div onClick={handleClick} className="words-list__word">
                {item.word}
              </div>
              <div className="words-list__definition">{item.definition}</div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default WordsPage;
