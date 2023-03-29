/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import Error from '../components/Dictionary/Error';
import Form from '../components/Dictionary/Form';
import Results from '../components/Dictionary/Results';
import Title from '../components/Dictionary/Title';
import { selectorResult } from '../store/reducers/requestWordSlice';

const DictionaryPage = () => {
  const { isSuccess, isError } = useSelector(selectorResult);
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
