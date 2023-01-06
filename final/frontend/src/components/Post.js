import React, { useState } from "react";
import { Card, Toast, Button, Popup, Avatar, List, Space, Tag, Ellipsis } from 'antd-mobile'
import { AntOutline, RightOutline, SearchOutline } from 'antd-mobile-icons'
import { useFetch } from "../hooks/FetchContext";

import PostInfo from "./PostInfo";

const Post = ({ postId }) => {
  const {getPost, getUser} = useFetch();
  const post = getPost(postId);
  //console.log("postId:",postId)
  const { title, body, location, due, startTime, endTime, maximum, host, tags } = post;
  const { imgUrl, displayName, school, department } = getUser(host);
  const [showMore, setShowMore] = useState(false);
  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <>
      <Card
        title={
          title
        }
        extra={<SearchOutline />}
        onBodyClick={handleShowMore}
        onHeaderClick={handleShowMore}
        >
          <Ellipsis direction='end' content={body} rows={3} style={{wordBreak: 'break-word'}} />
        <Space
          block
          style={{
            width: '100%',
            justifyContent: 'flex-end'
          }} >
              {
                tags.map(tag => <Tag key={`${postId}-tag-${tag}`}>{tag}</Tag>)
              }
          </Space>
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