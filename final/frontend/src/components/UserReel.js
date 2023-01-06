import React, { useState } from "react";
import { List, Empty, Avatar, Popup } from "antd-mobile";
import { useFetch } from '../hooks/FetchContext';
import { useNavigate } from "react-router-dom";
import UserReelRow from "./UserReelRow";

const images = {
  男: "https://media.discordapp.net/attachments/1050841910006259772/1060265308205629460/male.png",
  女: "https://media.discordapp.net/attachments/1050841910006259772/1060270626142695595/female.jpg",
  其他: "",
};

const UserReel = ({ userIds, onClick }) => {
  const [userOpen, setUserOpen] = useState(false);
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
            <UserReelRow key={`user-reel-row-${id}`} userId={id} />
          );
        })
      }
    </List>
  ) : (
    <Empty description="這裡沒有使用者" />
  );
};

export default UserReel;
