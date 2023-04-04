import React from 'react';
import { Link } from 'react-router-dom';
import { TRAINING_ROUTE } from '../../routes/routes';
import { useSelector } from 'react-redux';
import { selectorDictionary } from '../../store/reducers/dictionarySlice';

const ScoreTitle = () => {
  const {
    userScore: {
      total,
      done,
      training,
      percentages: { zero, twenty, forty, sixty, eighty, hundred }
    }
  } = useSelector(selectorDictionary);

  return (
    <div className="score">
      <div className="score-text">
        <div>
          Total: <span>{total}</span> | Done: <span>{done}</span> | Training:{' '}
          <span>{training}</span>
        </div>
        <div className="score-text__percent">
          Learning: 0% <span>{zero}</span> | 20% <span>{twenty}</span> | 40% <span>{forty}</span> |
          60% <span>{sixty}</span> | 80% <span>{eighty}</span> | 100% <span>{hundred}</span>
        </div>
      </div>
      <Link to={TRAINING_ROUTE.MAIN}>
        <button className="btn">Go!</button>
      </Link>
    </div>
  );
};

export default ScoreTitle;
