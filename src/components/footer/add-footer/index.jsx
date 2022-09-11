/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Form,
  message,
  Button,
  Input,
} from "antd";

import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";

const AddFooter = () => {
  const [form] = Form.useForm();

  const footer = new API.Footer();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = 1;

  const [loading, setLoading] = useState(false);



  const editFooter = (payload) => {
    getDataManager(footer?.editFooter, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/footer");
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
      editFooter(values);
    } else {
      // addBlog(payload);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit Footer" : "Add Footer"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Form.Item
          label="Google Map"
          name="google_map"
          rules={[
            {
              required: true,
              message: "Please enter map",
            },
          ]}
        >
          <Input placeholder="Enter map" />
        </Form.Item>
        <Form.Item
          label="Footer Text"
          name="footer_text"
          rules={[
            {
              required: true,
              message: "Please enter about",
            },
          ]}
        >
          <Input placeholder="Enter About" />
        </Form.Item>
        <Form.Item
          label="Copy Right Text"
          name="copy_text"
          rules={[
            {
              required: true,
              message: "Please enter about",
            },
          ]}
        >
          <Input placeholder="Enter About" />
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

export default AddFooter;
