/* eslint-disable react/prop-types */
import Google from '../images/google.svg';
import { useDispatch } from 'react-redux';
import { getDictionary } from '../store/reducers/dictionarySlice';
import { selectorUserAuth, userAuth, userSign } from '../store/reducers/userAuthSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loader from '../components/Loader';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isSuccess, isLoading } = useSelector(selectorUserAuth); // const auth = getAuth(app);

  const handleLogin = async () => {
    dispatch(userAuth(userSign.in));

    // const provider = new GoogleAuthProvider();
    // const {
    //   user: { email }
    // } = await signInWithPopup(auth, provider);
    //   if (email) {
    //     console.log(email);
    //     dispatch(requestUser(auth));
    //     dispatch(getDictionary(email));
    //   }
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(getDictionary());
  //   }
  // }, [isSuccess]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="login-container">
      <div className="login-title">
        <button onClick={handleLogin} className="google btn">
          <img className="google-img" src={Google} alt="google" />
          <div className="google-text">Enter with Google</div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
