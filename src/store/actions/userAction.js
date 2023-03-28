import { auth, onAuthStateChanged } from '../../utils/firebase';
import userSlice, {
  userLogin,
  userLoginError,
  userLoginOut,
  userLoginSuccess
} from '../reducers/userSlice';

export const requestUser = () => {
  // const { userLogin, userLoginSuccess, userLoginError, userLoginOut } = userSlice.actions;

  return async (dispatch) => {
    try {
      dispatch(userLogin());
      onAuthStateChanged(auth, (userAuth) => {
        if (userAuth) {
          dispatch(
            userLoginSuccess({
              email: userAuth.email,
              uid: userAuth.uid,
              displayName: userAuth.displayName,
              photoUrl: userAuth.photoURL
            })
          );
        } else {
          dispatch(userLoginOut());
        }
      });
    } catch (error) {
      dispatch(userLoginError(error));
    }
  };
};
