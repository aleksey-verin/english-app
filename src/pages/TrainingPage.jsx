import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { TRAINING_ROUTE } from '../routes/routes';
import { getDictionary, selectorDictionary } from '../store/reducers/dictionarySlice';
import { useDispatch } from 'react-redux';
import { addBatchInDictionary } from '../store/reducers/addBatchInDictionarySlice';
import ScoreTitle from '../components/common UI/ScoreTitle';
import { setTrainingTasks } from '../store/reducers/trainingSlice';

const TrainingPage = () => {
  console.log('render Training page');
  const dispatch = useDispatch();
  const {
    userDictionary,
    isLoading,
    userScore: { training }
  } = useSelector(selectorDictionary);
  if (isLoading) return <Loader />;

  const handleAddMoreTasks = () => {
    dispatch(addBatchInDictionary({ userDictionary, fileName: '500words' }));
    dispatch(getDictionary());
  };

  const handleGoTraining = () => {
    dispatch(setTrainingTasks(userDictionary));
  };

  return (
    <main className="main">
      <div className="title">
        <h1>
          <span>Training</span> your words
        </h1>
        <ScoreTitle />
      </div>
      <div className="training content">
        <div className="training-title">
          You have <span>{training}</span> words to practice. What would you like to do?
        </div>
        <div className="training-actions">
          <div className="training-actions__item content">
            <div className="training-actions__item-title">Training «Definition - Words» </div>
            <div className="training-actions__item-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ratione veniam
              veritatis quibusdam ea dolorum nemo obcaecati quae vel commodi, blanditiis, dicta
              ipsam nihil molestias adipisci in reprehenderit fuga placeat?
            </div>
            <Link to={TRAINING_ROUTE.TRAINING_DEFINITION}>
              <button onClick={handleGoTraining} className="btn">
                Go to training
              </button>
            </Link>
          </div>
          <div className="training-actions__item content">
            <div className="training-actions__item-title">Training «Word - Definitions»</div>
            <div className="training-actions__item-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ratione veniam
              veritatis quibusdam ea dolorum nemo obcaecati quae vel commodi, blanditiis, dicta
              ipsam nihil molestias adipisci in reprehenderit fuga placeat?
            </div>
            <Link to={TRAINING_ROUTE.TRAINING_WORD}>
              <button className="btn">Go to training</button>
            </Link>
          </div>
          <div className="training-actions__item content">
            <div className="training-actions__item-title">Action 1</div>
            <div className="training-actions__item-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ratione veniam
              veritatis quibusdam ea dolorum nemo obcaecati quae vel commodi, blanditiis, dicta
              ipsam nihil molestias adipisci in reprehenderit fuga placeat?
            </div>
            <Link to={TRAINING_ROUTE.TEST3}>
              <button className="btn">Click me</button>
            </Link>
          </div>
          <div className="training-actions__item content">
            <div className="training-actions__item-title">Action 1</div>
            <div className="training-actions__item-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ratione veniam
              veritatis quibusdam ea dolorum nemo obcaecati quae vel commodi, blanditiis, dicta
              ipsam nihil molestias adipisci in reprehenderit fuga placeat?
            </div>
            <Link to={TRAINING_ROUTE.TEST3}>
              <button className="btn">Click me</button>
            </Link>
          </div>
        </div>
        <div className="training-add content">
          <div>Would you like to add 500 popular English words to your dictionary?</div>
          <button className="btn" onClick={handleAddMoreTasks}>
            Add more words
          </button>
        </div>
      </div>
    </main>
  );
};

export default TrainingPage;
