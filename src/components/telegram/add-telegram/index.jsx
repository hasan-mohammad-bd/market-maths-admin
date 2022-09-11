/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Form,
  message,
  Button,
  Input,
  Select,

} from "antd";

import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";


import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";


const { Option } = Select;

const AddTelegram = () => {
  const [form] = Form.useForm();

  const telegram = new API.Telegram();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = 1;

  const [loading, setLoading] = useState(false);


  const editTelegram = (payload) => {
    getDataManager(telegram?.editTelegram, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/telegram");
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
        editTelegram(values);
    } else {
      // addBlog(payload);

    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit Telegram Setting" : "Add Telegram Setting"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Form.Item
          label="Telegram Token"
          name="telegram_token"
          rules={[
            {
              required: true,
              message: "Please enter telegram token",
            },
          ]}
        >
        <Input placeholder="Enter Telegram Token" />
        </Form.Item>
        <Form.Item
          label="Telegram Token"
          name="telegram_url"
          rules={[
            {
              required: true,
              message: "Please enter telegram URL",
            },
          ]}
        >
            <Input placeholder="Enter URL"/>
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

export default AddTelegram;
