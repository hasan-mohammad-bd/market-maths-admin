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

  const service = new API.Speciality();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [serviceDetails, setServiceDetails] = useState({});

  const [icon, setIcon] = useState([]);


  useEffect(() => {
    if (id) {
      fetchSpecialityDetails();
    }
  }, [id]);

  useEffect(() => {
    form.setFieldsValue({
      name: serviceDetails?.name,
      description: serviceDetails.description,

    });

    setIcon([
      {
        uid: "1",
        name: "icon.png",
        status: "done",
        url: serviceDetails.icon,
      },
    ]);

  }, [serviceDetails]);

  const fetchSpecialityDetails = () => {
    getDataManager(service?.getSpecialityeDetails, setLoading, id).then((x) => {
      if (x?.status) {
        const res = x?.data;
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

  const addSpeciality = (payload) => {
    getDataManager(service?.addSpeciality, setLoading, payload).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/speciality");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editSpeciality = (payload) => {
    getDataManager(service?.editSpeciality, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/speciality");
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
    payload.append("description", values?.description);
    

    !!values?.icon &&
      iconFileChanged &&
      payload.append("icon", values?.icon?.file?.originFileObj);

    if (isEdit) {
        editSpeciality(payload);
    } else {
        addSpeciality(payload);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit Speciality" : "Add Speciality"}>
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

        <Form.Item
          label="Icon"
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
