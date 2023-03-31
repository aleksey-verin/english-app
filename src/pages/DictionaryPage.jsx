/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Error from '../components/Dictionary/Error';
import Form from '../components/Dictionary/Form';
import Results from '../components/Dictionary/Results';
import Title from '../components/Dictionary/Title';
import { selectorRequestWord } from '../store/reducers/requestWordSlice';
import { useDispatch } from 'react-redux';
import { selectorUserAuth } from '../store/reducers/userAuthSlice';
import { getDictionary } from '../store/reducers/dictionarySlice';

const DictionaryPage = () => {
  const { isSuccess, isError } = useSelector(selectorRequestWord);
  console.log(isSuccess, isError);

  return (
    <main className="main">
      <Title />
      <Form />
      {isError ? <Error /> : null}
      {isSuccess ? <Results /> : null}
    </main>
  );
};

export default DictionaryPage;
