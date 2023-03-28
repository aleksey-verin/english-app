/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { TRAINING_ROUTE } from '../../routes/routes';

const Title = ({ dictionary }) => {
  let score = [];

  if (!dictionary) {
    score = [0, 0, 0];
  } else {
    score[0] = dictionary.length;
    score[1] = dictionary.filter((item) => item.progress >= 100).length;
    score[2] = score[0] - score[1];
  }

  return (
    <div className="title">
      <h1>
        Your best <span>Dictionary</span> and <span>Learning</span> app
      </h1>
      <div className="score">
        <div className="score__text">
          Total: <span>{score[0]}</span> | Done: <span>{score[1]}</span> | Training:{' '}
          <span>{score[2]}</span>
        </div>
        <NavLink className="score__btn btn" to={TRAINING_ROUTE}>
          Go!
        </NavLink>
      </div>
    </div>
  );
};

export default Title;
