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

const AddMenu = () => {
  const [form] = Form.useForm();
  const menu = new API.Menu();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);





  useEffect(() => {
    if (id) {
    //   fetchSocialDetails();
    }

  }, [id]);



/*   const fetchSocialDetails = () => {

    getDataManager(menu?.getMenuDetails, setLoading, id).then((x) => {

      if (x?.status) {
        const res = x?.data;
        form.setFieldsValue({
          name: res.name,
          code: res.code,
          link: res.link,
          
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
 */
  const addMenu = (payload) => {
    getDataManager(menu?.addMenu, setLoading, payload).then((x) => {
      console.log(x);
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/menu");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editMenu= (payload) => {
    getDataManager(menu?.editMenu, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/menu");
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
      editMenu(values);
    } else {
      addMenu(values);

    }
  };


  return (
    <TajiraCard heading={isEdit ? "Edit Menu" : "Add Menu"}>
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
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter Name",
            },
          ]}
        >
          <Input placeholder="Enter Name" />
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

export default AddMenu;
