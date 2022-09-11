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

const AddSignal = () => {
  const [form] = Form.useForm();

  const signal = new API.Signal();
  const plan = new API.Plan();
  const assets = new API.Assets();
  const symbol = new API.Symbol();
  const type = new API.Type();
  const frame = new API.Frame();
  const status = new API.Status();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [blogDetails, setBlogDetails] = useState({});
  const [description, setDescription] = useState("");
  const [imageList, setImageList] = useState([]);
  const [comments, setComments] = useState([]);
  const [planList, setPlanList] = useState([]);
  const [assetsList, setAssetsList] = useState([]);
  const [symbolList, setSymbolList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [frameList, setFrameList] = useState([]);
  const [statusList, setStatusList] = useState([]);



  useEffect(() => {
    if (id) {
      fetchSignalDetails();
    }
    fetchPlanList();
    fetchAssetsList();
    fetchSymbolList();
    fetchTypeList();
    fetchFrameList();
    fetchStatusList();
  }, [id]);

  const fetchStatusList = async (payload) => {
    return getDataManager(status?.getStatusList, setLoading).then((x) => {
      if (x?.status) {
        setStatusList(x.data)
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const fetchFrameList = async (payload) => {
    return getDataManager(frame?.getFrameList, setLoading).then((x) => {
      if (x?.status) {
        setFrameList(x.data)
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };


  const fetchTypeList = async (payload) => {
    return getDataManager(type?.getTypeList, setLoading).then((x) => {
      if (x?.status) {
        setTypeList(x.data)
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const fetchSymbolList = async (payload) => {
    return getDataManager(symbol?.getSymbolList, setLoading).then((x) => {
      if (x?.status) {
        setSymbolList(x.data)

      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const fetchPlanList = async (payload) => {
    return getDataManager(plan?.getPlanList, setLoading).then((x) => {
      if (x?.status) {
        setPlanList(x.data)
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const fetchAssetsList = async (payload) => {
    return getDataManager(assets?.getAssetsList, setLoading).then((x) => {
      if (x?.status) {

        setAssetsList(x.data);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };




  const fetchSignalDetails = () => {

    getDataManager(signal?.getSignalDetails, setLoading, id).then((x) => {

      if (x?.status) {
        const res = x?.data;
        form.setFieldsValue({
          title: res.title,
          description: res.description,
          plan: (res?.plan || []).map((t) => t?._id),
          asset: res?.asset.name,
          symbol: res?.symbol.name,
          signal_type: res?.signal_type.name,
          time_frame: res?.time_frame.name,
          entry_price: res?.entry_price,
          stop_loss: res?.stop_loss,
          take_profit: res?.take_profit,
          status: res?.status.name,
          image: res?.image
          
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

  const addSignal = (payload) => {
    getDataManager(signal?.addSignal, setLoading, payload).then((x) => {
      console.log(x);
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/signal");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const editSignal = (payload) => {
    getDataManager(signal?.editSignal, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/signal");
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
    const imageFileChanged = values.image !== blogDetails?.image;

    var payload = new FormData();
    payload.append("title", values.title);
    payload.append("description", values.description);
    payload.append("entry_price", values.entry_price);
    payload.append("stop_loss", values.stop_loss);
    payload.append("take_profit", values.take_profit);
    payload.append("plan", JSON.stringify(values.plan));
    payload.append("asset", values.asset);
    payload.append("symbol", values.symbol);
    payload.append("signal_type", values.signal_type);
    payload.append("time_frame", values.time_frame);
    payload.append("status", values.status);
    

    !!values?.image &&
      imageFileChanged &&
      payload.append("image", values?.image?.file?.originFileObj);

    if (isEdit) {
      editSignal(payload);
    } else {
      addSignal(payload);

    }
  };

  const handleDelete = (id) => {
    getDataManager(signal?.deleteBlog, setLoading, id).then((x) => {
      if (x.status) {
        fetchSignalDetails();
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
    <TajiraCard heading={isEdit ? "Edit Signal" : "Add Signal"}>
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
{/*         <Form.Item label="Introduction" name="introduction">
          <Input placeholder="Enter introduction" />
        </Form.Item> */}
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
          label="Entry Price / USD"
          name="entry_price"
          type="number"
          rules={[
            {
              required: true,
              message: "Please enter price in number",
            },
          ]}
        >
          <InputNumber placeholder="Enter Stop Loss" />
        </Form.Item>
        <Form.Item
          label="Stop Loss / USD"
          name="stop_loss"
          type="number"
          rules={[
            {
              required: true,
              message: "Please enter stop loss in number",
            },
          ]}
        >
          <InputNumber placeholder="Enter price" />
        </Form.Item>
        <Form.Item
          label="Profit / USD"
          name="take_profit"
          type="number"
          rules={[
            {
              required: true,
              message: "Please enter stop loss in number",
            },
          ]}
        >
          <InputNumber placeholder="Enter price" />
        </Form.Item>
        <Form.Item
          label="Plan"
          name="plan"
          rules={[{ required: true, message: "Please select plan" }]}
        >
          <Select mode="multiple" placeholder="Select Plan">
            {planList?.map((t) => (
              <Option key={t?._id} value={t?._id}>
                {t?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Asset"
          name="asset"
          rules={[{ required: true, message: "Please select asset" }]}
        >
          <Select placeholder="Select asset">
            {assetsList?.map((t) => (
              <Option key={t?._id} value={t?._id}>
                {t?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Symbol"
          name="symbol"
          rules={[{ required: true, message: "Please select symbol" }]}
        >
          <Select placeholder="Select Symbol">
            {symbolList?.map((t) => (
              <Option key={t?._id} value={t?._id}>
                {t?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Signal Type"
          name="signal_type"
          rules={[{ required: true, message: "Please select symbol type" }]}
        >
          <Select placeholder="Select Symbol type">
            {typeList?.map((t) => (
              <Option key={t?._id} value={t?._id}>
                {t?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Time Frame"
          name="time_frame"
          rules={[{ required: true, message: "Please select symbol type" }]}
        >
          <Select placeholder="Select Symbol type">
            {frameList?.map((t) => (
              <Option key={t?._id} value={t?._id}>
                {t?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select symbol type" }]}
        >
          <Select placeholder="Select Symbol type">
            {statusList?.map((t) => (
              <Option key={t?._id} value={t?._id}>
                {t?.name}
              </Option>
            ))}
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

export default AddSignal;
