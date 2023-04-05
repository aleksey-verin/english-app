import { useDispatch, useSelector } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import './App.css';
import { selectorUserAuth } from './store/reducers/userAuthSlice';
import { useEffect } from 'react';
import { getDictionary } from './store/reducers/dictionarySlice';
import SystemMessage from './components/SystemMessage';
// import { setTrainingTasks } from './store/reducers/trainingSlice';

function App() {
  console.log('render app component');
  const dispatch = useDispatch();
  const { user } = useSelector(selectorUserAuth);
  // const { userDictionary } = useSelector(selectorDictionary);

  useEffect(() => {
    if (user) {
      dispatch(getDictionary());
    }
  }, [user]);

  // useEffect(() => {
  //   if (userDictionary.length) {
  //     dispatch(setTrainingTasks(userDictionary));
  //   }
  // }, []);

  return (
    <div className="app">
      <HashRouter>
        <SystemMessage />
        <Navbar />
        <AppRouter />
      </HashRouter>
    </div>
  );
}

export default App;
