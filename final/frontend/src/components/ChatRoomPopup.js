import React, { useState, useRef, useEffect } from "react";
import { SearchBar, NavBar, AutoCenter } from 'antd-mobile';
import Message from './Message';
import styled from 'styled-components';
import {
  MessageFill,
} from 'antd-mobile-icons'

const ChatBoxesWrapper = styled.div`
  width: 80%;
  height: 80%;
  background: #eeeeee;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`

const fakeMessages = [
{from: "貓",content: "早安", to: "貓", timestamp:"2023/1/4 10:00:00"},
{from: "Ruby",content: "暖他一整天", to: "貓", timestamp:"2023/1/4 10:10:00"},
{from: "貓",content: "?", to: "貓", timestamp:"2023/1/4 10:20:00"},
{from: "貓",content: "暖你媽", to: "貓", timestamp:"2023/1/4 10:21:00"}]

const ChatRoomPopup = ({ chatRoomName, setVisible }) => {
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [messages, setMessages] = useState(fakeMessages);
  const messageFooterRef = useRef(null);
  const me = {name: "Ruby"};

  const scrollToBottom = () => {
    messageFooterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    scrollToBottom();
    setMessageSent(false);
  }, [messageSent]);

  const sendMessage = (msg) => {
    setMessages([...messages, {from: me.name, content: msg, to: chatRoomName, timestamp: new Date()}])
    console.log(messages)
  }

  const handleSend = (msg) => {
    if (!msg) {
      //alert no message
      return; 
    }
    sendMessage(msg);
    setMessage('');
    setMessageSent(true);
  };

  return (
    <>
      <NavBar onBack={() => { setVisible(false); }}>
        {chatRoomName}
      </NavBar>
      <ChatBoxesWrapper>
        {
          messages.length === 0 ?
            <p style={{ color: '#ccc' }}>
              {`Start Chatting w/ ${chatRoomName}`}
            </p> :
            messages.map(({ from, content, timestamp }, index) => (
              <Message
                isMe={from === me.name}
                color='blue'
                key={`message-${index}`}
                from={from}
                content={content}
                timestamp={timestamp}
                displayAvatar={index === 0 || from !== messages[index - 1].from}
              />
            ))
        }
        <span id='message-footer' ref={messageFooterRef} />
      </ChatBoxesWrapper>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          padding: '3vw',
          width: '94vw',
        }}
      >
        <SearchBar
          onChange={(value) => { setMessage(value) }}
          value={message}
          icon={<MessageFill />}
          clearable={true}
          placeholder='說點什麼...'
          style={{ borderRadius: 0 }}
          enterButton="Search"
          onSearch={() => {
            handleSend(message);
          }}
        />
      </div>  
    </>
  );
};

export default ChatRoomPopup;