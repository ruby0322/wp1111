import React from "react";
import { useState } from "react";
import { Tabs } from 'antd-mobile'
import PostReel from '../components/PostReel';
import { useAuth } from "../hooks/AuthContext";
import { useFetch } from "../hooks/FetchContext";
import Welcome from "./Welcome";

const Home = () => {
  const { userId, signedIn  } = useAuth();
  const { fetched, getUser, getPosts } = useFetch();
  console.log('signedIn', signedIn);
  if (!fetched) return <>loading</>;
  if (!signedIn) return <Welcome />;
  const getRecommendations = (userId) => {
    return getPosts(userId);
  }
  const getFollowingPosts = (userId) => {
    return getUser(userId).followingPosts;
  }
  return (
    <Tabs>
      <Tabs.Tab title='推薦' key='recommendation'>
        <PostReel posts={getRecommendations(userId)} />
      </Tabs.Tab>
      <Tabs.Tab title='追蹤' key='vegetables'>
        <PostReel posts={getFollowingPosts(userId)} />
      </Tabs.Tab>
    </Tabs>
  );
};

export default Home;
