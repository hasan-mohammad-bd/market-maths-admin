/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Image, Tag, Tooltip } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";


import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";


const GoogleAnalyticList = () => {
  const googleAnalytic = new API.GoogleAnalytic();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [googleAnalyticList, setGoogleAnalyticList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchGoogleAnalytic();
  }, []);

  const fetchGoogleAnalytic = async (payload) => {
    return getDataManager(googleAnalytic?.getGoogleAnalytic, setLoading, payload).then((x) => {

      if (x?.status) {
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setGoogleAnalyticList([x?.data]);
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
    navigate(`/edit-google-analytic`);
  };


  const columns = [


    {
      title: "Google Analytic",
      dataIndex: "google_analytic",
      key: "google_analytic",

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
    <TajiraCard heading="Google Analytic Setting">
      <TajiraTable
        fetchData={fetchGoogleAnalytic}
        dataSource={googleAnalyticList}
        columns={columns}
        title="All Google Analytic Setting"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default GoogleAnalyticList;
