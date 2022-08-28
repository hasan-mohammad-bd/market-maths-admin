/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Image } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";
import AddNewButton from "../common/add-button";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";

const WebsiteList = () => {
  const university = new API.University();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [websiteList, setWebsiteList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchWebsiteList();
  }, []);

  const getOrganizedData = (data) => {
    return (data || []).map((d) => {
      return {
        ...d,
        key: d._id,
      };
    });
  };

  const fetchWebsiteList = async (payload) => {
    return getDataManager(university?.getWebsiteList, setLoading, payload).then(
      (x) => {
        if (x?.status) {
          const organizedData = getOrganizedData(x?.data?.universities);
          setPagination({
            ...pagination,
            current: payload?.current || pagination?.current,
            pageSize: payload?.pageSize || pagination?.pageSize,
            total: x?.data?.count,
          });
          setWebsiteList(organizedData);
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

  const handleAdd = () => {
    navigate("/add-website");
  };

  const handleEdit = (id) => {
    navigate(`/edit-website/${id}`);
  };

  const handleDelete = (id) => {
    getDataManager(university?.deleteUniversity, setLoading, id).then((x) => {
      if (x.status) {
        fetchWebsiteList();
        message.success({
          content: "Website deleted successfully",
          duration: 2,
        });
      } else {
        message.error({ content: "Process failed", duration: 2 });
      }
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Introduction",
    //   dataIndex: "introduction",
    //   key: "introduction",
    // },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "Video",
      dataIndex: "video",
      key: "video",
      render: (_, record) => (
        <a href={record?.video} alt="" target="_blank" rel="noreferrer">
          {record?.video}
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
    <TajiraCard heading="Website" actions={<AddNewButton onAdd={handleAdd} />}>
      <TajiraTable
        fetchData={fetchWebsiteList}
        dataSource={websiteList}
        columns={columns}
        title="All Websites"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default WebsiteList;
