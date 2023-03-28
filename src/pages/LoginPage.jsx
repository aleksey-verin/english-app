/* eslint-disable react/prop-types */
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../utils/firebase';
import Google from '../images/google.svg';
import { useDispatch } from 'react-redux';
import { requestUser } from '../store/actions/userAction';

const LoginPage = () => {
  const dispatch = useDispatch();
  const auth = getAuth(app);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { email }
    } = await signInWithPopup(auth, provider);
    if (email) {
      dispatch(requestUser());
    }
  };

  return (
    <div className="login-container">
      <div className="login-title">
        <button onClick={login} className="google btn">
          <img className="google-img" src={Google} alt="google" />
          <div className="google-text">Enter with Google</div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
