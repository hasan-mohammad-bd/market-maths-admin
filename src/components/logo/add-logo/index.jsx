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

  const logo = new API.TheLogo();
/*   const tag = new API.Tags();
  const category = new API.Category(); */

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = 1;

  const [loading, setLoading] = useState(false);
  const [blogDetails, setBlogDetails] = useState({});
  const [description, setDescription] = useState("");
  // const [tags, setTags] = useState([]);
  const [categories, setCategory] = useState([])
  const [logo1List, setLogo1List] = useState([]);
  const [logo2List, setLogo2List] = useState([]);
  const [comments, setComments] = useState([]);




  useEffect(() => {
    if (id) {
      // fetchBlogDetails();
    }
    // fetchTagsList();
    // fetchCategoryList()
  }, [id]);


  


/*   const fetchBlogDetails = () => {

    getDataManager(blog?.getBlogDetails, setLoading, id).then((x) => {

      if (x?.status) {
        const res = x?.data;
        form.setFieldsValue({
          title: res.title,
          description: res.description,
          tags: (res.tags || []).map((t) => t?._id),
          status: res.status,
          image: res.image,
          category: res.category,
          featured: res.featured
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
  }; */

/*   const addBlog = (payload) => {
    getDataManager(blog?.addBlog, setLoading, payload).then((x) => {
      console.log(x);
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
 */
  const editBlog = (payload) => {
    getDataManager(logo?.editTheLogo, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/logo");
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

    const logoFileChanged = values.logo1 !== blogDetails?.logo1;
    const logo2FileChanged = values.logo2 !== blogDetails?.logo2;

    var payload = new FormData();
/*     payload.append("title", values.title);
    payload.append("description", values.description);
    payload.append("featured", values.featured);
    payload.append("tags", JSON.stringify(values.tags));
    values?.tags.forEach((tag) => payload.append("tags", tag));
    payload.append("category", values.category) */

    !!values?.logo &&
    logoFileChanged &&
      payload.append("logo1", values?.logo1?.file?.originFileObj);
    !!values?.logo2 &&
    logo2FileChanged &&
      payload.append("logo2", values?.logo2?.file?.originFileObj);

    if (isEdit) {
      editBlog(payload);
    } else {
      // addBlog(payload);

    }
  };

/*   const handleDelete = (id) => {
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
  }; */

/*   const columns = [
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
  ]; */

  return (
    <TajiraCard heading={isEdit ? "Edit logo" : "Add logo"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
{/*         <Form.Item
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
        </Form.Item> */}
{/*         <Form.Item label="Introduction" name="introduction">
          <Input placeholder="Enter introduction" />
        </Form.Item> */}
{/*         <Form.Item
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
        </Form.Item> */}
{/*         <Form.Item
          label="Tags"
          name="tags"
          rules={[{ required: true, message: "Please select tags" }]}
        >
          <Select mode="multiple" placeholder="Select tags">
            {tagsList?.map((t) => (
              <Option key={t?._id} value={t?._id}>
                {t?.name}
              </Option>
            ))}
          </Select>
        </Form.Item> */}
{/*         <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select category" }]}
        >
          <Select placeholder="Select category">
            {categories?.map((t) => (
              <Option key={t?._id} value={t?._id}>
                {t?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Publish"
          name="featured"
          rules={[{ required: true, message: "Please select publish status" }]}
        >
          <Select placeholder="Select Publish Status">
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item> */}
        <Form.Item
          label="Logo 1 (845*563) "
          name="logo1"
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
            fileList={logo1List}
            maxCount={1}
            onChange={({ fileList }) =>
              setLogo1List(fileList.map((f) => ({ ...f, status: "done" })))
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
          label="Logo 2 (845*563) "
          name="logo2"
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
            fileList={logo2List}
            maxCount={1}
            onChange={({ fileList }) =>
              setLogo2List(fileList.map((f) => ({ ...f, status: "done" })))
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
