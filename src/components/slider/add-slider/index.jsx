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
  InputNumber,
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

const { Option } = Select;

const AddSlider = () => {
  const [form] = Form.useForm();

  const slider = new API.Slider();


  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [sliderDetails, setSliderDetails] = useState({});
  const [imageList, setImageList] = useState([]);





  useEffect(() => {
    if (id) {
    //   fetchSocialDetails();
    }

  }, [id]);



/*   const fetchSocialDetails = () => {

    getDataManager(slider?.getSliderDetails, setLoading, id).then((x) => {

      if (x?.status) {
        const res = x?.data;
        form.setFieldsValue({
          name: res.name,
          code: res.code,
          link: res.link,
          
        });
        
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  }; */

  const addSlider = (payload) => {
    getDataManager(slider?.addSlider, setLoading, payload).then((x) => {
      console.log(x);
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/slider");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editSlider= (payload) => {
    getDataManager(slider?.editSlider, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/slider");
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

    const imageFileChanged = values.image !== sliderDetails?.image;

    var payload = new FormData();
    payload.append("main_title", values.main_title);
    payload.append("sub_title", values.sub_title);
    payload.append("slider_text", values.slider_text);
    payload.append("button_text", values.button_text);
    payload.append("button_link", values.button_link);


    !!values?.image &&
      imageFileChanged &&
      payload.append("image", values?.image?.file?.originFileObj);

    if (isEdit) {
      editSlider(payload);
    } else {
      addSlider(payload);

    }
  };





  return (
    <TajiraCard heading={isEdit ? "Edit Slider" : "Add Slider"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Form.Item
          label="Main Title"
          name="main_title"
          rules={[
            {
              required: true,
              message: "Please enter title",
            },
          ]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          label="Sub Title"
          name="sub_title"
          rules={[
            {
              required: true,
              message: "Please enter title",
            },
          ]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          label="Slider Text"
          name="slider_text"
          rules={[
            {
              required: true,
              message: "Please enter slider text",
            },
          ]}
        >
          <Input placeholder="Enter slider text" />
        </Form.Item>
        <Form.Item
          label="Button Text"
          name="button_text"
          rules={[
            {
              required: true,
              message: "Please enter button text",
            },
          ]}
        >
          <Input placeholder="Enter button text" />
        </Form.Item>
        <Form.Item
          label="Button Link"
          name="button_link"
          rules={[
            {
              required: true,
              message: "Please enter button link",
            },
          ]}
        >
          <Input placeholder="Enter Button Link" />
        </Form.Item>
        <Form.Item
          label="image (845*563) "
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

export default AddSlider;
