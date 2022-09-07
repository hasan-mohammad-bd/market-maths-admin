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
  Table,
  Popconfirm,
  InputNumber,
} from "antd";
import { FileAddFilled, DeleteOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";
import Editor from "../../common/rich-editor";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";

const { Option } = Select;

const AddBlog = () => {
  const [form] = Form.useForm();

  const blog = new API.Withdraw();


  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [blogDetails, setBlogDetails] = useState({});
  const [description, setDescription] = useState("");
  // const [tags, setTags] = useState([]);
  const [categories, setCategory] = useState([])
  const [imageList, setImageList] = useState([]);
  const [comments, setComments] = useState([]);


  //demo 
  const tagsList = [
    {_id:1, name:"finance", },
    {_id:2, name:"math", },
    {_id:3, name:"market", },
    {_id:4, name:"economy", },
    {_id:5, name:"freelance", },
    {_id:6, name:"income", },
  ]

  useEffect(() => {
    if (id) {
      fetchBlogDetails();
    }

  }, [id]);



  const fetchBlogDetails = () => {

    getDataManager(blog?.getWithdrawDetails, setLoading, id).then((x) => {

      if (x?.status) {
        const res = x?.data;
        form.setFieldsValue({
          name: res.name,
          charge: res.charge,
          withdraw_min: res.withdraw_min,
          withdraw_max: res.withdraw_max,
          duration: res.duration,
          status: res.status
          
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

  const addBlog = (payload) => {
    getDataManager(blog?.addWithdraw, setLoading, payload).then((x) => {
      console.log(x);
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/withdraw");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editBlog = (payload) => {
    getDataManager(blog?.editWithdraw, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/withdraw");
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

    console.log(values);

    const imageFileChanged = values.image !== blogDetails?.image;

    var payload = new FormData();
    payload.append("name", values.name);
    payload.append("charge", values.charge);
    payload.append("withdraw_min", values.withdraw_min);
    payload.append("withdraw_max", values.withdraw_max);
    payload.append("duration", values.duration);
    payload.append("status", values.status);

    !!values?.image &&
      imageFileChanged &&
      payload.append("image", values?.image?.file?.originFileObj);

    if (isEdit) {
      editBlog(payload);
    } else {
      addBlog(payload);

    }
  };





  return (
    <TajiraCard heading={isEdit ? "Edit Withdraw Method" : "Add Withdraw Method"}>
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
              message: "Please enter Name",
            },
          ]}
        >
          <Input placeholder="Enter Name" />
        </Form.Item>
        <Form.Item
          label="Charge / USD"
          name="charge"
          rules={[
            {
              required: true,
              message: "Please enter charge",
            },
          ]}
        >
          <InputNumber placeholder="Enter charge" />
        </Form.Item>
        <Form.Item
          label="Min Withdraw / USD"
          name="withdraw_min"
          rules={[
            {
              required: true,
              message: "Please enter min withdraw",
            },
          ]}
        >
          <InputNumber placeholder="Enter min withdraw" />
        </Form.Item>
        <Form.Item
          label="Max Withdraw / USD"
          name="withdraw_max"
          rules={[
            {
              required: true,
              message: "Please enter min withdraw",
            },
          ]}
        >
          <InputNumber placeholder="Enter min withdraw" />
        </Form.Item>
        <Form.Item
          label="Duration / Days"
          name="duration"
          rules={[
            {
              required: true,
              message: "Please enter duration",
            },
          ]}
        >
          <InputNumber placeholder="Enter min duration" />
        </Form.Item>
{/*         <Form.Item label="Introduction" name="introduction">
          <Input placeholder="Enter introduction" />
        </Form.Item> */}

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select publish status" }]}
        >
          <Select placeholder="Select Publish Status">
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
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

export default AddBlog;
