import React from "react";
import { useState } from "react";
import { Tabs } from 'antd-mobile'
import PostReel from '../components/PostReel';
import { useAuth } from "../hooks/AuthContext";
import { useFetch } from "../hooks/FetchContext";

const Home = () => {
  const { getUserId } = useAuth();
  const userId = getUserId();

  const {fetched, getUser, getPosts} = useFetch();
  // const { userId } = useAuth();
  // fake query
  if (!fetched) return <></>;
  const getRecommendations = (userId) => {
    //console.log(getPosts(1));
    return getPosts(1);
    //return [1,2];
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
