import React from "react";
import { List, Empty, Avatar } from "antd-mobile";
import { useFetch } from '../hooks/FetchContext';
import { useNavigate } from "react-router-dom";

const images = {
  男: "https://media.discordapp.net/attachments/1050841910006259772/1060265308205629460/male.png",
  女: "https://media.discordapp.net/attachments/1050841910006259772/1060270626142695595/female.jpg",
  其他: "",
};

const UserReel = ({ userIds, onClick }) => {
  const navigate = useNavigate();
  const {getUser, getPosts} = useFetch();
  console.log(userIds)
  return userIds.length > 0 ? (
    <List
      style={{
        justifyContent: "right",
        '--border-top': 'none',
        '--border-bottom': 'none',
      }}
    >
      {
        userIds.map((id) => {
          return (
            <List.Item
              key={`user-${id}`}
              onClick={(e) => {
                navigate(`/user/${id}`);
                if (onClick)
                  onClick();
              }}
              prefix={<Avatar src={getUser(id).imgUrl} />}
              description={
                getUser(id).school +
                " " +
                getUser(id).department
              }
            >
              {getUser(id).displayName}
            </List.Item>
          );
        })
      }
    </List>
  ) : (
    <Empty description="這裡沒有使用者" />
  );
};

export default UserReel;
