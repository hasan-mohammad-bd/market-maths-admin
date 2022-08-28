/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Form, message, Button, Input, Typography } from "antd";
import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";

const { Title } = Typography;
const { TextArea } = Input;

const AddFaq = () => {
  const [form] = Form.useForm();

  const faq = new API.FAQ();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchFaqDetails();
    }
  }, [id]);

  const fetchFaqDetails = () => {
    getDataManager(faq?.getFaqDetails, setLoading, id).then((x) => {
      if (x?.status) {
        form.setFieldsValue({
          question: x?.data?.question,
          answer: x?.data?.answer,
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

  const addFaq = (payload) => {
    getDataManager(faq?.addFaq, setLoading, payload).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/faq");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editFaq = (payload) => {
    getDataManager(faq?.editFaq, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/faq");
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
      editFaq(values);
    } else {
      addFaq(values);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit FAQ" : "Add FAQ"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Title level={5}>Add FAQ</Title>
        <Form.Item
          label="Question"
          name="question"
          rules={[
            {
              required: true,
              message: "Please enter question",
            },
          ]}
        >
          <Input placeholder="Enter question" />
        </Form.Item>
        <Form.Item
          label="Answer"
          name="answer"
          rules={[
            {
              required: true,
              message: "Please enter answer",
            },
          ]}
        >
          <TextArea rows={6} placeholder="Enter answer" />
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

export default AddFaq;
