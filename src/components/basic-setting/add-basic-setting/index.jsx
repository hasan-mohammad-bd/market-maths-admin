/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Form,
  message,
  Button,
  Input,
  Select,
  Upload,
  Space,
  Table,
  Popconfirm,
  Radio,
} from "antd";
import { FileAddFilled, DeleteOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";
import Editor from "../../common/rich-editor";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";
import TextArea from "antd/lib/input/TextArea";

const { Option } = Select;

const AddBasicSetting = () => {
  const [form] = Form.useForm();

  const basicSetting = new API.BasicSetting();


  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = 1;

  const [loading, setLoading] = useState(false);


  const editBasicSetting = (payload) => {
    getDataManager(basicSetting?.editBasicSetting, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/basic-setting");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const onFinish = (values) => {


    if (isEdit) {
        editBasicSetting(values);
    } else {
      // addBlog(payload);

    }
  };



  return (
    <TajiraCard heading={isEdit ? "Edit Basic Setting" : "Add Basic Setting"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter title",
            },
          ]}
        >
        <Input placeholder="Enter Title" />
        </Form.Item>
        <Form.Item
          label="Color"
          name="color"
          rules={[
            {
              required: true,
              message: "Please enter color",
            },
          ]}
        >
        <Input placeholder="Enter Color" />
        </Form.Item>
        <Form.Item
          label="Currency"
          name="currency"
          rules={[
            {
              required: true,
              message: "Please enter currency",
            },
          ]}
        >
        <Input placeholder="Enter Currency" />
        </Form.Item>
        <Form.Item
          label="Symbol"
          name="symbol"
          rules={[
            {
              required: true,
              message: "Please enter symbol",
            },
          ]}
        >
        <Input placeholder="Enter symbol" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter phone",
            },
          ]}
        >
        <Input placeholder="Enter Email" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter email",
            },
          ]}
        >
        <Input placeholder="Enter Email" />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author"
          rules={[
            {
              required: true,
              message: "Please enter author",
            },
          ]}
        >
        <Input placeholder="Enter Author" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please enter address",
            },
          ]}
        >
        <Input placeholder="Enter Address" />
        </Form.Item>
        <Form.Item
          label="Meta Tag"
          name="meta_tag"
          rules={[
            {
              required: true,
              message: "Please enter meta tag",
            },
          ]}
        >
        <Input placeholder="Enter Meta Tag" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
          ]}
        >
        <TextArea placeholder="Enter Description" />
        </Form.Item>
        <Form.Item
          label="Telegram Status"
          name="telegram_status"
          rules={[
            {
              required: true,
              message: "Please select telegram status",
            },
          ]}
        >
    <Radio.Group>
      <Radio value={true}><CheckOutlined /></Radio>
      <Radio value={false}><CloseOutlined /></Radio>

    </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Email Alert"
          name="email_alert"
          rules={[
            {
              required: true,
              message: "Please select email alert status",
            },
          ]}
        >
    <Radio.Group>
      <Radio value={true}><CheckOutlined /></Radio>
      <Radio value={false}><CloseOutlined /></Radio>

    </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Phone Alert"
          name="phone_alert"
          rules={[
            {
              required: true,
              message: "Please select phone alert status",
            },
          ]}
        >
    <Radio.Group>
      <Radio value={true}><CheckOutlined /></Radio>
      <Radio value={false}><CloseOutlined /></Radio>

    </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Email Verify"
          name="email_verify"
          rules={[
            {
              required: true,
              message: "Please select email verify status",
            },
          ]}
        >
    <Radio.Group>
      <Radio value={true}><CheckOutlined /></Radio>
      <Radio value={false}><CloseOutlined /></Radio>

    </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Phone Verify"
          name="phone_verify"
          rules={[
            {
              required: true,
              message: "Please select phone verify status",
            },
          ]}
        >
    <Radio.Group>
      <Radio value={true}><CheckOutlined /></Radio>
      <Radio value={false}><CloseOutlined /></Radio>

    </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </TajiraCard>
  );
};

export default AddBasicSetting;
