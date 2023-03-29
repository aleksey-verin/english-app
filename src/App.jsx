import { useDispatch, useSelector } from 'react-redux';
import { HashRouter } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import { auth, onAuthStateChanged, firestore } from './utils/firebase';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import './App.css';
import Loader from './components/Loader';
import { requestUser } from './store/actions/userAction';
import { selectorUser } from './store/reducers/userSlice';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from './utils/firebase';
import { useEffect } from 'react';
import { selectorResult } from './store/reducers/requestWordSlice';
// import { useGetNewWordMutation } from './store/reducers/requestWordApi';
// import { useGetNewWordQuery } from './store/reducers/requestWordApi';
// import { useFetchHighScoresTablesQuery } from './store/actions/userDictionaryAction';
// import { BASE_ROUTE } from './routes/routes';

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(selectorUser);

  // const { results: data } = useSelector(selectorResult);
  // console.log(data);

  // const [trigger, result] = useGetNewWordMutation();
  // console.log(result);
  // const { data, isLoading, isSuccess, isError, error } = useGetNewWordQuery();
  // if (isSuccess) {
  //   console.log(data);
  // }

  // const { data, isLoading, isSuccess, isError, error } = useFetchHighScoresTablesQuery();

  // console.log(data, isLoading, isSuccess, isError, error);
  // useEffect(() => {
  //   console.log(user);

  //   dispatch(requestUser());
  // }, []);

  // const getCollection = async () => {
  //   // const unsub = onSnapshot(collection(firestore, `dictionary-${user.email}`), (doc) => {
  //   //   console.log('Current data: ');
  //   // });
  //   // console.log(unsub);

  //   // const docRef = doc(firestore, `dictionary-verevaa@gmail.com`, '2J2MZuIOqYYH9FBqGssj');
  //   // const docSnap = await getDoc(docRef);
  //   // if (docSnap.exists()) {
  //   //   console.log('Document data:', docSnap.data());
  //   // } else {
  //   //   // doc.data() will be undefined in this case
  //   //   console.log('No such document!');
  //   // }
  //   const querySnapshot = await getDocs(collection(firestore, `dictionary-verevaa@gmail.com`));
  //   const data = [];
  //   querySnapshot.forEach((doc) => {
  //     data.push(doc.data());
  //   });
  //   console.log(data);
  // };

  // useEffect(() => {
  //   if (!user) return;
  //   getCollection();
  // }, [user]);

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
      <HashRouter>
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
      </HashRouter>
    </div>
  );
}

export default App;
