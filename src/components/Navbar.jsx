import React from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE, SEARCH_ROUTE, TRAINING_ROUTE, WORDS_ROUTE } from '../routes/routes';
import { useSelector, useDispatch } from 'react-redux';
import { selectorUserAuth, userAuth, userSign } from '../store/reducers/userAuthSlice';
import { clearAllUserData } from '../store/reducers/dictionarySlice';

const Navbar = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(selectorUserAuth);

  const handleLogOut = () => {
    dispatch(userAuth(userSign.out));
    dispatch(clearAllUserData());
  };

  return (
    <header>
      <nav>
        <div className="menu">
          <NavLink to={SEARCH_ROUTE}>
            <div className="nav-item">Search</div>
          </NavLink>
          <NavLink to={WORDS_ROUTE}>
            <div className="nav-item">My words</div>
          </NavLink>
          <NavLink to={TRAINING_ROUTE.MAIN}>
            <div className="nav-item">Training</div>
          </NavLink>
        </div>
        <div className="login">
          {user ? (
            <>
              <div className="login-user">
                <div className="login-user__image">
                  <img src={user ? user.photoURL : ''} alt="avatar" />
                </div>
                <div className="login-user__name">
                  {user.displayName
                    ? user.displayName.length > 20
                      ? `${user.displayName.slice(0, 20)}..`
                      : user.displayName
                    : null}
                </div>
              </div>
              <div onClick={handleLogOut} className="btn">
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
