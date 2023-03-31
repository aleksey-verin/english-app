import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { TRAINING_ROUTE } from '../routes/routes';
import { selectorDictionary } from '../store/reducers/dictionarySlice';

const TrainingPage = () => {
  // const dispatch = useDispatch();
  const { userDictionary: dictionary, isLoading, isSuccess } = useSelector(selectorDictionary);

  const scoreValues = {
    total: 0,
    done: 0,
    training: 0
  };
  if (isSuccess) {
    scoreValues.total = dictionary.length;
    scoreValues.done = dictionary.filter((item) => item.progress >= 100).length;
    scoreValues.training = scoreValues.total - scoreValues.done;
  }
  if (isLoading) return <Loader />;

  const handleClick = () => {
    // dispatch(addBatchInDictionary('500words'));
    // dispatch(getDictionary());
  };

  return (
    <div>
      <div>You have {scoreValues.training ? scoreValues.training : 'no'} words to practice.</div>
      {scoreValues.training ? (
        <>
          <div> What would you like to do?</div>
          <Link to={TRAINING_ROUTE.TEST1}>Training One</Link>
          <p>Добавить 500 новый слов в ваш словарь</p>
          <button onClick={handleClick}>Добавить</button>
        </>
      ) : null}
    </div>
  );
};

export default TrainingPage;
