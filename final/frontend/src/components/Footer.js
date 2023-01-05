import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Badge, TabBar } from 'antd-mobile'
import {
  MessageFill,
  FireFill,
  EyeFill,
  SmileFill,
  EditFill 
} from 'antd-mobile-icons'

const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userId = '26pQxHM5KZD4VKBHwRlj';
  const tabs = [
    {
      key: '/home',
      title: '首頁',
      icon: <FireFill />,
    },
    {
      key: '/search',
      title: '搜尋',
      icon: <EyeFill />,
    },
    {
      key: '/invite',
      title: '發起',
      icon: <EditFill />,
    },
    {
      key: '/chat',
      title: '訊息',
      icon: <MessageFill />,
    },
    {
      key: `/user/${userId}`,
      title: '個人',
      icon: <SmileFill />,
    },
  ]

  return (
    <div style={{
      position: "fixed",
      width: '100vw',
      bottom: 0,
      backgroundColor: 'white',
    }}>
      <TabBar activeKey={pathname} onChange={value => navigate(value)}>
        {
          tabs.map(
            item => (
              <TabBar.Item onClick={item.onClick} key={item.key} icon={item.icon} title={item.title} />
            )
          )
        }
      </TabBar>
    </div>
  );
};

export default Footer;
