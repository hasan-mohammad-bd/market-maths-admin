/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Image, Tag, Tooltip } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";


import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";


const SubscriberSection = () => {
  const subscriber = new API.SubscriberSection();

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
    fetchSubscriber();
  }, []);

  const fetchSubscriber = async (payload) => {
    return getDataManager(subscriber?.getSubscriberSection, setLoading, payload).then((x) => {

      if (x?.status) {
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setSubscriberList([x?.data]);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };



  const handleEdit = () => {
    navigate(`/edit-subscriber-section`);
  };



  const columns = [


    {
      title: "Subscriber Title",
      dataIndex: "subscriber_title",
      key: "subscriber_title",


    },
    {
      title: "Subscriber Description",
      dataIndex: "subscriber_description",
      key: "subscriber_description",

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
    <TajiraCard heading="Subscriber Section">
      <TajiraTable
        fetchData={fetchSubscriber}
        dataSource={subscriberList}
        columns={columns}
        title="All Subscriber Section Text"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default SubscriberSection;
