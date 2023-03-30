import { useDispatch, useSelector } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import './App.css';
import Loader from './components/Loader';
import { selectorUser } from './store/reducers/userSlice';
import { useEffect } from 'react';
import { getDictionary } from './store/reducers/dictionarySlice';

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(selectorUser);

  useEffect(() => {
    dispatch(getDictionary());
  }, []);

  // const transformJSON = async () => {
  //   const response = await fetch('/mockData/6365414.json');
  //   const json = await response.json();
  //   const data = json.wordlist.words.map((item) => ({
  //     word: item.word,
  //     definition: [item.sense.definition],
  //     // example: item.example.text,
  //     progress: 0
  //   }));
  //   const newJson = JSON.stringify(data);

  //   console.log(newJson);
  // };
  // useEffect(() => {
  //   transformJSON();
  // }, []);

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
