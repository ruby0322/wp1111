import React from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "antd-mobile";

const features = {
  home: '首頁',
  search: '搜尋',
  invite: '發起',
  chat: '訊息',
  user: '用戶',
}

const Header = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <NavBar
        backArrow={false}
        style={{
          backgroundColor: 'var(--adm-color-primary)',
          fontWeight: 'bold',
          color: 'white'
        }}
      >
        {features[pathname.split('/')[1]]}
      </NavBar>
    </div>
  );
};

export default Header;
