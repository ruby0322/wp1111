import React from "react";
import { AutoCenter, Button, List, Avatar, Space, Toast, Divider } from "antd-mobile";
import { InformationCircleOutline } from "antd-mobile-icons";
import { useFetch } from "../hooks/FetchContext";
import { useAuth} from "../hooks/AuthContext";

const UserModal = ({ hostId }) => {
  const { getUser } = useFetch();
  const { userId } = useAuth();
  const isFollowingUser = (getUser(userId).followingUsers.indexOf(hostId) !== -1);
  const {
    displayName,
    school,
    department,
    gender,
    favoriteFood,
    hobby,
    signature,
    imgUrl,
  } = getUser(hostId);
  const { followPost, followUser, unfollowUser } = useFetch();

  const handleClickMessage = () => {
    console.log("message");
  };

  const handleClickFollow = () => {
    console.log(followPost);
    console.log(followUser);
    if (!isFollowingUser) {
      followUser(userId, hostId);
      Toast.show("成功追蹤主持人！");
    } else {
      unfollowUser(userId, hostId);
      Toast.show("成功退追主持人！");
    }
  };
  return (
    <>
      <List header="主揪個人資訊">
        <List.Item
          prefix={
            <Avatar
              style={{ "--size": "2rem", marginRight: "1rem" }}
              src={imgUrl}
            />
          }
        >
          {displayName}
        </List.Item>
        <List.Item>
          {school} {department}
        </List.Item>
      </List>
      <List.Item >
        {signature}
      </List.Item>
      <List>
        <List.Item prefix={<InformationCircleOutline />} extra={gender}>
          性別
        </List.Item>
        <List.Item prefix={<InformationCircleOutline />} extra={favoriteFood}>
          最喜歡的食物
        </List.Item>
        <List.Item prefix={<InformationCircleOutline />} extra={hobby}>
          興趣
        </List.Item>
        
      </List>
      <Divider />
      <div style={{display: 'flex', gap: '1rem'}}>
        <Button
          block
          onClick={() => {
            handleClickMessage();
          }}
        >
          私訊
        </Button>
        <Button
          block
          onClick={handleClickFollow}
          style={isFollowingUser ? {
            '--background-color': 'var(--adm-color-primary)',
            '--text-color': 'white'
          } : {}}
        >
          {isFollowingUser ? '退追' : '追蹤'}
        </Button>
      </div>
    </>
  );
};

export default UserModal;
