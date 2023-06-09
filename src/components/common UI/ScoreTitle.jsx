import React from 'react';
import { Link } from 'react-router-dom';
import { TRAINING_ROUTE } from '../../routes/routes';
import { useSelector, useDispatch } from 'react-redux';
import { selectorDictionary } from '../../store/reducers/dictionarySlice';
import { selectorUserAuth } from '../../store/reducers/userAuthSlice';
import { setSystemMessage, systemMessageValues } from '../../store/reducers/systemMessageSlice';

const ScoreTitle = () => {
  const dispatch = useDispatch();
  const {
    userScore: {
      total,
      done,
      training,
      percentages: { zero, twenty, forty, sixty, eighty, hundred }
    }
  } = useSelector(selectorDictionary);
  const { user } = useSelector(selectorUserAuth);

  return (
    <div className="score">
      <div className="score-text">
        <div>
          Total: <span>{total}</span> | Done: <span>{done}</span> | Training:{' '}
          <span>{training}</span>
        </div>
        <div className="score-percentages percentages">
          <div className="percentages-item">
            <div className="percentages-item__title">0%</div>
            <div className="percentages-item__data">{zero}</div>
          </div>
          <div className="percentages-item">
            <div className="percentages-item__title">20%</div>
            <div className="percentages-item__data">{twenty}</div>
          </div>
          <div className="percentages-item">
            <div className="percentages-item__title">40%</div>
            <div className="percentages-item__data">{forty}</div>
          </div>
          <div className="percentages-item">
            <div className="percentages-item__title">60%</div>
            <div className="percentages-item__data">{sixty}</div>
          </div>
          <div className="percentages-item">
            <div className="percentages-item__title">80%</div>
            <div className="percentages-item__data">{eighty}</div>
          </div>
          <div className="percentages-item">
            <div className="percentages-item__title">100%</div>
            <div className="percentages-item__data">{hundred}</div>
          </div>
        </div>
        {/* <div className="score-text__percent">
          Learning: 0% <span>{zero}</span> | 20% <span>{twenty}</span> | 40% <span>{forty}</span> |
          60% <span>{sixty}</span> | 80% <span>{eighty}</span> | 100% <span>{hundred}</span>
        </div> */}
      </div>
      {user ? (
        <Link to={TRAINING_ROUTE.MAIN}>
          <button className="btn">Go!</button>
        </Link>
      ) : (
        <button
          onClick={() => dispatch(setSystemMessage(systemMessageValues.error_login))}
          className="btn">
          Go!
        </button>
      )}
    </div>
  );
};

export default ScoreTitle;
