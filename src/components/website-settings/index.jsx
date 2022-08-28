/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Typography,
  Form,
  Input,
  message,
  Button,
  Row,
  Col,
  Upload,
  Card,
  Space,
} from "antd";

import { FileAddFilled } from "@ant-design/icons";

import TajiraCard from "../common/tajira-card";
import Spinner from "../common/spinner";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";
import Editor from "../common/rich-editor";

const { TextArea } = Input;
const { Title } = Typography;

const WebsiteSettings = () => {
  const [form] = Form.useForm();

  const website = new API.Website();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [aboutUsImage, setAboutUsImage] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState([]);
  const [websiteDetails, setWebsiteDetails] = useState({});
  const [mission, setMission] = useState("");
  const [goal, setGoal] = useState("");
  const [whyUs, setWhyUs] = useState("");

  useEffect(() => {
    fetchWebsiteDetails();
  }, []);

  const fetchWebsiteDetails = (payload) => {
    getDataManager(website?.getWebsiteData, setLoading, payload).then((x) => {
      if (x?.status) {
        const res = x?.data;
        form.setFieldsValue({
          name: res?.name,
          email: res?.email,
          phone: res?.phone,
          address: res?.address,
          facebook: res?.facebook,
          twitter: res?.twitter,
          instagram: res?.instagram,
          whatsApp: res?.whatsApp,
          about_us: res?.about_us,
          mission: res?.mission,
          goal: res?.goal,
          why_us: res?.why_us,
          about_us_image: res.about_us_image,
          video: res?.video,
          image: res?.image,
          background: res?.background,
        });
        setAboutUsImage([
          {
            uid: "1",
            name: "img.png",
            status: "done",
            url: res.about_us_image,
          },
        ]);
        setImage([
          {
            uid: "1",
            name: "img.png",
            status: "done",
            url: res.image,
          },
        ]);
        setBackgroundImage([
          {
            uid: "1",
            name: "img.png",
            status: "done",
            url: res.background,
          },
        ]);
        setWebsiteDetails(x?.data);
        setMission(res?.mission);
        setGoal(res?.goal);
        setWhyUs(res?.why_us);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editWebsite = (payload) => {
    getDataManager(website?.editWebsite, setLoading, payload).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        fetchWebsiteDetails();
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
    const imageFileChanged = values?.image !== websiteDetails?.image;
    const aboutUsImageFileChanged =
      values?.about_us_image !== websiteDetails?.about_us_image;
    const backgroundImageFileChanged =
      values?.background !== websiteDetails?.background;

    var payload = new FormData();
    payload.append("name", values?.name);
    payload.append("email", values?.email);
    payload.append("phone", values?.phone);
    payload.append("address", values?.address);
    payload.append("facebook", values?.facebook);
    payload.append("twitter", values?.twitter);
    payload.append("instagram", values?.instagram);
    payload.append("whatsApp", values?.whatsApp);
    payload.append("about_us", values?.about_us);
    payload.append("mission", values?.mission);
    payload.append("goal", values?.goal);
    payload.append("why_us", values?.why_us);
    values?.video && payload.append("video", values?.video);
    !!values?.image &&
      imageFileChanged &&
      payload.append("image", values?.image?.file?.originFileObj);
    !!values?.about_us_image &&
      aboutUsImageFileChanged &&
      payload.append(
        "about_us_image",
        values?.about_us_image?.file?.originFileObj
      );
    !!values?.background &&
      backgroundImageFileChanged &&
      payload.append("background", values?.background?.file?.originFileObj);

    editWebsite(payload);
  };

  return (
    <TajiraCard heading="Websites" forForm={true}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Card>
          <Title level={5}>Website Details</Title>
          <Row gutter={[20, 0]}>
            <Col span={24}>
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
            </Col>
            <Col span={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter email",
                  },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please enter phone number" },
                ]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input placeholder="Enter address" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Facebook"
                name="facebook"
                rules={[
                  {
                    required: true,
                    message: "Please enter facebook link",
                  },
                ]}
              >
                <Input placeholder="Enter facebook link" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Twitter"
                name="twitter"
                rules={[
                  {
                    required: true,
                    message: "Please enter twitter link",
                  },
                ]}
              >
                <Input placeholder="Enter twitter link" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Instagram"
                name="instagram"
                rules={[
                  {
                    required: true,
                    message: "Please enter instagram link",
                  },
                ]}
              >
                <Input placeholder="Enter instagram link" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Whatsapp"
                name="whatsApp"
                rules={[
                  {
                    required: true,
                    message: "Please enter whatsapp",
                  },
                ]}
              >
                <Input placeholder="Enter whatsapp" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="About Us"
                name="about_us"
                rules={[
                  {
                    required: true,
                    message: "Please enter about us",
                  },
                ]}
              >
                <TextArea rows={6} placeholder="Enter about us" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Mission"
                name="mission"
                rules={[
                  {
                    required: true,
                    message: "Please enter mission",
                  },
                ]}
              >
                <Editor
                  content={mission}
                  handleContent={(content) => {
                    form.setFieldsValue({ mission: content });
                    setMission(content);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Goal"
                name="goal"
                rules={[
                  {
                    required: true,
                    message: "Please enter goal",
                  },
                ]}
              >
                <Editor
                  content={goal}
                  handleContent={(content) => {
                    form.setFieldsValue({ goal: content });
                    setGoal(content);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Why Us?"
                name="why_us"
                rules={[
                  {
                    required: true,
                    message: "Please enter why us",
                  },
                ]}
              >
                <Editor
                  content={whyUs}
                  handleContent={(content) => {
                    form.setFieldsValue({ why_us: content });
                    setWhyUs(content);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="video" name="video">
                <Input placeholder="Enter video url" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="About Us Image (570 * 662) "
                name="about_us_image"
                rules={[
                  {
                    required: true,
                    message: "Please enter about us image",
                  },
                ]}
              >
                <Upload
                  multiple={false}
                  accept="image/*"
                  listType="picture-card"
                  action={null}
                  fileList={aboutUsImage}
                  maxCount={1}
                  onChange={({ fileList }) =>
                    setAboutUsImage(
                      fileList.map((f) => ({ ...f, status: "done" }))
                    )
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
            </Col>
            <Col span={24}>
              <Form.Item
                label="Image"
                name="image"
                rules={[
                  {
                    required: true,
                    message: "Please enter image",
                  },
                ]}
              >
                <Upload
                  multiple={false}
                  accept="image/*"
                  listType="picture-card"
                  action={null}
                  fileList={image}
                  maxCount={1}
                  onChange={({ fileList }) =>
                    setImage(fileList.map((f) => ({ ...f, status: "done" })))
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
            </Col>
            <Col span={24}>
              <Form.Item
                label="Background Image"
                name="background"
                rules={[
                  {
                    required: true,
                    message: "Please enter background image",
                  },
                ]}
              >
                <Upload
                  multiple={false}
                  accept="image/*"
                  listType="picture-card"
                  action={null}
                  fileList={backgroundImage}
                  maxCount={1}
                  onChange={({ fileList }) =>
                    setBackgroundImage(
                      fileList.map((f) => ({ ...f, status: "done" }))
                    )
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
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </TajiraCard>
  );
};

export default WebsiteSettings;
