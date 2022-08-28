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

  const blog = new API.Blog();
  const tag = new API.Tags();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [blogDetails, setBlogDetails] = useState({});
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (id) {
      fetchBlogDetails();
    }
    fetchTagsList();
  }, [id]);

  const fetchTagsList = () => {
    getDataManager(tag?.getTagsList, setLoading, id).then((x) => {
      if (x?.status) {
        setTags(x?.data?.tags);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const fetchBlogDetails = () => {
    getDataManager(blog?.getBlogDetails, setLoading, id).then((x) => {
      if (x?.status) {
        const res = x?.data?.blog;
        form.setFieldsValue({
          title: res.title,
          description: res.description,
          tags: (res.tags || []).map((t) => t?._id),
          is_published: res.is_published,
          image: res.image,
          introduction: res.introduction,
        });
        setImageList([
          {
            uid: "1",
            name: "image.png",
            status: "done",
            url: res.image,
          },
        ]);
        setComments(x?.data?.comments);
        setDescription(res?.description);
        setBlogDetails(res);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const addBlog = (payload) => {
    getDataManager(blog?.addBlog, setLoading, payload).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/blog");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editBlog = (payload) => {
    getDataManager(blog?.editBlog, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/blog");
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
    payload.append("title", values.title);
    payload.append("description", values.description);
    payload.append("introduction", values.introduction);
    payload.append("is_published", values.is_published);
    values?.tags.forEach((tag) => payload.append("tags[]", tag));

    !!values?.image &&
      imageFileChanged &&
      payload.append("image", values?.image?.file?.originFileObj);

    if (isEdit) {
      editBlog(payload);
    } else {
      addBlog(payload);
    }
  };

  const handleDelete = (id) => {
    getDataManager(blog?.deleteBlog, setLoading, id).then((x) => {
      if (x.status) {
        fetchBlogDetails();
        message.success({
          content: "comment deleted successfully",
          duration: 2,
        });
      } else {
        message.error({ content: "Process failed", duration: 2 });
      }
    });
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete?"
          onConfirm={() => handleDelete(record?._id)}
        >
          <DeleteOutlined className="delete-icon" />
        </Popconfirm>
      ),
    },
  ];

  return (
    <TajiraCard heading={isEdit ? "Edit Blog" : "Add Blog"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter title",
            },
          ]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item label="Introduction" name="introduction">
          <Input placeholder="Enter introduction" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please add description" }]}
        >
          <Editor
            content={description}
            handleContent={(content) => {
              form.setFieldsValue({ description: content });
              setDescription(content);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Tags"
          name="tags"
          rules={[{ required: true, message: "Please select tags" }]}
        >
          <Select mode="multiple" placeholder="Select tags">
            {tags?.map((t) => (
              <Option key={t?._id} value={t?._id}>
                {t?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Is published"
          name="is_published"
          rules={[{ required: true, message: "Please select publish status" }]}
        >
          <Select placeholder="Select Publish Status">
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Image (845*563) "
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
        {isEdit && (
          <Form.Item>
            <Table columns={columns} dataSource={comments} />
          </Form.Item>
        )}
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
