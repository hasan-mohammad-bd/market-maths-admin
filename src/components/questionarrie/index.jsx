/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Button, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";

const Questionarrie = () => {
  const question = new API.Questionnaire();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchQuestionList();
  }, []);

  const getOrganizedData = (data) => {
    return (data || []).map((d) => {
      return {
        ...d,
        key: d._id,
      };
    });
  };
  const handleViewDetails = (id) => {
    navigate(`/questionarrie-details/${id}`);
  };
  const fetchQuestionList = async (payload) => {
    return getDataManager(
      question?.getQuestionnaireList,
      setLoading,
      payload
    ).then((x) => {
      if (x?.status) {
        const organizedData = getOrganizedData(x?.data?.questionnaires);
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setQuestionList(organizedData);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },

    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },

    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (_, record) => record.service.name,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space>
          <Tooltip title="View Questionarie Details" placement="top">
            <EyeOutlined
              className="view-icon"
              onClick={() => handleViewDetails(record?._id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <TajiraCard heading="Questionnaire ">
      <TajiraTable
        fetchData={fetchQuestionList}
        dataSource={questionList}
        columns={columns}
        title="Questionnaire"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default Questionarrie;
