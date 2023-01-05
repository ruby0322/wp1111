import React, { useState } from "react";
import { Card, Toast, Button, Popup } from 'antd-mobile'
import { AntOutline, RightOutline } from 'antd-mobile-icons'
import { useFetch } from "../hooks/FetchContext";

import PostInfo from "./PostInfo";

const Post = ({ postId }) => {
  const {getPost, getUser} = useFetch();
  const post = getPost(postId);
  //console.log("postId:",postId)
  const { title, body, tags, location, due, startTime, endTime, maximum } = post;
  const [showMore, setShowMore] = useState(false);
  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <>
      <Card
        title={
          <div style={{ fontWeight: 'normal' }}>
            <AntOutline style={{ marginRight: '4px' }} />
            { title }
          </div>
        }
        extra={<RightOutline />}
        onBodyClick={handleShowMore}
        onHeaderClick={handleShowMore}
        style={{ borderRadius: '16px' }}
        >
        <div>
          { body }
        </div>
      </Card>
      <Popup
        visible={showMore}
        onMaskClick={() => {
          setShowMore(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          height: '80vh',
        }}
      >
        <PostInfo postId={postId} post={post} />
      </Popup>
    </>
  );
};

export default Post;