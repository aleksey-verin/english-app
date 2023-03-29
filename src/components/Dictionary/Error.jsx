/* eslint-disable react/prop-types */
import React from 'react';

const Error = () => {
  const message = "Sorry pal, we couldn't find definitions for the word you were looking for.";
  return <div className="error">{message}</div>;
};

export default Error;
