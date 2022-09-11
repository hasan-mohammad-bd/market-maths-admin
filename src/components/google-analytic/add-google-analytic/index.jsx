/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Form,
  message,
  Button,
  Input,
  Select,

} from "antd";

import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";


import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";



const AddGoogleAnalytic = () => {
  const [form] = Form.useForm();

  const referral = new API.GoogleAnalytic();


  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = 1;

  const [loading, setLoading] = useState(false);


  const editGoogleAnalytic = (payload) => {
    getDataManager(referral?.editGoogleAnalytic, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/google-analytic");
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
        editGoogleAnalytic(values);
    } else {
      // addBlog(payload);

    }
  };



  return (
    <TajiraCard heading={isEdit ? "Edit Google Analytic Setting" : "Add Google Analytic Setting"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Form.Item
          label="Google Analytic"
          name="google_analytic"
          rules={[
            {
              required: true,
              message: "Please enter google analytic",
            },
          ]}
        >
        <Input placeholder="Enter Google Analytic" />
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

export default AddGoogleAnalytic;
