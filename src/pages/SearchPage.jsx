/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import Error from '../components/Dictionary/Error';
import Form from '../components/Dictionary/Form';
import Results from '../components/Dictionary/Results';
import Title from '../components/Dictionary/Title';
import { selectorRequestWord } from '../store/reducers/requestWordSlice';

const SearchPage = () => {
  console.log('render DictionaryPage');
  const { isSuccess, isError } = useSelector(selectorRequestWord);

  return (
    <main className="main content">
      <Title />
      <Form />
      {isError ? <Error /> : null}
      {isSuccess ? <Results /> : null}
    </main>
  );
};

export default SearchPage;
