/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Form, message, Button, Input, Select, Upload, Space, InputNumber, Radio, DatePicker } from "antd";
import { FileAddFilled } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";



const AddTeam = () => {
  const [form] = Form.useForm();


  const team = new API.Users();
  const plan = new API.Plan();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;
  const [planList, setPlanList] = useState([])
  const { Option } = Select;


  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (id) {
      fetchTeamDetails();
    }
    fetchPlanList();

  }, [id]);

  const fetchPlanList = async (payload) => {
    return getDataManager(plan?.getPlanList, setLoading).then((x) => {
      if (x?.status) {
        setPlanList(x.data)
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };


  const fetchTeamDetails = () => {
    getDataManager(team?.getUsersDetails, setLoading, id).then((x) => {
      if (x?.status) {
        const res = x?.data;
        form.setFieldsValue({
          name: res?.name,
          email: res?.email,
          phone: res?.phone,
          plan: res?.plan,
          password: res?.password,
          user_name: res?.user_name,
          payment_status: res?.payment_status,
          plan_expire_date: res?.plan_expire_date,
          telegram_id: res?.telegram_id
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

  const addTeam = (payload) => {
    getDataManager(team?.addUsers, setLoading, payload).then((x) => {
        console.log(x);
      if (x?.status) {

        
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/users");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editTeam = (payload) => {
    getDataManager(team?.editUsers, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/users");
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
          editTeam(values);
        } else {
          addTeam(values);
        }
      };

  return (
    <TajiraCard heading={isEdit ? "Edit Users" : "Add Users"}>
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
          label="UserName"
          name="user_name"
          rules={[
            {
              required: true,
              message: "Please enter user_name",
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
        {
            isEdit && 
            <Form.Item
            label="Plan Expire Date"
            name="plan_expire_date"
            rules={[
              {
                required: true,
                message: "Please enter phone",
              },
            ]}
          >
            <DatePicker/>
          </Form.Item>
        }

{
            isEdit && 
            <Form.Item
            label="Telegram ID"
            name="telegram_id"
            rules={[
              {
                required: true,
                message: "Please enter telegram ID",
              },
            ]}
          >
            <Input placeholder="Enter Telegram ID"/>
          </Form.Item>
        }
        {
            !isEdit &&         
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
        }
        <Form.Item
          label="Plan"
          name="plan"
          rules={[{ required: true, message: "Please select category" }]}
        >
          <Select placeholder="Select category">
            {planList?.map((t) => (
              <Option key={t?._id} value={t?._id}>
                {t?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Payment Status"
          name="payment_status"
          rules={[
            {
              required: true,
              message: "Please enter active status",
            },
          ]}
        >
    <Radio.Group>
      <Radio value={true}>Yes</Radio>
      <Radio value={false}>No</Radio>
    </Radio.Group>
        </Form.Item>
{/*         <Form.Item
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
      <Radio value={true}>Yes</Radio>
      <Radio value={false}>No</Radio>
    </Radio.Group>
        </Form.Item> */}


        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </TajiraCard>
  );
};

export default AddTeam;
