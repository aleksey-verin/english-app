import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DICTIONARY_ROUTE, LOGIN_ROUTE, TRAINING_ROUTE, WORDS_ROUTE } from '../routes/routes';
import LoginPage from '../pages/LoginPage';
import TrainingPage from '../pages/TrainingPage';
import WordsPage from '../pages/WordsPage';
import DictionaryPage from '../pages/DictionaryPage';
import { useSelector } from 'react-redux';
import { selectorUserAuth } from '../store/reducers/userAuthSlice';
import TrainingOne from '../pages/TrainingPage/TrainingOne';

const AppRouter = () => {
  const { user } = useSelector(selectorUserAuth);

  return user ? (
    <Routes>
      <Route path={DICTIONARY_ROUTE} element={<DictionaryPage />} />
      <Route path={WORDS_ROUTE} element={<WordsPage />} />
      <Route path={TRAINING_ROUTE.MAIN} element={<TrainingPage />} />
      <Route path={TRAINING_ROUTE.TRAINING_DEFINITION} element={<TrainingOne />} />
      <Route path={TRAINING_ROUTE.TRAINING_WORD} element={<TrainingOne />} />
      <Route path="*" element={<Navigate replace to={DICTIONARY_ROUTE} />} />
    </Routes>
  ) : (
    <Routes>
      <Route path={LOGIN_ROUTE} element={<LoginPage />} />
      <Route path="*" element={<Navigate replace to={LOGIN_ROUTE} />} />
    </Routes>
  );
};

export default AppRouter;
