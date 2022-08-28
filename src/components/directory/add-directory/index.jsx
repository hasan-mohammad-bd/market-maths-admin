/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Form, message, Button, Input, Upload, Select, Space } from "antd";
import { FileAddFilled } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";

const { TextArea } = Input;
const { Option } = Select;

const AddDirectory = () => {
  const [form] = Form.useForm();

  const directory = new API.Directory();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [directoryDetails, setDirectoryDetails] = useState({});
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    if (id) {
      fetchDirectoryDetails();
    }
  }, [id]);

  const fetchDirectoryDetails = () => {
    getDataManager(directory?.getDirectoryDetails, setLoading, id).then((x) => {
      if (x?.status) {
        const res = x?.data;
        form.setFieldsValue({
          name: res?.name,
          introduction: res?.introduction,
          description: res.description,
          video: res.video,
          image: res.image,
        });
        setImageList([
          {
            uid: "1",
            name: "img.png",
            status: "done",
            url: res.image,
          },
        ]);
        setDirectoryDetails(res);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const addDirectory = (payload) => {
    getDataManager(directory?.addDirectory, setLoading, payload).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/directory");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editDirectory = (payload) => {
    getDataManager(directory?.editDirectory, setLoading, payload, id).then(
      (x) => {
        if (x?.status) {
          message.success({
            content: "Information saved",
            duration: 3,
          });
          navigate("/directory");
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
    const imageFileChanged = values?.image !== directoryDetails?.image;
    var payload = new FormData();
    payload.append("name", values?.name);
    payload.append("introduction", values?.introduction);
    values?.video && payload.append("video", values?.video);
    payload.append("description", values?.description);
    !!values?.image &&
      imageFileChanged &&
      payload.append("image", values?.image?.file?.originFileObj);

    if (isEdit) {
      editDirectory(payload);
    } else {
      addDirectory(payload);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit Directory" : "Add Directory"}>
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
          label="Introduction"
          name="introduction"
          rules={[
            {
              required: true,
              message: "Please add introduction",
            },
          ]}
        >
          <Input placeholder="Enter Introduction" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
          ]}
        >
          <TextArea rows={6} placeholder="Enter Description" />
        </Form.Item>
        <Form.Item label="Video Link" name="video">
          <Input placeholder="Enter Video Link" />
        </Form.Item>
        <Form.Item
          label="Image (770*576)"
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

export default AddDirectory;
