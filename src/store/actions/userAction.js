import { onAuthStateChanged } from '../../utils/firebase';
import { userSlice } from '../reducers/userSlice';

export const requestUser = (auth) => {
  const { userLogin, userLoginSuccess, userLoginError, userLoginOut } = userSlice.actions;

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
              photoURL: userAuth.photoURL
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
