/* eslint-disable react/prop-types */
import React from 'react';
import ScoreTitle from '../common UI/ScoreTitle';

const Title = () => {
  return (
    <div className="title">
      <h1>
        Your best <span>Dictionary</span> and <span>Learning</span> app
      </h1>
      <ScoreTitle />
    </div>
  );
};

export default Title;
