/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Form,
  message,
  Button,
  Input,
  Typography,
  Select,
  RadioChangeEvent,
  InputNumber,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { Radio } from "antd";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Editor from "../../common/rich-editor";
import TextArea from "antd/lib/input/TextArea";

const { Title } = Typography;
const { Option } = Select;

const AddTag = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [emails, setEmail] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  const message = new API.MessageList();
  const subscriber = new API.SubscriberList();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  useEffect(() => {
    fetchSubscriberList();
  }, []);

  const getOrganizedData = (data) => {
    return (data || []).map((d) => {
      return {
        ...d,
        key: d._id,
      };
    });
  };

  /*   const fetchMessageDetails = () => {
    getDataManager(tag?.getPlanDetails, setLoading, id).then((x) => {
      if (x?.status) {

        form.setFieldsValue({
          name: x?.data?.name,
          plan_type: x?.data?.plan_type,
          duration: x?.data?.duration,
          price: x?.data?.price,
          price_type: x?.data?.price_type,
          support: x?.data?.support,
          dashboard_status: x?.data?.dashboard_status,
          email_status: x?.data?.email_status,
          sms_status: x?.data?.sms_status,
          telegram_status: x?.data?.telegram_status,
          status: x?.data?.status
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

  const fetchSubscriberList = async () => {
    return getDataManager(subscriber?.getSubscriberList, setLoading).then(
      (x) => {
        console.log(x);
        if (x?.status) {
          const emailList = x?.data?.map((m) => m?.email);
          setEmail(emailList);

          console.log(emailList);
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

  const addMessageList = (payload) => {
    getDataManager(message?.addMessage, setLoading, payload).then((x) => {
      console.log(x);
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/message-list");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editMessageList = (payload) => {
    getDataManager(message?.editPlan, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/plan");
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
    if (isEdit) {
      editMessageList(values);
    } else {
      addMessageList(values);
    }
  };

  return (
    <TajiraCard heading={isEdit ? "Edit Message" : "Add Message"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Title level={5}>Plan</Title>
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
          <Input placeholder="Enter Title" />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please add Message" }]}
        >
          <TextArea placeholder="Write message" />
        </Form.Item>

        <Form.Item
          label="Subscriber"
          name="subscriber"
          rules={[{ required: true, message: "Please select publish status" }]}
        >
          <Select mode="multiple" placeholder="Select Publish Status">
            <Option value={emails}>Total email found:{emails.length}</Option>
          </Select>
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

export default AddTag;
