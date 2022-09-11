/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Form, message, Button, Input, Select, Upload, Space } from "antd";
import { FileAddFilled } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";
import TextArea from "antd/lib/input/TextArea";

const AddAboutSection = () => {
  const [form] = Form.useForm();

  const aboutSection = new API.AboutSection();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = 1;

  const [loading, setLoading] = useState(false);
  const [aboutSectionDetails, setAboutSectionDetails] = useState({});

  const [imageList, setImageList] = useState([]);

  const editAboutSection = (payload) => {
    getDataManager(
      aboutSection?.editAboutSection,
      setLoading,
      payload,
      id
    ).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/about-section");
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

    const imageFileChanged =
      values.about_image !== aboutSectionDetails?.about_image;

    var payload = new FormData();
    payload.append("about_title", values.about_title);
    payload.append("about_description", values.about_description);
    !!values?.about_image &&
      imageFileChanged &&
      payload.append("about_image", values?.about_image?.file?.originFileObj);

    if (isEdit) {
      editAboutSection(payload);
    } else {
      // addBlog(payload);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit About Section" : "Add About Section"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Form.Item
          label="About Title"
          name="about_title"
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
          label="About Description"
          name="about_description"
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
          ]}
        >
          <TextArea placeholder="Enter Description" />
        </Form.Item>
        <Form.Item
          label="About Image"
          name="about_image"
          rules={[
            {
              required: true,
              message: "Please enter description",
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

export default AddAboutSection;
