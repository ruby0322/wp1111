import React from "react";
import { useState } from "react";
import { List, Empty } from 'antd-mobile'
import Post from "./Post";

const PostReel = ({ posts }) => {

  const [hasMore, setHasMore] = useState(false);

  const loadMore = () => {
    setHasMore(false);
  };
  //console.log(posts)

  return (
    posts.length > 0 ?
    <>
      <List>
        {
          posts.map((postId, index) => (
            <List.Item key={`card-${index}`}>
              <Post postId={postId} />
            </List.Item>
          ))
        }
      </List>
      {/* <InfiniteScroll loadMore={loadMore} hasMore={hasMore} /> */}
      </> :
      <Empty
        description='查無揪卡'
      />
  );
};

export default PostReel;