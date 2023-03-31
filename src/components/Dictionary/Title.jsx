/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { TRAINING_ROUTE } from '../../routes/routes';
import { selectorDictionary } from '../../store/reducers/dictionarySlice';

const Title = () => {
  const { userDictionary: dictionary, isSuccess } = useSelector(selectorDictionary);

  const scoreValues = {
    total: 0,
    done: 0,
    training: 0
  };
  if (isSuccess && dictionary) {
    scoreValues.total = dictionary.length;
    scoreValues.done = dictionary.filter((item) => item.progress >= 100).length;
    scoreValues.training = scoreValues.total - scoreValues.done;
  }

  return (
    <div className="title">
      <h1>
        Your best <span>Dictionary</span> and <span>Learning</span> app
      </h1>
      <div className="score">
        <div className="score__text">
          Total: <span>{scoreValues.total}</span> | Done: <span>{scoreValues.done}</span> |
          Training: <span>{scoreValues.training}</span>
        </div>
        <NavLink className="score__btn btn" to={TRAINING_ROUTE.MAIN}>
          Go!
        </NavLink>
      </div>
    </div>
  );
};

export default Title;
