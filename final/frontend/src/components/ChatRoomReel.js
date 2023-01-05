import React from "react";
import { SwipeAction, List, Empty } from "antd-mobile";
import ChatRoom from "./ChatRoom";

const ChatRoomReel = ({ type, chatRooms }) => {
  return chatRooms.length > 0 ? (
    <List style={{ justifyContent: 'right' }}>
      {
        chatRooms.map(
          (chatRoomId, index) => (
            <ChatRoom type={type} chatRoomId={chatRoomId} key={`chatRoom-${index}`} />
          )
        )
      }
    </List>
  ) : (
    <Empty description="這裡沒有聊天室" />
  );
};

export default ChatRoomReel;
