/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { auth, onAuthStateChanged } from '../utils/firebase';
import { DICTIONARY_ROUTE, LOGIN_ROUTE, TRAINING_ROUTE, WORDS_ROUTE } from '../routes/routes';
import LoginPage from '../pages/LoginPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import TrainingPage from '../pages/TrainingPage';
import WordsPage from '../pages/WordsPage';
import DictionaryPage from '../pages/DictionaryPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUser } from '../store/reducers/userSlice';

const AppRouter = (
  {
    // dictionary,
    // addInDictionary,
    // data,
    // getData,
    // getError,
    // error,
    // setDictionary,
    // setUserMyEmail
  }
) => {
  const { user } = useSelector(selectorUser);
  console.log(user);

  // const [user] = useAuthState(auth);

  return user ? (
    <Routes>
      <Route
        path={DICTIONARY_ROUTE}
        element={
          <DictionaryPage
          // dictionary={dictionary}
          // addInDictionary={addInDictionary}
          // data={data}
          // getData={getData}
          // getError={getError}
          // error={error}
          />
        }
      />
      <Route
        path={WORDS_ROUTE}
        element={
          <WordsPage
          //  dictionary={dictionary}
          //   setDictionary={setDictionary}
          />
        }
      />
      <Route
        path={TRAINING_ROUTE}
        element={
          <TrainingPage
          // dictionary={dictionary}
          // setDictionary={setDictionary}
          />
        }
      />
      <Route path="*" element={<Navigate replace to={DICTIONARY_ROUTE} />} />
    </Routes>
  ) : (
    <Routes>
      <Route
        path={LOGIN_ROUTE}
        element={
          <LoginPage
          // setUserMyEmail={setUserMyEmail}
          />
        }
      />
      <Route path="*" element={<Navigate replace to={LOGIN_ROUTE} />} />
    </Routes>
  );
};

export default AppRouter;
