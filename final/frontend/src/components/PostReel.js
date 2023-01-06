import React from "react";
import { List, Empty, SwipeAction, Toast } from 'antd-mobile'
import Post from "./Post";
import { useAuth } from "../hooks/AuthContext";
import { useFetch } from "../hooks/FetchContext";

const PostReel = ({ posts }) => {
  const { userId } = useAuth();
  const { getPost, deletePost, followPost, unfollowPost, getUser } = useFetch();
  return (
    posts.length > 0 ?
    <>
      <List
        style={{
          '--border-inner': '4px solid var(--adm-border-color)',
          '--border-top': '0px',
          '--border-bottom': 'none',
        }}
      >
        {
            posts.map((postId, index) => {
              console.log('user');
              console.log(getUser(userId));
              const isFollowing = (getUser(userId).followingPosts.indexOf(postId) !== -1);
              return <List.Item key={`card-${index}`}>
                <Post postId={postId} />
                {/* <SwipeAction
                  rightActions={[
                    getPost(postId).host === userId ? {
                      key: 'delete',
                      text: '刪除',
                      color: 'danger',
                      onClick: async () => {
                        await deletePost(postId);
                        Toast.show('成功刪除揪卡');
                      }
                    } : {
                      key: 'follow',
                      text: (isFollowing ? '退追' : '追蹤'),
                      color: isFollowing ? 'primary' : 'grey',
                        onClick: async () => {
                        if (isFollowing) {
                          await unfollowPost(userId, postId);
                          Toast.show('成功退追揪卡');
                        } else {
                          await followPost(userId, postId);
                          Toast.show('成功追蹤揪卡');
                        }
                      }
                    }
                  ]}
                >
                  
                </SwipeAction> */}
              </List.Item>
          })
        }
      </List>
      </> :
      <Empty
        description='查無揪卡'
      />
  );
};

export default PostReel;