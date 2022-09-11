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

const AddBlogSection = () => {
  const [form] = Form.useForm();

  const blog = new API.BlogSection();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = 1;

  const [loading, setLoading] = useState(false);

  const editSubscriberSection = (payload) => {
    getDataManager(blog?.editBlogSection, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/blog-section");
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
      editSubscriberSection(values);
    } else {
      // addBlog(payload);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit Blog Section" : "Add Blog Section"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Form.Item
          label="Blog Title"
          name="blog_title"
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
          label="Blog Description"
          name="blog_description"
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
          ]}
        >
          <TextArea placeholder="Enter Description" />
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

export default AddBlogSection;
