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

const AddBlog = () => {
  const [form] = Form.useForm();

  const team = new API.Team();


  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [blogDetails, setBlogDetails] = useState({});
  const [description, setDescription] = useState("");
  // const [tags, setTags] = useState([]);
  const [categories, setCategory] = useState([])
  const [imageList, setImageList] = useState([]);
  const [comments, setComments] = useState([]);




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

  const addTeam= (payload) => {
    getDataManager(team?.addTeam, setLoading, payload).then((x) => {
      console.log(x);
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/team");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editTeam= (payload) => {
    getDataManager(team?.editTeam, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/team");
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



    const imageFileChanged = values.image !== blogDetails?.image;

    var payload = new FormData();
    payload.append("name", values.name);
    payload.append("details", values.details);
    payload.append("position", values.position);
    payload.append("facebook", values.facebook);
    payload.append("twitter", values.twitter);
    payload.append("linkedin", values.linkedin);
    payload.append("instragram", values.instagram);


    !!values?.image &&
      imageFileChanged &&
      payload.append("image", values?.image?.file?.originFileObj);

    if (isEdit) {
      editTeam(payload);
    } else {
      addTeam(payload);

    }
  };





  return (
    <TajiraCard heading={isEdit ? "Edit Team" : "Add Team Member"}>
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
          <Input placeholder="Enter Name" />
        </Form.Item>
        <Form.Item
          label="Details"
          name="details"
          rules={[
            {
              required: true,
              message: "Please enter details",
            },
          ]}
        >
          <Input placeholder="Enter details" />
        </Form.Item>
        <Form.Item
          label="Position"
          name="position"
          rules={[
            {
              required: true,
              message: "Please enter position",
            },
          ]}
        >
          <Input placeholder="Enter Position" />
        </Form.Item>
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
          <Input placeholder="Enter twitter Link" />
        </Form.Item>
        <Form.Item
          label="Linkedin"
          name="linkedin"
          rules={[
            {
              required: true,
              message: "Please enter linkedin link",
            },
          ]}
        >
          <Input placeholder="Enter Linkedin Link" />
        </Form.Item>
        <Form.Item
          label="Instagram"
          name="instragram"
          rules={[
            {
              required: true,
              message: "Please enter instagram link",
            },
          ]}
        >
          <Input placeholder="Enter Instagram Link" />
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

export default AddBlog;
