import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { DICTIONARY_ROUTE, LOGIN_ROUTE, TRAINING_ROUTE, WORDS_ROUTE } from '../routes/routes';
import { useSelector } from 'react-redux';
import { selectorUser } from '../store/reducers/userSlice';

const Navbar = () => {
  // const [user] = useAuthState(auth);
  const { user } = useSelector(selectorUser);

  return (
    <header>
      <nav>
        <div className="menu">
          <NavLink to={DICTIONARY_ROUTE}>
            <div className="nav-item">Dictionary</div>
          </NavLink>
          <NavLink to={WORDS_ROUTE}>
            <div className="nav-item">My words</div>
          </NavLink>
          <NavLink to={TRAINING_ROUTE}>
            <div className="nav-item">Training</div>
          </NavLink>
        </div>
        <div className="login">
          {user ? (
            <>
              <div className="login-user">
                <img
                  className="login-user__image"
                  src={user.photoURL ? user.photoURL : ''}
                  alt="avatar"
                />
                <div className="login-user__name">
                  {user.displayName
                    ? user.displayName.length > 20
                      ? `${user.displayName.slice(0, 20)}..`
                      : user.displayName
                    : null}
                </div>
              </div>
              <div onClick={() => auth.signOut()} className="btn">
                Log Out
              </div>
            </>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <div className="login btn">Log in</div>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
