import React from 'react';
import { NavLink } from 'react-router-dom';
import { TRAINING_ROUTE } from '../../routes/routes';
import { useSelector } from 'react-redux';
import { selectorDictionary } from '../../store/reducers/dictionarySlice';

const ScoreTitle = () => {
  const { userDictionary: dictionary } = useSelector(selectorDictionary);

  if (!dictionary) return;

  const total = dictionary.length;
  const done = dictionary.filter((item) => item.progress >= 100).length;
  const training = total - done;

  return (
    <div className="score">
      <div className="score__text">
        Total: <span>{total}</span> | Done: <span>{done}</span> | Training: <span>{training}</span>
      </div>
      <NavLink className="score__btn btn" to={TRAINING_ROUTE.MAIN}>
        Go!
      </NavLink>
    </div>
  );
};

export default ScoreTitle;
