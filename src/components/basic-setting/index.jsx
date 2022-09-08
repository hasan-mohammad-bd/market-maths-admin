/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Image, Tag, Tooltip } from "antd";
import { FormOutlined, DeleteOutlined, EyeOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";
import AddNewButton from "../common/add-button";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";
import About from "../../utils/api/About";

const BlogList = () => {
  const basicSetting = new API.BasicSetting();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [aboutList, setAboutList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchBasicSetting();
  }, []);

  const fetchBasicSetting = async (payload) => {
    return getDataManager(basicSetting?.getBasicSetting, setLoading, payload).then((x) => {

      if (x?.status) {
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setAboutList([x?.data]);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };


/*   const handleAdd = () => {
    navigate("/add-logo");
  };
 */
  const handleEdit = () => {
    navigate(`/edit-basic-setting`);
  };

/*   const handleDelete = (id) => {
    getDataManager(blog?.deleteBlog, setLoading, id).then((x) => {
      if (x.status) {
        fetchBlogList();
        message.success({
          content: "blog deleted successfully",
          duration: 2,
        });
      } else {
        message.error({ content: "Process failed", duration: 2 });
      }
    });
  }; */



  const columns = [


    {
      title: "Title",
      dataIndex: "title",
      key: "title",

    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",

    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",

    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",

    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",

    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",

    },
    {
      title: "Telegram Status",
      dataIndex: "telegram_status",
      key: "telegram_status",
      render: (text, record) => (
        <span>
          {record?.telegram_status === true ? <CheckOutlined /> : <CloseOutlined />}
        </span>
      ),
      

    },
    {
      title: "Email Alert",
      dataIndex: "email_alert",
      key: "email_alert",
      render: (text, record) => (
        <span>
          {record?.email_alert === true ? <CheckOutlined /> : <CloseOutlined />}
        </span>
      ),

    },
    {
      title: "Phone Alert",
      dataIndex: "phone_alert",
      key: "phone_alert",
      render: (text, record) => (
        <span>
          {record?.phone_alert === true ? <CheckOutlined /> : <CloseOutlined />}
        </span>
      ),

    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (text, record) => (
          <Space>
            <FormOutlined
              className="edit-icon"
              onClick={() => handleEdit()}
            />
          </Space>
        ),
      },

  ];

  return (
    <TajiraCard heading="Basic Setting">
      <TajiraTable
        fetchData={fetchBasicSetting}
        dataSource={aboutList}
        columns={columns}
        title="All Basic Setting Items"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default BlogList;
