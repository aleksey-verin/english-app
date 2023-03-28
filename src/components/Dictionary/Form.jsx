/* eslint-disable react/prop-types */
import { useState } from 'react';
// import request from '../services/fetch'

const Form = ({ getData, getError }) => {
  const [inputValue, setInputValue] = useState('');

  function inputHandler(e) {
    setInputValue(e.target.value);
  }

  async function request(word) {
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

    const headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)'
    };
    try {
      const response = await fetch(`${url}${word}`, {
        method: 'GET',
        headers: headersList
      });
      const data = await response.json();
      if (response.ok && data.length) {
        return data;
      } else {
        getError(data);
        throw new Error('нет такого слова');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleForm(e) {
    e.preventDefault();
    getError(null);

    if (!inputValue) return;
    const response = await request(inputValue);
    await getData(response);

    setInputValue('');
  }

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
