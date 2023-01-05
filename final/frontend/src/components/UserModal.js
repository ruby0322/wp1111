import React from 'react';
import { AutoCenter, Button, List, Avatar, Space } from 'antd-mobile';

const UserModal = ({user}) => {

    //console.log(user);
    const { displayName, school, department, gender, favoriteFood } = user;
    //console.log(displayName)

    const handleClickMessage = () => {
        console.log("message");
    }

    const handleClickFollow = () => {
        console.log("follow");
    }

    return (
        <>
          <List header='主揪個人資訊'>
            <List.Item prefix={<Avatar style={{ '--size': '2rem', marginRight: '1rem' }} src='' />}>
            姓名 : {displayName}
            </List.Item>
            <List.Item>
            {school} {department}
            </List.Item>
          </List>
          <List>
            <List.Item>ⓘ性別：{gender}</List.Item>
            <List.Item>ⓘ最喜歡的食物：{favoriteFood}</List.Item>
            <List.Item>ⓘ興趣：</List.Item>
          </List>
          
          <AutoCenter>
            <Space>
            <Button onClick={() => handleClickMessage()}>私訊</Button>
            <Button onClick={() => handleClickFollow()}>追蹤</Button>
          </Space>
          </AutoCenter>
        </>
    );
}

export default UserModal;