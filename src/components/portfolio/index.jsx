/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Image } from "antd";
import { FormOutlined, DeleteOutlined, LinkOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";
import AddNewButton from "../common/add-button";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";

const PortfolioList = () => {
  const portfolio = new API.Portfolio();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [portfolioList, setPortfolioList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchPortfolioList();
  }, []);

  const fetchPortfolioList = async (payload) => {
    return getDataManager(
      portfolio?.getPortfolioList,
      setLoading,
      payload
    ).then((x) => {
      if (x?.status) {
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setPortfolioList(x?.data?.portfolio);
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
    navigate("/add-portfolio");
  };

  const handleEdit = (id) => {
    navigate(`/edit-portfolio/${id}`);
  };

  const handleDelete = (id) => {
    getDataManager(portfolio?.deletePortfolio, setLoading, id).then((x) => {
      if (x.status) {
        fetchPortfolioList();
        message.success({
          content: "Portfolio deleted successfully",
          duration: 2,
        });
      } else {
        message.error({ content: x?.message || "Process failed", duration: 2 });
      }
    });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => <Image width={50} src={record?.image} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (_, record) => record?.service?.name,
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },

    {
      title: "PDF Document",
      dataIndex: "pdf",
      key: "pdf",
      render: (_, record) => (
        <a href={record?.pdf} download>
          <LinkOutlined />
        </a>
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
            onClick={() => handleEdit(record?._id)}
          />
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
    <TajiraCard
      heading="Portfolio List"
      actions={<AddNewButton onAdd={handleAdd} />}
    >
      <TajiraTable
        fetchData={fetchPortfolioList}
        dataSource={portfolioList}
        columns={columns}
        title="All Portfolio"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default PortfolioList;
