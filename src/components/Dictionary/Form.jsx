/* eslint-disable react/prop-types */
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getResult, selectorResult } from '../../store/reducers/requestWordSlice';
// import { useGetNewWordMutation } from '../../store/reducers/requestWordApi';
// import { useGetNewWordQuery } from '../../store/reducers/requestWordApi';
// import request from '../services/fetch'

const Form = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  // const [newWord, setNewWord] = useState(skipToken);
  // const result = useGetNewWordQuery(newWord);

  // const [trigger, result] = useGetNewWordMutation();

  function inputHandler(e) {
    setInputValue(e.target.value);
  }

  // async function request(word) {
  //   const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  //   const headersList = {
  //     Accept: '*/*',
  //     'User-Agent': 'Thunder Client (https://www.thunderclient.com)'
  //   };
  //   try {
  //     const response = await fetch(`${url}${word}`, {
  //       method: 'GET',
  //       headers: headersList
  //     });
  //     const data = await response.json();
  //     if (response.ok && data.length) {
  //       return data;
  //     } else {
  //       getError(data);
  //       throw new Error('нет такого слова');
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  async function handleForm(e) {
    e.preventDefault();
    // getError(null);

    if (!inputValue) return;
    dispatch(getResult(inputValue));
    // trigger(inputValue);
    // const response = await request(inputValue);
    // await getData(response);

    setInputValue('');

    // setNewWord(inputValue);
  }
  // console.log(result);

  return (
    <form className="form" onSubmit={handleForm}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Type a word..."
          name="word"
          id="word-input"
          autoComplete="off"
          value={inputValue}
          onChange={inputHandler}
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default Form;
