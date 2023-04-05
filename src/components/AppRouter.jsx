import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LOGIN_ROUTE, SEARCH_ROUTE, TRAINING_ROUTE, WORDS_ROUTE } from '../routes/routes';
import LoginPage from '../pages/LoginPage';
import TrainingPage from '../pages/TrainingPage';
import WordsPage from '../pages/WordsPage';
import SearchPage from '../pages/SearchPage';
import { useSelector } from 'react-redux';
import { selectorUserAuth } from '../store/reducers/userAuthSlice';
import TrainingOne from '../pages/TrainingPage/TrainingOne';
import TrainingTwo from '../pages/TrainingPage/TrainingTwo';

const AppRouter = () => {
  const { user } = useSelector(selectorUserAuth);

  return user ? (
    <Routes>
      <Route path={SEARCH_ROUTE} element={<SearchPage />} />
      <Route path={WORDS_ROUTE} element={<WordsPage />} />
      <Route path={TRAINING_ROUTE.MAIN} element={<TrainingPage />} />
      <Route path={TRAINING_ROUTE.TRAINING_DEFINITION} element={<TrainingOne />} />
      <Route path={TRAINING_ROUTE.TRAINING_WORD} element={<TrainingTwo />} />
      <Route path="*" element={<Navigate replace to={SEARCH_ROUTE} />} />
    </Routes>
  ) : (
    <Routes>
      <Route path={SEARCH_ROUTE} element={<SearchPage />} />
      <Route path={LOGIN_ROUTE} element={<LoginPage />} />
      <Route path="*" element={<Navigate replace to={LOGIN_ROUTE} />} />
    </Routes>
  );
};

export default AppRouter;
