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

const AddAbout = () => {
  const [form] = Form.useForm();

  const about = new API.About();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = 1;

  const [loading, setLoading] = useState(false);
  const [aboutDetails, setAboutDetails] = useState({});
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if (id) {
      // fetchBlogDetails();
    }
  }, [id]);

  const editAbout = (payload) => {
    getDataManager(about?.editAbout, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/about");
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
      values.short_about_img !== aboutDetails?.short_about_img;

    var payload = new FormData();
    payload.append("about", values.about);
    payload.append("short_about", values.short_about);
    !!values?.short_about_img &&
      imageFileChanged &&
      payload.append(
        "short_about_img",
        values?.short_about_img?.file?.originFileObj
      );

    if (isEdit) {
      editAbout(payload);
    } else {
      // addBlog(payload);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit About" : "Add image"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Form.Item
          label="About"
          name="about"
          rules={[
            {
              required: true,
              message: "Please enter about",
            },
          ]}
        >
          <Input placeholder="Enter About" />
        </Form.Item>
        <Form.Item
          label="Short About"
          name="short_about"
          rules={[
            {
              required: true,
              message: "Please enter about",
            },
          ]}
        >
          <Input placeholder="Enter About" />
        </Form.Item>

        <Form.Item
          label="image (845*563) "
          name="short_about_img"
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

export default AddAbout;
