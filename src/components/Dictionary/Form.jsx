/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestWord } from '../../store/reducers/requestWordSlice';

const Form = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  function inputHandler(e) {
    setInputValue(e.target.value);
  }

  async function handleForm(e) {
    e.preventDefault();
    if (!inputValue) return;
    dispatch(requestWord(inputValue));
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
