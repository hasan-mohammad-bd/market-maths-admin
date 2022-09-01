/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Form, message, Button, Input, Typography, Select,RadioChangeEvent, InputNumber } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { Radio } from 'antd';

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const AddTag = () => {
  const [form] = Form.useForm();

  const tag = new API.Plan();

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
    getDataManager(tag?.getPlanDetails, setLoading, id).then((x) => {
      if (x?.status) {

        form.setFieldsValue({
          name: x?.data?.name,
          plan_type: x?.data?.plan_type,
          duration: x?.data?.duration,
          price: x?.data?.price,
          price_type: x?.data?.price_type,
          support: x?.data?.support,
          dashboard_status: x?.data?.dashboard_status,
          email_status: x?.data?.email_status,
          sms_status: x?.data?.sms_status,
          telegram_status: x?.data?.telegram_status,
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

  const addTag = (payload) => {
    getDataManager(tag?.addPlan, setLoading, payload).then((x) => {
      if (x?.status) {

        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/plan");
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
    getDataManager(tag?.editPlan, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/plan");
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
    <TajiraCard heading={isEdit ? "Edit Tag" : "Add Tag"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Title level={5}>Plan</Title>
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
          label="Price / USD"
          name="price"
          type="number"
          rules={[
            {
              required: true,
              message: "Please enter price in number",
            },
          ]}
        >
          <InputNumber placeholder="Enter price" />
        </Form.Item>

        <Form.Item
          label="Duration / Days"
          name="duration"
          type="number"
          rules={[
            {
              required: true,
              message: "Please enter Duration",
            },
          ]}
        >
       <InputNumber placeholder="Enter days in number" />
        </Form.Item>


        <Form.Item
          label="Support"
          name="support"
          rules={[
            {
              required: true,
              message: "Please select status type",
            },
          ]}
        >
    <Radio.Group>
      <Radio value={"none"}>None</Radio>
      <Radio value={"basic"}>Basic</Radio>
      <Radio value={"standard"}>Standard</Radio>
      <Radio value={"24x7"}>24x7</Radio>

    </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Plan Type"
          name="plan_type"
          rules={[
            {
              required: true,
              message: "Please enter plan type 1 or 0",
            },
          ]}
        >
                  <Radio.Group>
      <Radio value={1}><CheckOutlined /></Radio>
      <Radio value={0}><CloseOutlined /></Radio>

    </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Price Type"
          name="price_type"
          type="number"
          rules={[
            {
              required: true,
              message: "Please enter price type 1 or 0",
            },
          ]}
        >
                            <Radio.Group>
      <Radio value={1}><CheckOutlined /></Radio>
      <Radio value={0}><CloseOutlined /></Radio>

    </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Dashboard Status"
          name="dashboard_status"
          rules={[
            {
              required: true,
              message: "Please select dashboard status",
            },
          ]}
        >
    <Radio.Group>
      <Radio value={true}><CheckOutlined /></Radio>
      <Radio value={false}><CloseOutlined /></Radio>

    </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Email Status"
          name="email_status"
          rules={[
            {
              required: true,
              message: "Please select email status",
            },
          ]}
        >
    <Radio.Group>
      <Radio value={true}><CheckOutlined /></Radio>
      <Radio value={false}><CloseOutlined /></Radio>

    </Radio.Group>
        </Form.Item>
        <Form.Item
          label="SMS Status"
          name="sms_status"
          rules={[
            {
              required: true,
              message: "Please select SMS status",
            },
          ]}
        >
    <Radio.Group>
      <Radio value={true}><CheckOutlined /></Radio>
      <Radio value={false}><CloseOutlined /></Radio>

    </Radio.Group>
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

export default AddTag;
