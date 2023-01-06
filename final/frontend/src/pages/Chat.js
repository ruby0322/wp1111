import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Avatar, Tabs } from 'antd-mobile';
import { useAuth } from "../hooks/AuthContext";
import ChatRoomReel from "../components/ChatRoomReel";

const Chat = () => {

  const { userId } = useAuth();

  const getPrivateChatRooms = (userId) => {
    return [1, 2];
  }

  const getGroupChatRooms = (userId) => {
    return [3];
  }

  return (
    <Tabs>
      <Tabs.Tab title='私訊' key='pm'>
        <ChatRoomReel chatRooms={getPrivateChatRooms(userId)} type='private' />
      </Tabs.Tab>
      <Tabs.Tab title='群組' key='group'>
        <ChatRoomReel chatRooms={getGroupChatRooms(userId)} type='group' />
      </Tabs.Tab>
    </Tabs>
    
  );
};

export default Chat; 
