/* eslint-disable react/prop-types */
import Google from '../images/google.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUserAuth, userAuth, userSign } from '../store/reducers/userAuthSlice';
import Loader from '../components/Loader';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectorUserAuth); // const auth = getAuth(app);

  const handleLogin = async () => {
    dispatch(userAuth(userSign.in));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="auth content">
      <div className="login-title">
        <button onClick={handleLogin} className="google btn">
          <img className="google-img" src={Google} alt="google" />
          <div className="google-text">Enter with Google</div>
        </button>
      </div>
    </main>
  );
};

export default LoginPage;
