import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { arrayUnion, collection, doc, updateDoc, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { firestore } from '../../utils/firebase';
import { storage, storageGetItem } from '../../utils/localStorage';
import { selectorUser } from './userSlice';
// import { firestore } from '../../firebase';
const userEmail = storageGetItem(storage.user).email;

export const firestoreApi = createApi({
  reducerPath: 'firestoreApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchUserDictionary: builder.query({
      async queryFn() {
        try {
          // console.log(user);
          const ref = collection(firestore, `dictionary-${userEmail}`);
          const querySnapshot = await getDocs(ref);
          const userDictionary = [];
          querySnapshot?.forEach((doc) => {
            userDictionary.push(doc.data());
          });
          return { data: userDictionary };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      }
    })
    // setNewHighScore: builder.mutation({
    //   async queryFn({ scoresTableId, newHighScore }) {
    //     try {
    //       await updateDoc(doc(firestore, 'scoresTables', scoresTableId), {
    //         scores: arrayUnion(newHighScore)
    //       });
    //       return 'check it in docs';
    //     } catch (error) {
    //       console.error(error.message);
    //       return { error: error.message };
    //     }
    //   },
    //   invalidatesTags: ['Score']
    // })
  })
});

export const { useFetchUserDictionaryQuery, useSetNewHighScoreMutation } = firestoreApi;

// const { data, isLoading, isSuccess, isError, error } = useFetchUserDictionaryQuery();
