/* eslint-disable react/prop-types */
import React from 'react';
import Error from '../components/Dictionary/Error';
import Form from '../components/Dictionary/Form';
import Results from '../components/Dictionary/Results';
import Title from '../components/Dictionary/Title';

const DictionaryPage = ({ dictionary, getData, getError, error, data, addInDictionary }) => {
  return (
    <main className="main">
      <Title />
      <Form getData={getData} getError={getError} />
      {error ? <Error error={error} /> : null}
      {data && dictionary ? (
        <Results data={data} addInDictionary={addInDictionary} dictionary={dictionary} />
      ) : null}
    </main>
  );
};

export default DictionaryPage;
