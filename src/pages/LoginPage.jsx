/* eslint-disable react/prop-types */
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase';
import Google from '../images/google.svg';

const LoginPage = ({ setUserMyEmail }) => {
  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { email }
    } = await signInWithPopup(auth, provider);
    if (email) {
      setUserMyEmail(email);
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
