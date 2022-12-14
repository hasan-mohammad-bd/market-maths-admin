/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Button } from "antd";
import { FormOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";
import AddNewButton from "../common/add-button";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";
import moment from "moment";

const MessageList = () => {
  const messages = new API.MessageList();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });


  useEffect(() => {
    fetchMessageList();
  }, []);

  const getOrganizedData = (data) => {
    return (data || []).map((d) => {
      return {
        ...d,
        key: d._id,
      };
    });
  };

  const fetchMessageList = async (payload) => {
    return getDataManager(messages?.getMessageList, setLoading).then((x) => {
      if (x?.status) {
        const organizedData = getOrganizedData(x?.data);
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setMessageList(organizedData);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };



  const handleAdd = () => {
    navigate("/add-message-list");
  };

/*   const handleEdit = (id) => {
    navigate(`/edit-message-list/${id}`);
  }; */

  const handleDelete = (id) => {
    getDataManager(messages?.deleteMessage, setLoading, id).then((x) => {
      if (x.status) {
        fetchMessageList();
        message.success({
          content: "Message deleted successfully",
          duration: 2,
        });
      } else {
        message.error({ content: "Process failed", duration: 2 });
      }
    });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
        title: "Created Date",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text, record) => 
        <span>
          {moment(record?.createdAt).format("MMMM Do YYYY")}
        </span>
  
      },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span>
          {record?.status === true ? <CheckOutlined /> : <CloseOutlined />}
        </span>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space>
{/*           <FormOutlined
            className="edit-icon"
            onClick={() => handleEdit(record?._id)}
          /> */}
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record?._id)}
          >
            <DeleteOutlined className="delete-icon" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <TajiraCard heading="Messages" actions={<AddNewButton onAdd={handleAdd} />}>
      <TajiraTable
        fetchData={fetchMessageList}
        dataSource={messageList}
        columns={columns}
        title="All Messages"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default MessageList;
