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

const AddTeam = () => {
  const [form] = Form.useForm();

  const portfolio = new API.Portfolio();
  const service = new API.Services();
  const client = new API.Clients();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [portfolioDetails, setPortfolioDetails] = useState({});
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [pdfList, setPdfList] = useState([]);

  useEffect(() => {
    if (id) {
      fetchPortfolioDetails();
    }
    fetchServices();
    fetchClients();
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

  const fetchClients = () => {
    getDataManager(client?.getClientsList, setLoading).then((x) => {
      if (x?.status) {
        setClients(x?.data?.clients);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const fetchPortfolioDetails = () => {
    getDataManager(portfolio?.getPortfolioDetails, setLoading, id).then((x) => {
      if (x?.status) {
        const res = x?.data;
        form.setFieldsValue({
          name: res?.name,
          service: res?.service?._id,
          clientName: res.clientName,
          description: res.description,
          image: res.image,
          pdf: res.pdf,
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

  const addPortfolio = (payload) => {
    getDataManager(portfolio?.addPortfolio, setLoading, payload).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/portfolio");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editPortfolio = (payload) => {
    getDataManager(portfolio?.editPortfolio, setLoading, payload, id).then(
      (x) => {
        if (x?.status) {
          message.success({
            content: "Information saved",
            duration: 3,
          });
          navigate("/portfolio");
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
    const imageFileChanged = values.image !== portfolioDetails?.image;
    const pdfFileChanged = values.pdf !== portfolioDetails?.pdf;

    var payload = new FormData();
    payload.append("name", values.name);
    payload.append("service", values.service);
    payload.append("clientName", values.clientName);
    payload.append("description", values.description);
    !!values?.image &&
      imageFileChanged &&
      payload.append("image", values?.image?.file?.originFileObj);
    !!values?.pdf &&
      pdfFileChanged &&
      payload.append("pdf", values?.pdf?.file?.originFileObj);

    if (isEdit) {
      editPortfolio(payload);
    } else {
      addPortfolio(payload);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit Portfolio" : "Add Portfolio"}>
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
          label="Service"
          name="service"
          rules={[
            {
              required: true,
              message: "Please select Service",
            },
          ]}
        >
          <Select placeholder="Select Service">
            {services.map((s) => (
              <Option value={s?._id}>{s?.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Client Name"
          name="clientName"
          rules={[
            {
              required: true,
              message: "Please select Client",
            },
          ]}
        >
          <Select placeholder="Select Client">
            {clients.map((s) => (
              <Option value={s?._id}>{s?.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={6} placeholder="Enter Description" />
        </Form.Item>
        <Form.Item
          label="PDF Document"
          name="pdf"
          rules={[
            {
              required: true,
              message: "Please attach pdf",
            },
          ]}
        >
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
          label="Image (370 x 280)"
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

export default AddTeam;
