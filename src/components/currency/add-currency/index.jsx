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

const AddCurrency = () => {
  const [form] = Form.useForm();

  const currency = new API.Currency();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = 1;

  const [loading, setLoading] = useState(false);

  const editCurrency = (payload) => {
    getDataManager(currency?.editCurrency, setLoading, payload, id).then(
      (x) => {
        if (x?.status) {
          message.success({
            content: "Information saved",
            duration: 3,
          });
          navigate("/currency");
        } else {
          const error = getErrorMessage(x?.errors) || x?.message;
          message.error({
            content: error || "Error ocurred",
            duration: 3,
          });
        }
      }
    );
  };

  const onFinish = (values) => {
    if (isEdit) {
      editCurrency(values);
    } else {
    }
  };

  return (
    <TajiraCard
      heading={isEdit ? "Edit Currency Section" : "Add Currency Section"}
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
          name="currency_title"
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
          name="currency_description"
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
          label="Currency Live"
          name="currency_live"
          rules={[
            {
              required: true,
              message: "Please enter currency live",
            },
          ]}
        >
          <Input placeholder="Enter Currency Live" />
        </Form.Item>
        <Form.Item
          label="Currency Cal"
          name="currency_cal"
          rules={[
            {
              required: true,
              message: "Please enter currency col",
            },
          ]}
        >
          <Input placeholder="Enter Currency col" />
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

export default AddCurrency;
