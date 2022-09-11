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


const AddBreadcrumb = () => {
  const [form] = Form.useForm();

  const breadcrumb = new API.Breadcrumb();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = 1;

  const [loading, setLoading] = useState(false);
  const [breadcrumbDetails, setBreadcrumbDetails] = useState({});
  const [imageList, setImageList] = useState([]);




  const editBreadcrumb = (payload) => {
    getDataManager(breadcrumb?.editBreadcrumb, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/breadcrumb");
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

    const imageFileChanged = values.image !== breadcrumbDetails?.image;

    var payload = new FormData();

    !!values?.image &&
    imageFileChanged &&
      payload.append("image", values?.image?.file?.originFileObj);

    if (isEdit) {
        editBreadcrumb(payload);
    } else {
      // addBlog(payload);

    }
  };



  return (
    <TajiraCard heading={isEdit ? "Edit Breadcrumb" : "Add Breadcrumb"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >

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

export default AddBreadcrumb;
