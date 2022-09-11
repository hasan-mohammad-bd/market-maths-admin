/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Form, message, Button, Input } from "antd";

import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";
import TextArea from "antd/lib/input/TextArea";

const AddTrading = () => {
  const [form] = Form.useForm();

  const trading = new API.Trading();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = 1;

  const [loading, setLoading] = useState(false);

  const editTrading = (payload) => {
    getDataManager(trading?.editTrading, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/trading");
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
      editTrading(values);
    } else {
      // addBlog(payload);
    }
  };

  return (
    <TajiraCard
      heading={isEdit ? "Edit Trading Section" : "Add Trading Section"}
    >
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Form.Item
          label="Title"
          name="trading_title"
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
          label="Description"
          name="trading_description"
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
          label="Trading Script"
          name="trading_script"
          rules={[
            {
              required: true,
              message: "Please enter trading script",
            },
          ]}
        >
          <Input placeholder="Enter Trading Script" />
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

export default AddTrading;
