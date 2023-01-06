import React, { useEffect } from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Popup, AutoCenter, Avatar, Tag, List, Steps, Divider, Button, Ellipsis, Modal, Space, Toast } from 'antd-mobile';
import {
  UnorderedListOutline,
  FlagOutline,
  StopOutline,
  CalendarOutline,
  PayCircleOutline,
  UserAddOutline,
  StarOutline,
  LinkOutline,
  TeamOutline,
  CheckCircleOutline,
} from 'antd-mobile-icons';
import UserModal from './UserModal';
import { useFetch } from '../hooks/FetchContext';
import { useAuth } from '../hooks/AuthContext';
import copy from 'copy-to-clipboard';
import UserReel from './UserReel';

const { Step } = Steps;

const PostInfo = ({ postId }) => {
  const [followersOpen, setFollowersOpen] = useState(false);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [hostOpen, setHostOpen] = useState(false);
  const { fetched, getPost, getUser, followPost, unfollowPost, signupPost, terminatePost, finalizePost } = useFetch();
  const { userId } = useAuth();
  if (!fetched) return <></>;
  const post = getPost(postId);
  const { status, title, body, due, startTime, endTime, maximum, participants, followers, tags, location, fee, host } = post;
  const { displayName, school, department, imgUrl } = getUser(host);
  const isFollowing = (getUser(userId).followingPosts.indexOf(postId) !== -1);
  const hasSignedup = (getUser(userId).participatedPosts.indexOf(postId) !== -1);

  const DateToString = (date) => {
    const dateObj = new Date(date.seconds*1000);
    return `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()} ${dateObj.getHours()}:00`;
  }

  const handleClickSignup = () => {
    // 報名按鈕
    if (!hasSignedup) {
      signupPost(userId, postId);
      Toast.show('成功報名揪卡！');
    }
    else {
      Toast.show('你已經報名這張揪卡了！');
    }
  }

  const handleClickFollow = () => {
    //追蹤按鈕
    if (!isFollowing) {
      followPost(userId, postId);  
      Toast.show('成功追蹤揪卡！');
    } else {
      unfollowPost(userId, postId);  
      Toast.show('成功退追揪卡！');
    }
  }

  const handleClickShare = () => {
    copy(`${window.location.host}/post/${postId}`);
    Toast.show('已複製連結')
  }

  const handleClickHost = () => {
    setHostOpen(true);
  }

  const handleClickParticipants = () => {
    setParticipantsOpen(true);
  }
  
  const handleClickFollowers = () => {
    setFollowersOpen(true);
  }

  return (
    <>
    <div style={{ height: '100%', padding: '4%', width: '92%', overflowY: 'scroll' }} >
      <Tag
        color='primary'
        style={{
          '--border-radius': '7px',
          width: '100%',
          padding: 10,
        }}
        onClick={() => {}}
      >
        <div style={{marginBottom: 12, width: '100%'}}>
          <Tag
            color='white'
            style={{
              '--border-radius': '7px',
              '--text-color': 'var(--adm-color-primary)',
              fontSize: 20,
              fontWeight: 'bold',
              padding: 8,
              marginRight: 10,
            }}
          >
            揪卡
          </Tag>
        <p style={{
          // width: '100%',
          fontSize: 18,
          fontWeight: 'bold',
          overflowWrap: 'anywhere',
          display: 'inline-block',
          whiteSpace: 'pre-line',
        }}>
          {title}
        </p>
        </div>
        <Ellipsis
          direction='end'
          content={body}
          expandText='閱讀更多'
          collapseText='收起'
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            overflowWrap: 'anywhere',
            display: 'inline-block',
            whiteSpace: 'pre-line',
            lineHeight: 1.6
          }}
        />
      </Tag>

      <List header='活動資訊'>
          <List.Item
            prefix={<UnorderedListOutline />}
            extra={
              <Space>
                {
                  tags.map(tag => <Tag key={`tag-${tag}`} color='success'>{tag}</Tag>)
                }
              </Space>
            }
          >
          活動標籤
        </List.Item>
        <List.Item prefix={<CalendarOutline />} extra={DateToString(startTime)}>
          活動開始
        </List.Item>
        <List.Item prefix={<CalendarOutline />} extra={DateToString(endTime)}>
          活動結束
        </List.Item>
        <List.Item prefix={<FlagOutline />} extra={location}>
          活動地點
        </List.Item>
        <List.Item prefix={<PayCircleOutline />} extra={`$${fee}`}>
          活動費用
        </List.Item>
        <List.Item prefix={<StopOutline />} extra={DateToString(due)}>
          報名截止
        </List.Item>
      </List>
      <List header='活動狀態'>
        <List.Item prefix={<TeamOutline/>} extra={`${participants.length} / ${maximum}`} onClick={(e) => {handleClickParticipants()}} >
          已報名用戶
        </List.Item>
        <List.Item prefix={<TeamOutline/>} extra={`${followers.length}`} onClick={(e) => {handleClickFollowers()}} >
          追蹤中用戶
        </List.Item>
      </List>
        <List
          header='發起人'
          style={{
            justifyContent: "right",
            '--border-top': 'none',
            '--border-bottom': 'none',
          }}
        >
          <List.Item prefix={<Avatar style={{ '--size': '2rem', marginRight: '1rem' }} src={imgUrl} />} onClick={(e) => handleClickHost()}>
          {displayName} @ {school} {department}
        </List.Item>
      </List>
      <Divider/>
      <AutoCenter>
        揪卡進度條
      </AutoCenter>
      <Steps current={post.status}>
        <Step title='發布揪卡' />
        <Step title='等待同好齊聚' />
        <Step title='等待主揪指示' />
        <Step title={status === 4 ? '主揪終止' : '齊聚同樂！'} status={status === 4 ? 'error' : ''} />
      </Steps>
        <Divider />
        <div style={{display: 'flex', gap: '1rem'}}>
            {
              userId === host ?
              <>
                <Button
                  block
                  onClick={() => { terminatePost(postId) }}
                  style={{
                    '--background-color': 'var(--adm-color-danger)',
                    '--text-color': 'white'
                  }}
                  disabled={status >= 3}
                  >{<StopOutline />} 終止
                </Button>
                <Button
                  block
                  onClick={() => { finalizePost(postId) }}
                  style={{
                    '--background-color': 'var(--adm-color-primary)',
                    '--text-color': 'white'
                  }}
                  disabled={status >= 3}
                >
                  {<CheckCircleOutline />} 成團
                </Button>
              <Button block onClick={() => handleClickShare()}>{<LinkOutline/>} 分享</Button>
              </>
                :
              <>
                <Button
                  block
                onClick={() => handleClickSignup()}
                style={hasSignedup ? {
                  '--background-color': 'var(--adm-color-primary)',
                  '--text-color': 'white'
                } : {}}
                disabled={hasSignedup || userId === post.host || post.status >= 2 || new Date() > new Date(post.due.seconds*1000)}
                >
              {<UserAddOutline />} 報名
            </Button>
              <Button
                block
            onClick={() => handleClickFollow()}
            style={isFollowing ? {
              '--background-color': 'var(--adm-color-primary)',
              '--text-color': 'white'
            } : {}}
            >{<StarOutline />} 追蹤
            </Button>
            <Button block onClick={() => handleClickShare()}>{<LinkOutline/>} 分享</Button>
          </>  
          }
        </div>
      <Divider></Divider>
      </div>
      <Popup
        visible={participantsOpen}
        onMaskClick={() => {
          setParticipantsOpen(false);
        }}
        bodyStyle={{
          width: '94%',
          padding: '3%',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          height: '60vh',
        }}
      >
        <UserReel userIds={participants} />
      </Popup>
      <Popup
        visible={followersOpen}
        onMaskClick={() => {
          setFollowersOpen(false);
        }}
        bodyStyle={{
          width: '94%',
          padding: '3%',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          height: '60vh',
        }}
        >
        <UserReel userIds={followers} />
      </Popup>
      <Popup
        visible={hostOpen}
        onMaskClick={() => {
          setHostOpen(false);
        }}
        bodyStyle={{
          width: '94%',
          padding: '3%',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          height: '60vh',
        }}
      >
        <UserModal host={getUser(post.host)} userId={userId} hostId={post.host} />
      </Popup>
    </>
  );
}

export default PostInfo;