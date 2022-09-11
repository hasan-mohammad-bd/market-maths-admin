/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Form, message, Button, Input, Typography } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { Radio } from "antd";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Title } = Typography;

const AddSymbol = () => {
  const [form] = Form.useForm();
  const symbol = new API.Symbol();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTagDetails();
    }
  }, [id]);

  const fetchTagDetails = () => {
    getDataManager(symbol?.getSymbolDetails, setLoading, id).then((x) => {
      if (x?.status) {
        form.setFieldsValue({
          name: x?.data?.name,
          status: x?.data?.status,
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

  const addTag = (payload) => {
    getDataManager(symbol?.addSymbol, setLoading, payload).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/symbol");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editTag = (payload) => {
    getDataManager(symbol?.editSymbol, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/symbol");
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
      editTag(values);
    } else {
      addTag(values);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit Symbol" : "Add Symbol"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        
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
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Please select status",
            },
          ]}
        >
          <Radio.Group>
            <Radio value={true}>
              <CheckOutlined />
            </Radio>
            <Radio value={false}>
              <CloseOutlined />
            </Radio>
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

export default AddSymbol;
