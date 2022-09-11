/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Form, message, Button, Input, Typography, Upload, Space } from "antd";
import { FileAddFilled } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";
import Editor from "../../common/rich-editor";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";

const { Title } = Typography;

const AddTestimonial = () => {
  const [form] = Form.useForm();

  const testimonial = new API.Testimonials();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [testimonialsDetails, setTestimonialDetails] = useState({});

  const [messages, setMessages] = useState("");
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if (id) {
      // fetchTestimonialDetails();
    }
  }, [id]);

  const fetchTestimonialDetails = () => {
    getDataManager(testimonial?.getTestimonialDetails, setLoading, id).then(
      (x) => {
        if (x?.status) {
          const res = x?.data;
          form.setFieldsValue({
            name: res.name,
            designation: res.designation,
            speech: res.speech,
            image: res.image,
          });
          setImageList([
            {
              uid: "1",
              name: "image.png",
              status: "done",
              url: res.image,
            },
          ]);
          setTestimonialDetails(x?.data);
          setMessages(res?.message);
        } else {
          const error = getErrorMessage(x?.errors) || x?.message;
          message.error({
            content: error || "Error ocurred",
            duration: 3,
          });
        }
      }
    );
  };

  const AddTestimonial = (payload) => {
    getDataManager(testimonial?.addTestimonial, setLoading, payload).then(
      (x) => {
        if (x?.status) {
          message.success({
            content: "Information saved",
            duration: 3,
          });
          navigate("/testimonials");
        } else {
          const error = getErrorMessage(x?.errors) || x?.message;
          message.error({
            content: error || "Error ocurred",
            duration: 3,
          });
        }
      }
    );
  };

  const editTestimonial = (payload) => {
    getDataManager(testimonial?.editTestimonial, setLoading, payload, id).then(
      (x) => {
        if (x?.status) {
          message.success({
            content: "Information saved",
            duration: 3,
          });
          navigate("/testimonials");
        } else {
          const error = getErrorMessage(x?.errors) || x?.message;
          message.error({
            content: error || "Error ocurred",
            duration: 3,
          });
        }
      }
    );
  };

  const onFinish = (values) => {
    const imageFileChanged = values.image !== testimonialsDetails?.image;

    var payload = new FormData();
 
    payload.append("name", values.name);
    payload.append("position", values.position);
    payload.append("message", values.message);
    !!values?.image &&
      imageFileChanged &&
      payload.append("image", values?.image?.file?.originFileObj);

    if (isEdit) {
      editTestimonial(payload);
    } else {
      AddTestimonial(payload);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit Testimonial" : "Add Testimonial"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Title level={5}>Add Testimonial</Title>
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
          label="Position"
          name="position"
          rules={[
            {
              required: true,
              message: "Please enter designation",
            },
          ]}
        >
          <Input placeholder="Enter Designation" />
        </Form.Item>
        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please add message" }]}
        >
          <Editor
            content={messages}
            handleContent={(content) => {
              form.setFieldsValue({ message: content });
              setMessages(content);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[
            {
              required: true,
              message: "Please attach image",
            },
          ]}
        >
          <Upload
            multiple={false}
            accept="image/*"
            listType="picture-card"
            action={null}
            fileList={imageList}
            maxCount={1}
            onChange={({ fileList }) =>
              setImageList(fileList.map((f) => ({ ...f, status: "done" })))
            }
            showUploadList={{
              showPreviewIcon: false,
              showDownloadIcon: false,
              showRemoveIcon: false,
            }}
          >
            <Space>
              <FileAddFilled /> Upload
            </Space>
          </Upload>
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

export default AddTestimonial;
