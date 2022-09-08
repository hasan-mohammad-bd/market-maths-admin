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
  Radio,
} from "antd";
import { FileAddFilled, DeleteOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";
import Editor from "../../common/rich-editor";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";
import TextArea from "antd/lib/input/TextArea";

const { Option } = Select;

const AddBlog = () => {
  const [form] = Form.useForm();

  const aboutSection = new API.AboutSection();
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
  const [imageList, setImageList] = useState([]);
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
  const editAboutSection = (payload) => {
    getDataManager(aboutSection?.editAboutSection, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/about-section");
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

    const imageFileChanged = values.about_image !== blogDetails?.about_image;

    var payload = new FormData();
    payload.append("about_title", values.about_title);
    payload.append("about_description", values.about_description);
    !!values?.about_image &&
    imageFileChanged &&
      payload.append("about_image", values?.about_image?.file?.originFileObj);

    if (isEdit) {
        editAboutSection(payload);
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
    <TajiraCard heading={isEdit ? "Edit Plan Section" : "Add Plan Section"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Form.Item
          label="About Title"
          name="about_title"
          rules={[
            {
              required: true,
              message: "Please enter title",
            },
          ]}
        >
        <Input placeholder="Enter Title" />
        </Form.Item>
        <Form.Item
          label="About Description"
          name="about_description"
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
          ]}
        >
            <TextArea placeholder="Enter Description"/>
        </Form.Item>
        <Form.Item
          label="About Image"
          name="about_image"
          rules={[
            {
              required: true,
              message: "Please enter description",
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
