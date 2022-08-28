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

const { TextArea } = Input;
const { Option } = Select;

const AddClient = () => {
  const [form] = Form.useForm();

  const service = new API.Services();
  const client = new API.Clients();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [portfolioDetails, setPortfolioDetails] = useState({});
  const [services, setServices] = useState([]);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if (id) {
      fetchClientDetails();
    }
    fetchServices();
  }, [id]);

  const fetchServices = () => {
    getDataManager(service?.getServicesList, setLoading).then((x) => {
      if (x?.status) {
        setServices(x?.data?.services);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const fetchClientDetails = () => {
    getDataManager(client?.getClientDetails, setLoading, id).then((x) => {
      if (x?.status) {
        const res = x?.data;
        form.setFieldsValue({
          name: res?.name,
          introduction: res?.introduction,
          description: res?.description,
          video: res?.video,
          image: res?.image,
          location: res?.location,
          website: res?.website,
          services: res?.services?.map((s) => s?._id),
        });
        setImageList([
          {
            uid: "1",
            name: "img.png",
            status: "done",
            url: res.image,
          },
        ]);
        setPortfolioDetails(x?.data);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const addClient = (payload) => {
    getDataManager(client?.addClient, setLoading, payload).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/client");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editClient = (payload) => {
    getDataManager(client?.editClient, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/client");
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
    const imageFileChanged = values.image !== portfolioDetails?.image;

    var payload = new FormData();
    payload.append("name", values.name);
    payload.append("location", values.location);
    payload.append("website", values.website);
    payload.append("introduction", values.introduction);
    payload.append("description", values.description);
    values?.services.forEach((ser) => payload.append("services[]", ser));
    values?.video && payload.append("video", values.video);
    !!values?.image &&
      imageFileChanged &&
      payload.append("image", values?.image?.file?.originFileObj);

    if (isEdit) {
      editClient(payload);
    } else {
      addClient(payload);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit Client" : "Add Client"}>
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
          label="Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Please enter location",
            },
          ]}
        >
          <Input placeholder="Enter location" />
        </Form.Item>
        <Form.Item
          label="Website"
          name="website"
          rules={[
            {
              required: true,
              message: "Please enter website",
            },
          ]}
        >
          <Input placeholder="Enter website" />
        </Form.Item>
        <Form.Item
          label="Introduction"
          name="introduction"
          rules={[
            {
              required: true,
              message: "Please enter introduction",
            },
          ]}
        >
          <Input placeholder="Enter introduction" />
        </Form.Item>

        <Form.Item
          label="Service"
          name="services"
          rules={[
            {
              required: true,
              message: "Please select service",
            },
          ]}
        >
          <Select mode="multiple" laceholder="Select Service">
            {services.map((s) => (
              <Option value={s?._id}>{s?.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={6} placeholder="Enter Description" />
        </Form.Item>
        <Form.Item label="Video" name="video">
          <Input placeholder="Enter video url" />
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

export default AddClient;
