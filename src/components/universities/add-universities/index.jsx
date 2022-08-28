/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Form,
  message,
  Button,
  Input,
  Typography,
  Select,
  Upload,
  Space,
} from "antd";
import { FileAddFilled } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AddUniversity = () => {
  const [form] = Form.useForm();

  const university = new API.University();
  const service = new API.Services();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [pdf, setPdf] = useState([]);
  const [universityDetails, setUniversityDetails] = useState({});
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (id) {
      fetchUniversityDetails();
    }
  }, [id]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchUniversityDetails = () => {
    getDataManager(university?.getUniversityDetails, setLoading, id).then(
      (x) => {
        if (x?.status) {
          const res = x?.data;
          form.setFieldsValue({
            name: res?.name,
            type: res?.type,
            introduction: res?.introduction,
            description: res?.description,
            services: (res?.services || []).map((s) => s?._id),
            image: res?.image,
            pdf: res?.pdf,
            video: res?.video,
            address: res?.address,
          });
          setPdf([
            {
              uid: "1",
              name: "pdf.png",
              status: "done",
              url: res.pdf,
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
          setUniversityDetails(x?.data);
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

  const addUniversity = (payload) => {
    getDataManager(university?.addUniversity, setLoading, payload).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/universities");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editUniversity = (payload) => {
    getDataManager(university?.editUniversity, setLoading, payload, id).then(
      (x) => {
        if (x?.status) {
          message.success({
            content: "Information saved",
            duration: 3,
          });
          navigate("/universities");
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
  const fetchServices = () => {
    getDataManager(service?.getOnlySubServicesList, setLoading, {
      type: "education",
    }).then((x) => {
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

  const onFinish = (values) => {
    const imageFileChanged = values.image !== universityDetails?.image;
    const pdfFileChanged = values.pdf !== universityDetails?.pdf;

    var payload = new FormData();
    payload.append("name", values.name);
    payload.append("type", "university");
    payload.append("introduction", values.introduction);
    payload.append("description", values.description);
    values.video && payload.append("video", values.video);
    values.address && payload.append("address", values.address);

    values?.services.forEach((service) =>
      payload.append("services[]", service)
    );

    !!values?.image &&
      imageFileChanged &&
      payload.append("image", values?.image?.file?.originFileObj);
    !!values?.pdf &&
      pdfFileChanged &&
      payload.append("pdf", values?.pdf?.file?.originFileObj);

    if (isEdit) {
      editUniversity(payload);
    } else {
      addUniversity(payload);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit University" : "Add University"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Title level={5}>University</Title>
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
              message: "Please enter introduction",
            },
          ]}
        >
          <Input placeholder="Enter introduction" />
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
          <TextArea rows={6} placeholder="Enter description" />
        </Form.Item>
        <Form.Item
          label="Services"
          name="services"
          rules={[
            {
              required: true,
              message: "Please select services",
            },
          ]}
        >
          <Select placeholder="Select Service" mode="multiple">
            {services.map((s) => (
              <Option value={s?._id}>{s?.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Video URL" name="video">
          <Input placeholder="Enter video url" />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input placeholder="Add address" />
        </Form.Item>
        <Form.Item label="PDF Document" name="pdf">
          <Upload
            multiple={false}
            listType="picture-card"
            action={null}
            fileList={pdf}
            maxCount={1}
            onChange={({ fileList }) =>
              setPdf(fileList.map((f) => ({ ...f, status: "done" })))
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </TajiraCard>
  );
};

export default AddUniversity;
