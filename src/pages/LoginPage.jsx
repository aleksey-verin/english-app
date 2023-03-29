/* eslint-disable react/prop-types */
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase';
import Google from '../images/google.svg';
import { useDispatch } from 'react-redux';
import { requestUser } from '../store/actions/userAction';
import { getUserDictionary } from '../store/reducers/userDictionarySlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  // const auth = getAuth(app);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { email }
    } = await signInWithPopup(auth, provider);
    if (email) {
      dispatch(requestUser(auth));
      dispatch(getUserDictionary(email));
    }
  };

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
