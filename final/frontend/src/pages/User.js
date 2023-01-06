import React from "react";
import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Input,
  Button,
  Avatar,
  List,
  Selector,
  Card,
  Grid,
  TextArea,
  Popup,
  Divider,
  AutoCenter,
  Tabs,
  Modal,
  Form
} from "antd-mobile";
import { EditFill, InformationCircleOutline } from "antd-mobile-icons";
import UserReel from "../components/UserReel";
import { useAuth } from '../hooks/AuthContext';
import { useFetch } from '../hooks/FetchContext';
import PostReel from "../components/PostReel";
import Welcome from "./Welcome";

const NumberStyle = {
  fontSize: 20,
  fontWeight: 350,
  color: 'var(--adm-color-text-secondary)'
};

const User = () => {
  const { userId, signedIn } = useAuth();
  const { fetched, updateUser, getUser } = useFetch();
  const { id } = useParams();
  const [isFollowingPopupOpen, setIsFollowingPopupOpen] = useState(false);
  const [isFollowersPopupOpen, setIsFollowersPopupOpen] = useState(false);
  const [form] = Form.useForm();
  
  if (!fetched) return <>loading...</>;
  if (!signedIn) return <Welcome />
  let user = getUser(id);
  console.log(user);
  
  const showModal = () => {
    console.log('edit clicked');
    Modal.show({
      content: <Form
      preserve={false}
      form={form}
      layout="vertical"
      initialValues={user}
      footer={
        <AutoCenter>
          <Button onClick={handleOk}>
            確定修改
          </Button>
        </AutoCenter>
      }
      style={{
        height: '20rem',
      }}
        mode='card'
      >
      <Form.Header>修改個人資訊</Form.Header>
      <Form.Item
        name="displayName"
        label="暱稱"
        rules={[{ required: true, message: "請輸入你的暱稱！" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="school"
        label="學校"
        rules={[{ required: true, message: "請輸入你的學校！" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="department"
        label="學系"
        rules={[{ required: true, message: "請輸入你的學系！" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="性別"
        rules={[{ required: true, message: "請輸入性別！" }]}
        >
        <Selector
          columns={1}
          options={[
            { label: "男", value: "男" },
            { label: "女", value: "女" },
            { label: "其他", value: "其他" },
          ]}
          style={{
            '--border-radius': '100px',
            '--border': 'solid transparent 1px',
            '--checked-border': 'solid var(--adm-color-primary) 1px',
            '--padding': '8px 24px',
            '--checked-color': 'var(--adm-color-primary)',
            '--checked-text-color': 'white',
          }}
          showCheckMark={false}
        />
      </Form.Item>
      <Form.Item
        name="favoriteFood"
        label="最喜歡的食物"
        rules={[{ required: true, message: "請輸入最喜歡的食物！" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="hobby"
        label="興趣"
        rules={[{ required: true, message: "請輸入興趣！" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="signature"
        label="自我介紹"
        rules={[{ required: true, message: "請輸入自我介紹！" }]}
      >
        <TextArea maxLength={100} rows={4} showCount />
      </Form.Item>
      </Form>,
      closeOnMaskClick: true,
      showCloseButton: true,
      destroyOnClose: true,
    });
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      user = { ...user, ...values }
      user.gender =  values.gender[0]
      console.log(user);
      updateUser(userId, user);
      form.resetFields();
      Modal.clear();
    });
  };

  const onClick = () => {
    Modal.clear();
    setIsFollowersPopupOpen(false);
    setIsFollowingPopupOpen(false);
  };

  const handleFollowers = () => {
    setIsFollowersPopupOpen(true);
  };

  const handleFollowing = () => {
    setIsFollowingPopupOpen(true);
  };

  const Following = (
    <Popup
      visible={isFollowingPopupOpen}
      onMaskClick={() => {
        setIsFollowingPopupOpen(false);
      }}
      bodyStyle={{
        width: '94%',
        padding: '3%',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        height: '80vh',
      }}
    >
      <UserReel onClick={onClick} userIds={user.followingUsers} />
    </Popup>
  );

  const Followers = (
    <Popup
      visible={isFollowersPopupOpen}
      onMaskClick={() => {
        setIsFollowersPopupOpen(false);
      }}
      bodyStyle={{
        width: '94%',
        padding: '3%',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        height: '60vh',
      }}
    >
      <UserReel onClick={onClick} userIds={user.followers} />
    </Popup>
  );

  return (
    <>
      <Card>
        <List
          style={{
            '--border-top': 'none',
            '--border-bottom': 'none',
          }}
        >
          <List.Item
            prefix={<Avatar src={user.imgUrl} />}
            description={user.school + ' ' + user.department}
            extra={
              <Button disabled={id !== userId} onClick={showModal}>
                <EditFill />{" "}
              </Button>
            }
          >
            {user.displayName}
          </List.Item>
        </List>

        <Grid columns={4} gap={0} style={{ textAlign: "center" }}>
          <Grid.Item>
            <p
              style={NumberStyle}
            >{user.participatedPosts.length}</p>
          </Grid.Item>
          <Grid.Item>
            <p
              style={NumberStyle}
            >{user.publishedPosts.length}</p>
          </Grid.Item>
          <Grid.Item onClick={handleFollowers}>
            <p
              style={NumberStyle}
            >{user.followers.length}</p>
          </Grid.Item>
          <Grid.Item onClick={handleFollowing}>
            <p
              style={NumberStyle}
            >{user.followingUsers.length}</p>
          </Grid.Item>
          <Grid.Item>
            完成配對
          </Grid.Item>
          <Grid.Item>
            發布揪卡
          </Grid.Item>
          <Grid.Item onClick={handleFollowers}>
            粉絲
          </Grid.Item>
          <Grid.Item onClick={handleFollowing}>
            追蹤人數
          </Grid.Item>
        </Grid>

        <Divider />
        <AutoCenter
        style={{wordBreak: 'break-word'}}
        >
          {user.signature}
        </AutoCenter>

        <Divider />
        <List>
          <List.Item
            prefix={<InformationCircleOutline />}
            extra={user.gender}
          >性別</List.Item>
          <List.Item
            prefix={<InformationCircleOutline />}
            extra={user.favoriteFood}
          >最喜歡的食物</List.Item>
          <List.Item
            prefix={<InformationCircleOutline />}
            extra={user.hobby} 
          >興趣</List.Item>
        </List>
        <Tabs>
          <Tabs.Tab title='發佈的揪卡' key='fruits'>
            <PostReel posts={getUser(id).publishedPosts} />
          </Tabs.Tab>
          <Tabs.Tab title='參與的揪卡' key='vegetables'>
            <PostReel posts={getUser(id).participatedPosts} />
          </Tabs.Tab>
        </Tabs>
      </Card>
      {/* <Button onClick={handleFollower}>追蹤名單</Button> */}
      {Followers}, {Following}
    </>
  );
};

export default User;
