import { useState, useEffect, createContext, useContext } from "react";
import { collection, getDocs, query, where, getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const LOCALSTORAGE_PROFILE_KEY = 'save-oauth-profile';
const saved = localStorage.getItem(LOCALSTORAGE_PROFILE_KEY);

const usersCollection = collection(db, 'users');

const AuthContext = createContext({
  profile: null,
  isSignedIn: () => { },
  signIn: () => { },
  signOut: () => { },
  getProfile: () => { },
  getUserId: () => {},
});

const AuthProvider = (props) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (saved) {
      signIn(saved);
    }
  }, [profile, setProfile]);

  const isSignedIn = () => {
    return profile !== null;
  };

  const signIn = async (profileObj) => {
    console.log(profileObj);
    setProfile(profileObj);
    localStorage.setItem(LOCALSTORAGE_PROFILE_KEY, profileObj);

    console.log(db);
    const res = await getDoc(doc(db, 'users', profileObj.uid));
    console.log(res.data());

    // if (!res.exists()) {
    //   setDoc(doc(db, 'users', profileObj.uid), {
    //     hobby: '',
    //     gender: '其他',
    //     imgUrl: profileObj.photoURL,
    //     followingPosts: [],
    //     followingUsers: [],
    //     followers: [],
    //     displayName: profileObj.displayName,
    //     signature: '',
    //     favoriteFood: '',
    //     school: '',
    //     department: '',
    //     verified: false,
    //     privateChatRooms: [],
    //     groupChatRooms: [],
    //     pendingPosts: [],
    //     participatedPosts: [],
    //     publishedPosts: [],
    //   })
    // }
    // const res = db.collection('users')
    // db.collection("cities").doc("LA").set({
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA"
    // })
  
    
    // const res = await getDocs(query(usersCollection, where('id', '==', profileObj.uid)));


    // console.log(res)
    // db.collection('users').doc(profileObj.uid).set(id: profileObj.uid, {merge: true})
  };
  
  const getUserId = () => {
    // return profile.uid;
    return '26pQxHM5KZD4VKBHwRlj';
  }

  const signOut = () => {
    setProfile(null);
    localStorage.setItem(LOCALSTORAGE_PROFILE_KEY, null);
  };

  const getProfile = () => {
    return profile;
  }

  return (
    <AuthContext.Provider
      value={{
        profile,
        isSignedIn,
        signIn,
        signOut,
        getProfile,
        getUserId,
      }}
      {...props}
    />
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
