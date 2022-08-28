/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Form, message, Button, Input, Upload, Space } from "antd";
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

const AddSubService = () => {
  const [form] = Form.useForm();

  const service = new API.Services();

  const navigate = useNavigate();
  const params = useParams();
  const { id, type, parent } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [serviceDetails, setServiceDetails] = useState({});
  const [imageList, setImageList] = useState([]);
  const [icon, setIcon] = useState([]);
  const [pdfList, setPdfList] = useState([]);

  useEffect(() => {
    if (id) {
      fetchServiceDetails();
    }
  }, [id]);

  const fetchServiceDetails = () => {
    getDataManager(service?.getServiceDetails, setLoading, id).then((x) => {
      if (x?.status) {
        const res = x?.data?.service;
        form.setFieldsValue({
          name: res?.name,
          introduction: res?.introduction,
          description: res.description,
          video: res.video,
          image: res.image,
          pdf: res.pdf,
          icon: res.icon,
        });
        setPdfList([
          {
            uid: "1",
            name: "pdf.png",
            status: "done",
            url: res.pdf,
          },
        ]);
        setImageList([
          {
            uid: "1",
            name: "img.png",
            status: "done",
            url: res.image,
          },
        ]);
        setIcon([
          {
            uid: "1",
            name: "icon.png",
            status: "done",
            url: res.icon,
          },
        ]);
        setServiceDetails(res);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const addService = (payload) => {
    getDataManager(service?.addService, setLoading, payload).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate(`/sub-service/${parent}`);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editService = (payload) => {
    getDataManager(service?.editService, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate(`/sub-service/${parent}`);
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
    const imageFileChanged = values?.image !== serviceDetails?.image;
    const pdfFileChanged = values?.pdf !== serviceDetails?.pdf;
    const iconFileChanged = values?.icon !== serviceDetails?.icon;

    var payload = new FormData();
    payload.append("name", values?.name);
    payload.append("introduction", values?.introduction);
    values?.video && payload.append("video", values?.video);
    payload.append("description", values?.description);
    !!values?.image &&
      imageFileChanged &&
      payload.append("image", values?.image?.file?.originFileObj);

    !!values?.pdf &&
      pdfFileChanged &&
      payload.append("pdf", values?.pdf?.file?.originFileObj);

    !!values?.icon &&
      iconFileChanged &&
      payload.append("icon", values?.icon?.file?.originFileObj);

    if (isEdit) {
      payload.append("parent", serviceDetails?.parent);
      payload.append("type", serviceDetails?.type);
      editService(payload);
    } else {
      payload.append("parent", parent);
      payload.append("type", type);
      addService(payload);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit Sub Service" : "Add Sub Service"}>
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
        <Form.Item label="PDF Document" name="pdf">
          <Upload
            multiple={false}
            listType="picture-card"
            action={null}
            fileList={pdfList}
            maxCount={1}
            onChange={({ fileList }) =>
              setPdfList(fileList.map((f) => ({ ...f, status: "done" })))
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
        <Form.Item
          label="Icon (with transparent background)"
          name="icon"
          rules={[
            {
              required: true,
              message: "Please attach icon",
            },
          ]}
        >
          <Upload
            multiple={false}
            accept="image/*"
            listType="picture-card"
            action={null}
            fileList={icon}
            maxCount={1}
            onChange={({ fileList }) =>
              setIcon(fileList.map((f) => ({ ...f, status: "done" })))
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

export default AddSubService;
