import { useDispatch, useSelector } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import './App.css';
import Loader from './components/Loader';
import { selectorUser } from './store/reducers/userSlice';
import { useEffect } from 'react';
import { getUserDictionary } from './store/reducers/userDictionarySlice';
import { updateInUserDictionary } from './store/reducers/UpdateInUserDictionarySlice';

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(selectorUser);

  useEffect(() => {
    dispatch(getUserDictionary());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app">
      <HashRouter>
        <Navbar />
        <AppRouter />
      </HashRouter>
    </div>
  );
}

export default App;
