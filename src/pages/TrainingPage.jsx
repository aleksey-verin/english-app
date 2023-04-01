import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { TRAINING_ROUTE } from '../routes/routes';
import { getDictionary, selectorDictionary } from '../store/reducers/dictionarySlice';
import { useDispatch } from 'react-redux';
import { addBatchInDictionary } from '../store/reducers/addBatchInDictionarySlice';
import ScoreTitle from '../components/common UI/ScoreTitle';

const TrainingPage = () => {
  const dispatch = useDispatch();
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
    dispatch(addBatchInDictionary({ dictionary, fileName: '500words' }));
    dispatch(getDictionary());
  };

  return (
    <main className="main">
      <div className="title">
        <h1>
          <span>Training</span> your words
        </h1>
        <ScoreTitle />
      </div>
      <div>You have {scoreValues.training ? scoreValues.training : 'no'} words to practice.</div>
      {scoreValues.training ? (
        <>
          <div> What would you like to do?</div>
          <Link to={TRAINING_ROUTE.TEST1}>Training One</Link>
          <p>Добавить 500 новый слов в ваш словарь</p>
          <button onClick={handleClick}>Добавить</button>
        </>
      ) : null}
    </main>
  );
};

export default TrainingPage;
