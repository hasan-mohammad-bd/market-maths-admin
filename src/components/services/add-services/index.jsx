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

const AddService = () => {
  const [form] = Form.useForm();

  const service = new API.Services();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [serviceDetails, setServiceDetails] = useState({});
  const [imageList, setImageList] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [icon, setIcon] = useState([]);
  const [pdfList, setPdfList] = useState([]);
  const [isImmigirationService, setIsImmigirationService] = useState(false);

  useEffect(() => {
    if (id) {
      fetchServiceDetails();
    }
  }, [id]);

  useEffect(() => {
    form.setFieldsValue({
      name: serviceDetails?.name,
      introduction: serviceDetails?.introduction,
      description: serviceDetails.description,
      video: serviceDetails.video,
      image: serviceDetails.image,
      pdf: serviceDetails.pdf,
      icon: serviceDetails.icon,
      type: serviceDetails?.type,
    });
    setPdfList([
      {
        uid: "1",
        name: "pdf.png",
        status: "done",
        url: serviceDetails.pdf,
      },
    ]);
    setIcon([
      {
        uid: "1",
        name: "icon.png",
        status: "done",
        url: serviceDetails.icon,
      },
    ]);
    if (
      serviceDetails?.parent === null &&
      serviceDetails?.type === "immigration"
    ) {
      form.setFieldsValue({
        banner: serviceDetails?.banners.map((b, i) => {
          return {
            uid: i,
            name: `banner_${i + 1}.png`,
            status: "done",
            url: b,
          };
        }),
      });
      setBannerList(
        serviceDetails?.banners.map((b, i) => {
          return {
            uid: i,
            name: `banner_${i + 1}.png`,
            status: "done",
            url: b,
          };
        })
      );
      setIsImmigirationService(true);
    } else {
      setImageList([
        {
          uid: "1",
          name: "img.png",
          status: "done",
          url: serviceDetails.image,
        },
      ]);
    }
  }, [serviceDetails]);

  const fetchServiceDetails = () => {
    getDataManager(service?.getServiceDetails, setLoading, id).then((x) => {
      if (x?.status) {
        const res = x?.data?.service;
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
        navigate("/services");
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
        navigate("/services");
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
    payload.append("type", values?.type);

    if (isImmigirationService) {
      const banners = (values?.banner?.fileList || []).filter(
        (f) => !!f?.originFileObj
      );
      banners.forEach((file) => payload.append("banner", file?.originFileObj));
    } else {
      !!values?.image &&
        imageFileChanged &&
        payload.append("image", values?.image?.file?.originFileObj);
    }

    !!values?.pdf &&
      pdfFileChanged &&
      payload.append("pdf", values?.pdf?.file?.originFileObj);

    !!values?.icon &&
      iconFileChanged &&
      payload.append("icon", values?.icon?.file?.originFileObj);

    if (isEdit) {
      editService(payload);
    } else {
      addService(payload);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit Service" : "Add Service"}>
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
          label="Service Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please select service type",
            },
          ]}
        >
          <Select placeholder="Select service type">
            <Option value="immigration">Immigration</Option>
            <Option value="education">Education</Option>
            <Option value="marketing">Marketing</Option>
            <Option value="other">Other</Option>
          </Select>
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
        {serviceDetails?.parent === null &&
        serviceDetails?.type === "immigration" ? (
          <Form.Item
            label="Banner (770*576)"
            name="banner"
            rules={[
              {
                required: true,
                message: "Please attach banners",
              },
            ]}
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              action={null}
              fileList={bannerList}
              onChange={({ fileList }) =>
                setBannerList(fileList.map((f) => ({ ...f, status: "done" })))
              }
              showUploadList={{
                showPreviewIcon: false,
                showDownloadIcon: false,
                showRemoveIcon: true,
              }}
            >
              {bannerList.length >= 6 ? null : (
                <Space>
                  <FileAddFilled /> Upload
                </Space>
              )}
            </Upload>
          </Form.Item>
        ) : (
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
        )}
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

export default AddService;
