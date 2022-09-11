/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Form,
  message,
  Button,
  Input,
  Select,
  Radio,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";


import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";


const { Option } = Select;

const AddReacptcha = () => {
  const [form] = Form.useForm();

  const recapthca = new API.Recaptcha();
/*   const tag = new API.Tags();
  const category = new API.Category(); */

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = 1;

  const [loading, setLoading] = useState(false);


  const editRecaptcha = (payload) => {
    getDataManager(recapthca?.editRecaptcha, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/recaptcha");
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
        editRecaptcha(values);
    } else {
      // addBlog(payload);

    }
  };



  return (
    <TajiraCard heading={isEdit ? "Edit Recapthca Setting" : "Add Recaptcha Setting"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Form.Item
          label="Captcha Site"
          name="captcha_site"
          rules={[
            {
              required: true,
              message: "Please enter captcha site",
            },
          ]}
        >
        <Input placeholder="Enter captcha Site Text" />
        </Form.Item>
        <Form.Item
          label="Captcha Secret"
          name="captcha_secret"
          rules={[
            {
              required: true,
              message: "Please enter captcha secret text",
            },
          ]}
        >
        <Input placeholder="Enter captcha secret Text" />
        </Form.Item>
        <Form.Item
          label="Captcha Status"
          name="captcha_status"
          rules={[
            {
              required: true,
              message: "Please enter privacy and policy text",
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

export default AddReacptcha;
