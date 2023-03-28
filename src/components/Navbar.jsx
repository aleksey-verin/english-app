import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { DICTIONARY_ROUTE, LOGIN_ROUTE, TRAINING_ROUTE, WORDS_ROUTE } from '../routes/routes';
import { useSelector } from 'react-redux';
import { selectorUser } from '../store/reducers/userSlice';

const Navbar = () => {
  const [user] = useAuthState(auth);
  // const user = useSelector(selectUser);

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

// {
//   "apiKey": "AIzaSyA7pJtwOmWLQoM2rrclvsIth3sg7FK_C-0",
//   "authDomain": "dictionary-app-4e6ca.firebaseapp.com",
//   "appName": "[DEFAULT]",
//   "currentUser": {
//       "uid": "cuwHt6U2xPOhCKUrEKpknOHmZK42",
//       "email": "verevaa@gmail.com",
//       "emailVerified": true,
//       "displayName": "Aleksey Verin main",
//       "isAnonymous": false,
//       "photoURL": "https://lh3.googleusercontent.com/a/AEdFTp62qeaj9s1wz8Y_Lyt-jTgCoXX2xK_VFcL38CJlsg=s96-c",
//       "providerData": [
//           {
//               "providerId": "google.com",
//               "uid": "102949532924476270375",
//               "displayName": "Aleksey Verin main",
//               "email": "verevaa@gmail.com",
//               "phoneNumber": null,
//               "photoURL": "https://lh3.googleusercontent.com/a/AEdFTp62qeaj9s1wz8Y_Lyt-jTgCoXX2xK_VFcL38CJlsg=s96-c"
//           }
//       ],
//       "stsTokenManager": {
//           "refreshToken": "APJWN8dWF_6brIVkbx4pXIqLxGM3Gk11HoZ4cG1PQLW-9LillzlSff0uJ_y1BCQ10uHIrfoLD1Fra58q-ZUoRx57bmTc2nsQmU3JHTceU237RJz8uAqFCdd4h7DnXz2_q2DmD7eW7uRYwPakyCHrGUiWdHUUBX3v-TWdiDgjf5jDzHggN8sWfrF6WUS2uacil0NtLkn1eNPcC46iW7dlSMdqiskcwTfVl-G9RiGfshiMK1kQn4xA664nwnXJwlMfxT35ir8qKmfk-ER78xPDj3kejTJDc7G41nxtmS_W-o5_nHUYKrUVdUObwoNvd2yXPyYOfC3I6kbUmh5N1D4sguJS-FQKEi_gfB33KX0pFPFcbz3VlX138No4K43nRVkC7NmK5hm9F9Tsvd3J4Af9c0RIV2k4LDlXntFP60LklKHMhpKholdOyt_agShxXo6v0_kbfSj0K4g3",
//           "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1YzJiNDBhYTJmMzIyNzk4NjY2YTZiMzMyYWFhMDNhNjc3MzAxOWIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWxla3NleSBWZXJpbiBtYWluIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDYycWVhajlzMXd6OFlfTHl0LWpUZ0NvWFgyeEtfVkZjTDM4Q0psc2c9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZGljdGlvbmFyeS1hcHAtNGU2Y2EiLCJhdWQiOiJkaWN0aW9uYXJ5LWFwcC00ZTZjYSIsImF1dGhfdGltZSI6MTY3Njg3NDM4OSwidXNlcl9pZCI6ImN1d0h0NlUyeFBPaENLVXJFS3Brbk9IbVpLNDIiLCJzdWIiOiJjdXdIdDZVMnhQT2hDS1VyRUtwa25PSG1aSzQyIiwiaWF0IjoxNjc2ODc0Mzg5LCJleHAiOjE2NzY4Nzc5ODksImVtYWlsIjoidmVyZXZhYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMjk0OTUzMjkyNDQ3NjI3MDM3NSJdLCJlbWFpbCI6WyJ2ZXJldmFhQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.G-POYFoRpIBVtJoVLbfsrv7ToEwrkICtWM8FKTc0qcVjKSO5CoHDbW_5R2a4EgwBAEDbhv9LAtorHcgP8s_e_CAIYMs1-wvpfGfRZNag8Yo8Nek-TJxCeIypPICtrt1YvkFOVLnteK2FGY9OfFww6j6vgRBJVf1173jMxRxBmz2mgQD_3g5YnJVsgmr46uZc4cHwTnqAkRKBCGUP9netlG65fxvErYsgVf2zHQddRJeOykfhhUG9tDMGzqNFJ9fbphoVtPrpwIK_TPpmZPORypIRjsjRCJ_6thc_FHmf-sB_gGDELzyxQn4vQLcyVuJ_T-CwCGKnhASgwL7_C0vQbw",
//           "expirationTime": 1676877989066
//       },
//       "createdAt": "1676830504288",
//       "lastLoginAt": "1676874389107",
//       "apiKey": "AIzaSyA7pJtwOmWLQoM2rrclvsIth3sg7FK_C-0",
//       "appName": "[DEFAULT]"
//   }
