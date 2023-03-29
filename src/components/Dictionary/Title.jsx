/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { TRAINING_ROUTE } from '../../routes/routes';
import { useFetchUserDictionaryQuery } from '../../store/actions/userDictionaryAction';

const Title = () => {
  const { data: dictionary, isSuccess } = useFetchUserDictionaryQuery();

  const total = isSuccess ? dictionary.length : 0;
  const done = isSuccess ? dictionary.filter((item) => item.progress >= 100).length : 0;
  const training = isSuccess ? total - done : 0;

  return (
    <div className="title">
      <h1>
        Your best <span>Dictionary</span> and <span>Learning</span> app
      </h1>
      <div className="score">
        <div className="score__text">
          Total: <span>{total}</span> | Done: <span>{done}</span> | Training:{' '}
          <span>{training}</span>
        </div>
        <NavLink className="score__btn btn" to={TRAINING_ROUTE}>
          Go!
        </NavLink>
      </div>
    </div>
  );
};

export default Title;
