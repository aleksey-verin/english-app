import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { TRAINING_ROUTE } from '../routes/routes';
import { getDictionary, selectorDictionary } from '../store/reducers/dictionarySlice';
import { addBatchInDictionary } from '../store/reducers/addBatchInDictionarySlice';
import ScoreTitle from '../components/common UI/ScoreTitle';

const TrainingPage = () => {
  console.log('render Training page');
  const dispatch = useDispatch();
  const {
    userDictionary,
    isLoading,
    userScore: { training },
    trainingListLength
  } = useSelector(selectorDictionary);
  if (isLoading) return <Loader />;

  const handleAddMoreTasks = () => {
    dispatch(addBatchInDictionary({ userDictionary, fileName: '500words' }));
    dispatch(getDictionary());
  };

  return (
    <main className="main content">
      <div className="title">
        <h1>
          <span>Training</span> your words
        </h1>
        <ScoreTitle />
      </div>
      {!trainingListLength ? (
        <div className="training content">
          <div className="training-title">
            You have less than <span>four words</span> in the dictionary. Please add more for
            training
          </div>
        </div>
      ) : (
        <div className="training content">
          <div className="training-title content">
            You have <span>{training}</span> words to practice. What kind of word training would you
            like to start?
          </div>
          <div className="training-actions">
            <Link
              className="training-actions__item content"
              to={TRAINING_ROUTE.TRAINING_DEFINITION}>
              {/* <div > */}
              <div className="training-actions__item-title">definition</div>
              <div className="training-actions__item-text">
                This vocabulary training exercise is a game where the user is presented with
                <span> a single English definition</span>, and must choose the word that corresponds
                to that definition from <span>four options</span>. This type of training helps
                improve one&apos;s vocabulary and understanding of the English language.
              </div>
              {/* <button className="btn">Go to training</button> */}
              {/* </div> */}
            </Link>
            <Link className="training-actions__item content" to={TRAINING_ROUTE.TRAINING_WORD}>
              {/* <div > */}
              <div className="training-actions__item-title">word</div>
              <div className="training-actions__item-text">
                This training exercise for learning English involves a game where the user is shown
                <span> a single English word</span>, and must then choose the correct definition
                from <span>four options</span> provided. This exercise helps improve perception and
                memorization of English words, as well as increasing proficiency in the language.
              </div>
              {/* <button className="btn">Go to training</button> */}
              {/* </div> */}
            </Link>
          </div>
          {userDictionary.length < 200 && (
            <div className="training-add content">
              <div>Would you like to add 500 popular English words to your dictionary?</div>
              <button className="btn" onClick={handleAddMoreTasks}>
                Add more words
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default TrainingPage;
