/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Form, message, Button, Input, Typography, Select, Radio } from "antd";
import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";

const { Title } = Typography;


const AddCategory = () => {
  const [form] = Form.useForm();

  const category = new API.Category();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCategoryDetails();
    }
  }, [id]);

  const fetchCategoryDetails = () => {
    getDataManager(category?.getCategoryDetails, setLoading, id).then((x) => {
      if (x?.status) {

        form.setFieldsValue({
          name: x?.data?.name,
          status: x?.data?.status
        });
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const addCategory = (payload) => {
    getDataManager(category?.addCategory, setLoading, payload).then((x) => {
      if (x?.status) {

        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/category");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editCategory = (payload) => {
    getDataManager(category?.editCategory, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/category");
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
      editCategory(values);
    } else {
      addCategory(values);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit Category" : "Add Category"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Title level={5}>Tag</Title>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter name",
            },
          ]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          label="Status Type"
          name="status"
          rules={[
            {
              required: true,
              message: "Please select status type",
            },
          ]}
        >
    <Radio.Group>
      <Radio value={true}>Active</Radio>
      <Radio value={false}>Deactivate</Radio>
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

export default AddCategory;
