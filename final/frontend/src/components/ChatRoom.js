import React, { useState } from "react";
import { Avatar, List, Badge, Popup, NavBar } from "antd-mobile";
import { AntOutline, RightOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import ChatRoomPopup from "./ChatRoomPopup";

const fakeUsers = [
  {
    id: 1,
    displayName: '狗',
  },
  {
    id: 2,
    displayName: '貓',
  },
  {
    id: 3,
    displayName: '大象',
  },
];

const fakeChatRooms = [
  {
    id: 1,
    cover: "",
    name: "",
    members: [1, 2],
    messages: [1, 2, 3],
  },
  {
    id: 2,
    cover: "",
    name: "",
    members: [1, 3],
    messages: [4],
  },
  {
    id: 3,
    cover: "",
    name: "一個假的群組",
    members: [1, 2, 3],
    messages: [5, 6, 7],
  },
];

const fakeMessages = [
  {
    id: 1,
    content: 'hi',
    from: 1,
    to: 2,
  },
  {
    id: 2,
    content: 'hi',
    from: 2,
    to: 1,
  },
  {
    id: 3,
    content: 'dawdawdawda',
    from: 1,
    to: 2,
  },
  {
    id: 4,
    content: 'dawdawdawdadawdawfgawg',
    from: 1,
    to: 2,
  },
  {
    id: 5,
    content: 'daw',
    from: 1,
    to: 2,
  },
  {
    id: 6,
    content: 'hi',
    from: 1,
    to: 2,
  },
  {
    id: 7,
    content: 'hi',
    from: 1,
    to: 2,
  },
];

// fake query
const queryUser = (userId) => {
  return fakeUsers[userId - 1];
};
const queryChatRoom = (chatRoomId) => {
  return fakeChatRooms[chatRoomId - 1];
};
const queryMessage = (messageId) => {
  return fakeMessages[messageId - 1];
};
const queryLastMessage = (chatRoomId) => {
  const messages = queryChatRoom(chatRoomId).messages;
  return queryMessage(messages[messages.length - 1]).content;
};  

const getPrivateChatRoomName = (chatRoom, userId) => {
  const user1 = chatRoom.members[0];
  const user2 = chatRoom.members[1];
  if (user1 === userId) {
    return queryUser(user2).displayName;
  } else {
    return queryUser(user1).displayName;
  }
}

const ChatRoom = ({ chatRoomId, type }) => {
  const [visible, setVisible] = useState(false);
  const userId = 1;
  const chatRoomUnreadNum = {
    1: 0,
    2: 1,
    3: 2,
  };
  const chatRoom = queryChatRoom(chatRoomId);
  const { cover, name } = chatRoom;
  const chatRoomName = (type === 'private' ? getPrivateChatRoomName(chatRoom, userId) : name);
  return (
    <>
      <List.Item
        prefix={chatRoomUnreadNum[chatRoomId] === 0 ? <Avatar src={cover} /> : <Badge content={chatRoomUnreadNum[chatRoomId]}><Avatar src={cover} /></Badge>}
        description={queryLastMessage(chatRoomId)}
        onClick={() => {
          setVisible(true);
        }}
      >
      {chatRoomName}
    </List.Item> 

    <Popup
      position="right"
      visible={visible}
      bodyStyle={{
        width: '100vw',
      }}  
    >
      <ChatRoomPopup setVisible={setVisible} chatRoomName={chatRoomName} />
    </Popup>
    </>
  );
};

export default ChatRoom;
