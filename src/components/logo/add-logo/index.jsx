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

const AddLogo = () => {
  const [form] = Form.useForm();

  const logo = new API.TheLogo();


  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = 1;

  const [loading, setLoading] = useState(false);
  const [blogDetails, setBlogDetails] = useState({});

  const [logo1List, setLogo1List] = useState([]);
  const [logo2List, setLogo2List] = useState([]);





  const editLogo = (payload) => {
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

    !!values?.logo &&
    logoFileChanged &&
      payload.append("logo1", values?.logo1?.file?.originFileObj);
    !!values?.logo2 &&
    logo2FileChanged &&
      payload.append("logo2", values?.logo2?.file?.originFileObj);

    if (isEdit) {
      editLogo(payload);
    } else {
      // addBlog(payload);

    }
  };



  return (
    <TajiraCard heading={isEdit ? "Edit logo" : "Add logo"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >

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

export default AddLogo;
