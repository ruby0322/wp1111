import React, { RefObject } from "react";
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Space,
  Radio,
  TreeSelect,
  TextArea,
  DatePicker,
  Selector,
  Tabs,
  Stepper,
  AutoCenter
} from "antd-mobile";
import dayjs from "dayjs";
import { useFetch } from '../hooks/FetchContext';
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from 'react-router-dom';

const now = new Date();

const Invite = () => {
  const { getUserId } = useAuth();
  const userId = getUserId();
  const [matchType, setMatchType] = useState("");
  const { createPost } = useFetch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    const newPost = { ...values, participants: [], followers: [], host: userId, status: 1 };
    createPost(newPost);
    navigate('/home');
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleMatch = () => {
    //match with someone with same matchType
  };

  const inviteCard = (
    <div>
      <Form
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        footer={
          <AutoCenter>
            <Button type="primary" htmlType="submit">
              發佈
            </Button>
          </AutoCenter>
        }
        // mode="card"
      >
        <Form.Header>建立邀請卡</Form.Header>
        <Form.Item
          label="標題"
          name="title"
          rules={[{ required: true, message: "請輸入標題！" }]}
        >
          <Input
            placeholder="寫個引人注目的標題吧！"
            maxLength={20}
          />
      </Form.Item>
      
        <Form.Item
          label="內文"
          name="body"
          rules={[{ required: true, message: "請輸入內容概要！" }]}
        >
          <TextArea
            placeholder="內文"
            maxLength={100}
            rows={4}
            showCount
          />
        </Form.Item>

        <Form.Item
          label="活動人數"
          name="maximum"
          rules={[{ required: true, message: "請輸入人數上限！" }]}
          childElementPosition="right"
        >
          <Stepper placeholder="活動人數" min={1} />
        </Form.Item>

        <Form.Item
          label="活動類別"
          name="tags"
          rules={[{ required: true, message: "請輸入類別！" }]}
        >
          <TreeSelect
            options={[
              {
                label: "吃飯",
                value: "吃飯",
                children: [
                  { label: "早餐", value: "早餐" },
                  { label: "午餐", value: "午餐" },
                  { label: "晚餐", value: "晚餐" },
                ],
              },
              {
                label: "運動",
                value: "運動",
                children: [
                  { label: "籃球", value: "籃球" },
                  { label: "羽球", value: "羽球" },
                  { label: "排球", value: "排球" },
                  { title: "棒球", value: "棒球" },
                ],
              },
              { label: "讀書", value: "讀書" },
              { label: "遊戲", value: "遊戲" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="startTime"
          label="活動開始"
          trigger="onConfirm"
          rules={[{ required: true, message: "請輸入活動時間！" }]}
          onClick={(e, DatePickerRef) => {
            DatePickerRef.current?.open();
          }}
        >
          <DatePicker precision="hour" min={now}>
            {(value) =>
              value ? dayjs(value).format("YYYY-MM-DD-HH") : "活動開始時間"
            }
          </DatePicker>
        </Form.Item>
        <Form.Item
          name="endTime"
          label="活動結束"
          trigger="onConfirm"
          rules={[{ required: true, message: "請輸入活動時間！" }]}
          onClick={(e, DatePickerRef) => {
            DatePickerRef.current?.open();
          }}
        >
          <DatePicker precision="hour" min={now}>
            {(value) =>
              value ? dayjs(value).format("YYYY-MM-DD-HH") : "活動結束時間"
            }
          </DatePicker>
        </Form.Item>
        <Form.Item
          name="due"
          label="報名截止"
          trigger="onConfirm"
          rules={[{ required: true, message: "請輸入活動時間！" }]}
          onClick={(e, DatePickerRef) => {
            DatePickerRef.current?.open();
          }}
        >
          <DatePicker precision="hour" min={now}>
            {(value) =>
              value ? dayjs(value).format("YYYY-MM-DD-HH") : "報名截止時間"
            }
          </DatePicker>
        </Form.Item>

        <Form.Item
          label="活動地點"
          name="location"
          rules={[{ required: true, message: "請輸入地點！" }]}
        >
          <Input placeholder="活動地點" />
        </Form.Item>

        <Form.Item
          label="活動費用"
          name="fee"
          rules={[{ required: true, message: "請輸入活動費用！" }]}
          childElementPosition="right"
        >
          <Stepper placeholder="活動費用/人" min={0} />
        </Form.Item>

        <Form.Item
          label="付款方式"
          name="payType"
          rules={[{ required: true, message: "請輸入類別！" }]}
        >
          <Selector
            options={[
              { label: "各付各的", value: "各付各的" },
              { label: "主揪請客", value: "主揪請客" },
            ]}
          />
        </Form.Item>
      </Form>
    </div>
  );

  const realTimeMatch = (
      <Space direction="vertical" block>
        <Radio.Group
          defaultValue={"中式料理"}
          onChange={(e) => {
            setMatchType(e);
          }}
        >
          <Space direction="vertical" block>
            <Radio value="中式料理" block>
              {" "}
              中式料理{" "}
            </Radio>
            <Radio value="義式料理" block>
              {" "}
              義式料理{" "}
            </Radio>
            <Radio value="西式料理" block>
              {" "}
              西式料理{" "}
            </Radio>
            <Radio value="日式料理" block>
              {" "}
              日式料理{" "}
            </Radio>
            <Radio value="韓式料理" block>
              {" "}
              韓式料理{" "}
            </Radio>
            <Radio value="泰式料理" block>
              {" "}
              泰式料理{" "}
            </Radio>
            <Radio value="其他">
              {" "}
              More...{" "}
              {matchType === "其他" ? (
                <Input
                  style={{ width: 100, marginLeft: 10 }}
                  placeholder="料理種類"
                />
              ) : null}{" "}
            </Radio>
          </Space>
        </Radio.Group>
        <Button type="primary" onClick={handleMatch}>
          {" "}
          Match！{" "}
        </Button>
      </Space>
  );

  return (
    <div>
      <Tabs>
        <Tabs.Tab title='發起揪卡' key='create'>
          {inviteCard}
        </Tabs.Tab>
        <Tabs.Tab title='配對吃午餐' key='match'>
          {realTimeMatch}
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default Invite;
