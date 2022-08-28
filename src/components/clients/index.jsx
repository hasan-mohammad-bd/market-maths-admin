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

const ClientList = () => {
  const client = new API.Clients();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [clientList, setClientList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchClientList();
  }, []);

  const fetchClientList = async (payload) => {
    return getDataManager(client?.getClientsList, setLoading, payload).then(
      (x) => {
        if (x?.status) {
          setPagination({
            ...pagination,
            current: payload?.current || pagination?.current,
            pageSize: payload?.pageSize || pagination?.pageSize,
            total: x?.data?.count,
          });
          setClientList(x?.data?.clients);
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
    navigate("/add-client");
  };

  const handleEdit = (id) => {
    navigate(`/edit-client/${id}`);
  };

  const handleDelete = (id) => {
    getDataManager(client?.deleteClient, setLoading, id).then((x) => {
      if (x.status) {
        fetchClientList();
        message.success({
          content: "Client deleted successfully",
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
    // {
    //   title: "Service",
    //   dataIndex: "services",
    //   key: "services",
    // },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
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
    <TajiraCard heading="Clients" actions={<AddNewButton onAdd={handleAdd} />}>
      <TajiraTable
        fetchData={fetchClientList}
        dataSource={clientList}
        columns={columns}
        title="All Clients"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default ClientList;
