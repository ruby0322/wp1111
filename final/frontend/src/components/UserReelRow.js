import React, { useState } from "react";
import { List, Empty, Avatar, Popup } from "antd-mobile";
import { useFetch } from '../hooks/FetchContext';
import { useNavigate } from "react-router-dom";
import UserModal from "./UserModal";

const UserReelRow = ({ userId, onClick }) => {
  const [userOpen, setUserOpen] = useState(false);
  const { getUser } = useFetch()
  return (
    <div key={`user-${userId}`}>
      <List.Item
        onClick={(e) => {
          setUserOpen(true);
          if (onClick)
            onClick();
        }}
        prefix={<Avatar src={getUser(userId).imgUrl} />}
        description={
          getUser(userId).school +
          " " +
          getUser(userId).department
        }
      >
        {getUser(userId).displayName}
      </List.Item>
      <Popup
        visible={userOpen}
        onMaskClick={() => {
          setUserOpen(false);
        }}
        bodyStyle={{
          width: '94%',
          padding: '3%',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          height: '60vh',
        }}
      >
        <UserModal hostId={userId} />
      </Popup>
    </div>
  );
}

export default UserReelRow;