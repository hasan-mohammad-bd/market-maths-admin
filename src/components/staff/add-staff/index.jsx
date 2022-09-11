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
  InputNumber,
  Radio,
} from "antd";

import { useParams, useNavigate } from "react-router-dom";
import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";

const StaffTeam = () => {
  const [form] = Form.useForm();

  const staff = new API.Staff();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // fetchStaffDetails();
    }
  }, [id]);

  /*   const fetchStaffDetails = () => {
    getDataManager(staff?.getStaffDetails, setLoading, id).then((x) => {
      if (x?.status) {
        const res = x?.data;
        form.setFieldsValue({
          name: res?.name,
          email: res?.email,
          phone: res?.phone,
          is_active: res?.is_active,
        });

      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  }; */

  const addStaff = (payload) => {
    getDataManager(staff?.addStaff, setLoading, payload).then((x) => {
      console.log(x);
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

  const editStaff = (payload) => {
    getDataManager(staff?.editStaff, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/staff");
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
      editStaff(values);
    } else {
      addStaff(values);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit Staff" : "Add Staff Member"}>
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
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter phone",
            },
          ]}
        >
          <Input placeholder="Enter Phone" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter phone",
            },
          ]}
        >
          <Input placeholder="Enter Phone" />
        </Form.Item>
        <Form.Item
          label="Active Status"
          name="is_active"
          rules={[
            {
              required: true,
              message: "Please enter active status",
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

export default StaffTeam;
