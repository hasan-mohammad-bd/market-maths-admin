/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Button } from "antd";
import { FormOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";


import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";
import moment from "moment";

const SubscriberList = () => {
  const subscriber = new API.SubscriberList();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [subscriberList, setSubscriberList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });


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

  const fetchSubscriberList = async (payload) => {
    return getDataManager(subscriber?.getSubscriberList, setLoading).then((x) => {
        
      if (x?.status) {
        const organizedData = getOrganizedData(x?.data);

        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setSubscriberList(organizedData);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

/*   const handleActiveStatus = (id) => {
    getDataManager(tag?.editCategory, setLoading, id).then((x) => {
      if (x.status) {
        fetchCategoryList();
        message.success({
          content: "Tag status updated successfully",
          duration: 2,
        });
      } else {
        message.error({ content: "Process failed", duration: 2 });
      }
    });
  }; */

  const handleAdd = () => {
    navigate("/add-subscriber");
  };

  const handleEdit = (id) => {
    navigate(`/edit-subscriber/${id}`);
  };

  const handleDelete = (id) => {
    getDataManager(subscriber?.deleteSubscriber, setLoading, id).then((x) => {
      if (x.status) {
        fetchSubscriberList();
        message.success({
          content: "Subscriber deleted successfully",
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
        title: "Created Date",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text, record) => 
        <span>
          {moment(record?.createdAt).format("MMMM Do YYYY")}
        </span>
  
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
    <TajiraCard heading="Subscriber List" >
      <TajiraTable
        fetchData={fetchSubscriberList}
        dataSource={subscriberList}
        columns={columns}
        title="All Subscribers"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default SubscriberList;
