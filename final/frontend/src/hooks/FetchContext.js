import { useState, useEffect, createContext, useContext } from "react";
import { collection, getDocs, addDoc, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { resolvePath } from "react-router-dom";

const postsCollection = collection(db, 'posts');
const usersCollection = collection(db, 'users');
const messagesCollection = collection(db, 'messages');
const chatRoomsCollection = collection(db, 'chatRooms');

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
    followUser: () => { },
    unfollowUser: () => { },
    createPost: () => { },
    followPost: () => { },
    unfollowPost: () => { },
    updatePost: () => { },
    signupPost: () => { },
    terminatePost: () => { },
    finalizePost: () => { },
  // deletePost: () => { },
  signUp: () => {},
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
    // const chatRoomsRes = {};
    // const messagesRes = {};
    // setChatRooms(chatRoomsRes);
    // setMessages(messagesRes);
    let abortController;
    (async () => {
      abortController = new AbortController();
      const postsObj = {};
      let postIdArr = [];
      const postsRes = await getDocs(postsCollection);
      postsRes.forEach(doc => {
        postsObj[doc.id] = doc.data();
        
        postIdArr.push(doc.id);
      })
      setPostsIds(postIdArr);
      setPosts(postsObj);

      const usersObj = {};
      const usersRes = await getDocs(usersCollection);
      usersRes.forEach(doc => {
        usersObj[doc.id] = doc.data();
      })
      setUsers(usersObj);
      setFetched(true);
    })();
    return () => abortController.abort();
  }, []);

  const getPost = (postId) => {
    return posts[postId];
  }

  const getPosts = (userId) => {
    // return recommended posts
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
    // const res = (await getDoc(doc(db, 'users', userId)));
    // if (res.exists()) {
    //   console.log(res.data());
    // }
    // return {};
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

  const followUser = async (userId, hostId) => {
    console.log("follow");
    const newUser = users[userId];
    newUser.followingUsers.push(hostId);
    await updateUser(userId, newUser);
    console.log("user", users[userId].followingUsers)

    const newHost = users[hostId];
    newHost.followers.push(userId);
    await updateUser(hostId, newHost);
    console.log("host", users[hostId].followers)
  }

  const unfollowUser = async (userId, hostId) => {
    const newUser = users[userId];
    newUser.followingUsers.splice(newUser.followingUsers.indexOf(hostId), 1);
    await updateUser(userId, newUser);
    console.log("user", users[userId].followingUsers)

    const newHost = users[hostId];
    newHost.followers.splice(newHost.followers.indexOf(userId), 1);
    await updateUser(hostId, newHost);
    console.log("host", users[hostId].followers)
  };

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
      const newPost = (await getDoc(doc(db, 'posts', newPostId))).data();
      console.log('newPost', newPost);
      newPosts[newPostId] = newPost;
      const userId = post.host;
      let newUser = getUser(userId);
      newUser.publishedPosts.push(newPostId);
      await updateUser(userId, newUser);
      setPosts(newPosts);
      setPostsIds([newPostId, ...postsIds]);
  }

  const followPost = async (userId, postId) => {
    console.log('幹你娘');
    const newUser = users[userId];
    newUser.followingPosts.push(postId);
    await updateUser(userId, newUser);

    const newPost = posts[postId];
    newPost.followers.push(userId);
    await updatePost(postId, newPost);
  }

  const unfollowPost = async (userId, postId) => {
    const newUser = users[userId];
    newUser.followingPosts.splice(newUser.followingPosts.indexOf(postId), 1);
    await updateUser(userId, newUser);

    const newPost = posts[postId];
    newPost.followers.splice(newPost.followers.indexOf(userId), 1);
    await updatePost(postId, newPost);
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
  };

  // const deletePost = async (postId) => {
  //   const newUsers = { ...users };
  //   posts[postId].followers.map((userId) => {
  //     newUsers[userId].followingPosts.splice(newUsers[userId].followingPosts.indexOf(postId), 1);
  //     updateUser(userId, newUsers[userId]);
  //     return undefined;
  //   });
  //   posts[postId].participants.map((userId) => {
  //     newUsers[userId].participatedPosts.splice(newUsers[userId].participatedPosts.indexOf(postId), 1);
  //     updateUser(userId, newUsers[userId]);
  //     return undefined;
  //   });
  //   newUsers[posts[postId].host] = newUsers[posts[postId].host].publishedPosts.filter(x => x !== postId);
  //   await deleteDoc(doc(db, 'posts', postId));
  //   updateUser(posts[postId].host, newUsers[posts[postId].host]);
  //   setPostsIds(postsIds.filter(x => x !== postId));
  //   // setUsers(newUsers);
  // };

  const sendMessage = async (userId, message) => {
    await addDoc(messagesCollection, message);
  };

  const signUp = (userId) => {
    const res = getDoc(doc(db, 'users', userId));
    if (res.exists()) {
      const newUsers = { ...users };
      newUsers[userId] = res.data();
      setUsers(newUsers);
    }
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
        followUser,
        unfollowUser,
        createPost,
        followPost,
        unfollowPost,
        updatePost,
        signupPost,
        users,
        posts,
        terminatePost,
        finalizePost,
        // deletePost,
        signUp,
      }}
      {...props}
    />
  );
};

const useFetch = () => useContext(FetchContext);

export { FetchProvider, useFetch };
