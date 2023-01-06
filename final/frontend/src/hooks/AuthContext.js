import { useState, useEffect, createContext, useContext } from "react";
import { collection, getDocs, query, where, getDoc, doc, setDoc, getFirestore } from 'firebase/firestore';
import { db } from '../firebase';
// const db = getFirestore();

const LOCAL_STORAGE_KEY = 'save-auth-key';

const AuthContext = createContext({
  userId: null,
  signedIn: false,
  signIn: () => { },
  signOut: () => { },
});

const AuthProvider = (props) => {
  const [userId, setUserId] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setSignedIn(true);
      setUserId(saved);
    }
  }, []);

  const signIn = async (profileObj) => {
    setSignedIn(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, profileObj.uid);
    console.log(profileObj.uid);
    setUserId(profileObj.uid);

    try {
      const res = await getDoc(doc(db, 'users', profileObj.uid));
      if (res.exists()) {
        console.log('user already exists');
      } else {
        console.log('user doesn\'t exist');
        await setDoc(doc(db, 'users', profileObj.uid), {
          hobby: '',
          gender: '其他',
          imgUrl: profileObj.photoURL,
          followingPosts: [],
          followingUsers: [],
          followers: [],
          displayName: profileObj.displayName,
          signature: '',
          favoriteFood: '',
          school: '',
          department: '',
          verified: false,
          privateChatRooms: [],
          groupChatRooms: [],
          pendingPosts: [],
          participatedPosts: [],
          publishedPosts: [],
        });
      }
    } catch {
      console.log('error');
    }
  };
  
  const signOut = () => {
    setSignedIn(false);
    setUserId(null);
    localStorage.setItem(LOCAL_STORAGE_KEY, null);
  };

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        userId,
        signIn,
        signOut,
      }}
      {...props}
    />
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
