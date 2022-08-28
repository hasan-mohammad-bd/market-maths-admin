/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Form,
  message,
  Button,
  Input,
  Space,
  Select,
  DatePicker,
  Upload,
} from "antd";
import { FileAddFilled } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";

const { TextArea } = Input;
const { Option } = Select;

const AddOffer = () => {
  const [form] = Form.useForm();

  const offer = new API.Offers();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [offerDetails, setOfferDetails] = useState({});

  useEffect(() => {
    if (id) {
      fetchOfferDetails();
    }
  }, [id]);

  const fetchOfferDetails = () => {
    getDataManager(offer?.getOfferDetails, setLoading, id).then((x) => {
      if (x?.status) {
        const res = x?.data;
        form.setFieldsValue({
          name: res?.name,
          introduction: res?.introduction,
          description: res.description,
          video: res.video,
          expireDate: moment(res.expireDate),
          banner: res.banner,
        });
        setImageList([
          {
            uid: "1",
            name: "img.png",
            status: "done",
            url: res.banner,
          },
        ]);
        setOfferDetails(res);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const addOffer = (payload) => {
    getDataManager(offer?.addOffer, setLoading, payload).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/offers");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editOffer = (payload) => {
    getDataManager(offer?.editOffer, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/offers");
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
    const imageFileChanged = values?.banner !== offerDetails?.banner;
    var payload = new FormData();
    payload.append("name", values?.name);
    payload.append("introduction", values?.introduction);
    values?.video && payload.append("video", values?.video);
    payload.append("description", values?.description);
    payload.append("expireDate", values?.expireDate);
    !!values?.banner &&
      imageFileChanged &&
      payload.append("banner", values?.banner?.file?.originFileObj);

    if (isEdit) {
      editOffer(payload);
    } else {
      addOffer(payload);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit Offer" : "Add Offer"}>
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
          label="Expire Date"
          name="expireDate"
          rules={[
            {
              required: true,
              message: "Please select expire date",
            },
          ]}
        >
          <DatePicker placeholder="Select expiry date" />
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
          label="Banner"
          name="banner"
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

export default AddOffer;
