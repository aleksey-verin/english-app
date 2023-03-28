import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import { auth, onAuthStateChanged, firestore } from './utils/firebase';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import './App.css';
import Loader from './components/Loader';
// import { login, logout } from './store/reducers/userSlice';
// import { store } from './store/store';
import { requestUser } from './store/actions/userAction';
import { selectorUser } from './store/reducers/userSlice';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector(selectorUser);
  console.log(loading);

  useEffect(() => {
    dispatch(requestUser());
  }, []);
  // // const [user, loading, err] = useAuthState(auth);
  // const [userMyEmail, setUserMyEmail] = useState(null);

  // useEffect(() => {
  //   if (!user) return;
  //   setUserMyEmail(user.email);
  // }, [loading]);

  // const [userMy, setUserMy] = useState(null);

  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);

  // const [dictionary, setDictionary] = useState([]);

  // // получаем словарь с сервера
  // const [value, loadingDic] = useCollectionData(collection(firestore, `dictionary-${userMyEmail}`));

  // useEffect(() => {
  //   if (!value) return;
  //   setDictionary(value);
  // }, [value]);

  // async function addInDictionary(word, definition) {
  //   await addDoc(collection(firestore, `dictionary-${userMyEmail}`), {
  //     word,
  //     definition,
  //     progress: 0,
  //     createdAt: serverTimestamp()
  //   });
  //   setDictionary([...dictionary, { word, definition, progress: 0, createdAt: serverTimestamp() }]);
  // }

  // function getData(response) {
  //   console.log(response);
  //   setData(response);
  // }

  // function getError(response) {
  //   setError(response);
  // }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <AppRouter
        // dictionary={dictionary}
        // addInDictionary={addInDictionary}
        // data={data}
        // getData={getData}
        // getError={getError}
        // error={error}
        // setDictionary={setDictionary}
        // setUserMyEmail={setUserMyEmail}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
