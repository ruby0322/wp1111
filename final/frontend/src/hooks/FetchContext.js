import { useState, useEffect, createContext, useContext } from "react";
import { collection, getDocs, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { resolvePath } from "react-router-dom";

const postsCollection = collection(db, 'posts');
const usersCollection = collection(db, 'users');
// const postsCollection = collection(db, 'posts');
// const postsCollection = collection(db, 'posts');

const FetchContext = createContext({
    users: null,
    posts: null,
    chatRooms: null,
    messages: null,
    fetched: null,
    getPost: () => { },
    getPosts: () => { },
    getPostsWithKeywords: () => {},
    getPostsWithFilter: () => {},
    getUser: () => { },
    getChatRoom: () => { },
    getMessage: () => { },
    updateUser: () => { },
    createPost: () => { },
    followPost: () => { },
    unfollowPost: () => { },
    updatePost: () => { },
  signupPost: () => { },
  terminatePost: () => { },
  finalizePost: () => {},
});

const FetchProvider = (props) => {
  const [fetched, setFetched] = useState(false);
  const [users, setUsers] = useState({});
  const [posts, setPosts] = useState({});
  const [chatRooms, setChatRooms] = useState({});
  const [messages, setMessages] = useState({});
  const [postsIds, setPostsIds] = useState([]);

  useEffect(() => {
    // fetch with db object imported from '../firebase'
    let abortController;
    const chatRoomsRes = {};
    const messagesRes = {};
    setChatRooms(chatRoomsRes);
    setMessages(messagesRes);
    (async () => {
      abortController = new AbortController();
      const postsObj = {};
      let postIdArr = [];
      const postsRes = await getDocs(postsCollection);
      postsRes.forEach(doc => {
        //console.log(doc.id, " => ", doc.data());
        postsObj[doc.id] = doc.data();
        
        postIdArr.push(doc.id);
      })
      setPostsIds(postIdArr);
      //console.log("postIds:", postsIds)
      //console.log("postObj",postsObj);
      setPosts(postsObj);

      const usersObj = {};
      const usersRes = await getDocs(usersCollection);
      usersRes.forEach(doc => {
        //console.log(doc.id, " => ", doc.data());
        usersObj[doc.id] = doc.data();
      })
      // console.log(usersObj);
      setUsers(usersObj);
      setFetched(true);
      return () => abortController.abort();
    })();
  }, [setPosts, setUsers, setFetched, setPostsIds, setMessages, setChatRooms]);

  const getPost = (postId) => {
    return posts[postId];
  }

  const getPosts = (filter) => {
    // implement filter and return the results
    return postsIds;
  }

  const getPostsWithKeywords = (keywords) => {
    let res = postsIds.filter((post) => 
      ((getPost(post).title.search(keywords)!==-1) || (getPost(post).body.search(keywords)!==-1))
    );
    return res;
  }

  const getPostsWithFilter = (filter) => {
    // let res = postsIds.filter((post) => getPost(post).category === filter);
    let res = postsIds.filter((post) => getPost(post).tags.find((tag) => tag === filter));
    return res;
  }

  const getUser = (userId) => {
    return users[userId];
  }

  const getChatRoom = (chatRoomId) => {
    return chatRooms[chatRoomId];
  }

  const getMessage = (messageId) => {
    return messages[messageId];
  }

  const updateUser = async (userId, newUser) => {
    await updateDoc(doc(db, 'users', userId), newUser);
    const newUsers = { ...users };
    newUsers[userId] = newUser;
    setUsers(newUsers);
  }

  const updatePost = async (postId, newPost) => {
    await updateDoc(doc(db, 'posts', postId), newPost);
    const newPosts = { ...posts };
    newPosts[postId] = newPost;
    setPosts(newPosts);
  }

  const createPost = async (post) => {
    console.log('post', post);
    let newPostId;
    await addDoc(postsCollection, post)
      .then(docRef => {
        newPostId = docRef.id
        console.log(newPostId);
      });
      let newPosts = { ...posts };
      const newPost = await getDoc(doc(db, 'posts', newPostId)).data();
      console.log('newPost', newPost);
      newPosts[newPostId] = newPost;
      const userId = post.host;
      let newUser = getUser(userId);
      newUser.publishedPosts.push(newPostId);
      await updateUser(userId, newUser);
      setPosts(newPosts);
      setPostsIds([...postsIds, newPostId]);
  }

  const followPost = async (userId, postId) => {
    const newUser = users[userId];
    newUser.followingPosts.push(postId);
    updateUser(userId, newUser);

    const newPost = posts[postId];
    newPost.followers.push(userId);
    updatePost(postId, newPost);
  }

  const unfollowPost = async (userId, postId) => {
    const newUser = users[userId];
    newUser.followingPosts.splice(newUser.followingPosts.indexOf(postId), 1);
    updateUser(userId, newUser);

    const newPost = posts[postId];
    newPost.followers.splice(newPost.followers.indexOf(userId), 1);
    updatePost(postId, newPost);
  };

  const signupPost = async (userId, postId) => {
    const newUser = users[userId];
    newUser.participatedPosts.push(postId);
    updateUser(userId, newUser);

    const newPost = posts[postId];
    newPost.participants.push(userId);
    if (newPost.participants.length === newPost.maximum)
      newPost.status = 2;
    updatePost(postId, newPost);
  };

  const terminatePost = async (postId) => {
    const newPost = posts[postId];
    newPost.status = 4;
    updatePost(postId, newPost);
  };
  
  const finalizePost = async (postId) => {
    const newPost = posts[postId];
    newPost.status = 3;
    updatePost(postId, newPost);
  }

  return (
    <FetchContext.Provider
      value={{
        getPost,
        getPosts,
        getPostsWithKeywords,
        getPostsWithFilter,
        getUser,
        getChatRoom,
        getMessage,
        fetched,
        updateUser,
        createPost,
        followPost,
        unfollowPost,
        updatePost,
        signupPost,
        users,
        posts,
        terminatePost,
        finalizePost,
      }}
      {...props}
    />
  );
};

const useFetch = () => useContext(FetchContext);

export { FetchProvider, useFetch };
