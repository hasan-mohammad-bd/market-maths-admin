/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Form, message, Button, Input, Select } from "antd";

import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";
import TextArea from "antd/lib/input/TextArea";

const AddTestimonialSection = () => {
  const [form] = Form.useForm();

  const testimonial = new API.TestimonialSection();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = 1;

  const [loading, setLoading] = useState(false);

  const editAdvertise = (payload) => {
    getDataManager(
      testimonial?.editTestimonialSection,
      setLoading,
      payload,
      id
    ).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/testimonial-section");
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
      editAdvertise(values);
    } else {
      // addBlog(payload);
    }
  };

  return (
    <TajiraCard
      heading={isEdit ? "Edit Testimonial Section" : "Add Testimonial Section"}
    >
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Form.Item
          label="Testimonial Title"
          name="testimonial_title"
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
          label="Testimonial Description"
          name="testimonial_description"
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
          ]}
        >
          <TextArea placeholder="Enter Description" />
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

export default AddTestimonialSection;
