/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Image } from "antd";
import { FormOutlined, DeleteOutlined, CheckOutlined, CloseOutlined, ThunderboltOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";
import AddNewButton from "../common/add-button";


import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";


const TeamList = () => {
  const team = new API.Users();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [teamList, setTeamList] = useState([]);

  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchTeamList();
  }, []);

  const fetchTeamList = async (payload) => {
    return getDataManager(team?.getUserList, setLoading, payload).then(
      (x) => {
        if (x?.status) {
          setPagination({
            ...pagination,
            current: payload?.current || pagination?.current,
            pageSize: payload?.pageSize || pagination?.pageSize,
            total: x?.data?.count,
          });
          setTeamList(x?.data);

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
    navigate("/add-users");
  };

  const handleEdit = (id) => {
    navigate(`/edit-users/${id}`);
  };



  const handleDelete = (id) => {
    getDataManager(team?.deleteUsers, setLoading, id).then((x) => {
      if (x.status) {
        fetchTeamList();
        message.success({
          content: "Team member deleted successfully",
          duration: 2,
        });
      } else {
        message.error({ content: x?.message || "Process failed", duration: 2 });
      }
    });
  };

  const fetchUsersVerify = (id) => {
    getDataManager(team?.getUsersActivate, setLoading, id).then((x) => {
      if (x?.status) {
        fetchTeamList();
        message.success({
          content: "User activated successfully",
          duration: 2,
        });


      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };
  const fetchUsersPhoneVerify = (id) => {
    getDataManager(team?.getUsersVerify, setLoading, id).then((x) => {
      if (x?.status) {
        fetchTeamList();
        message.success({
          content: "{Phone verified successfully",
          duration: 2,
        });


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
      title: "Name",
      dataIndex: "name",
      key: "name",

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
        title: "UserName",
        dataIndex: "user_name",
        key: "user_name",
      },
    {
        title: "Plan",
        dataIndex: "current_plan",
        key: "current_plan",
      },
    {
        title: "Payment Status",
        dataIndex: "payment_status",
        key: "payment_status",
        render: (text, record) => (
            <span>
              {record?.is_phone_verified === true ? <CheckOutlined /> : <CloseOutlined />}
            </span>
        )
      },
    {
        title: "Phone Verification",
        dataIndex: "is_phone_verified",
        key: "is_phone_verified",
        render: (text, record) => (
            <span>
              {record?.is_phone_verified === true ? <CheckOutlined /> : <CloseOutlined />}
            </span>
        )
      },
    {
        title: "Email Verification",
        dataIndex: "is_email_verified",
        key: "is_email_verified",
        render: (text, record) => (
            <span>
              {record?.is_email_verified === true ? <CheckOutlined /> : <CloseOutlined />}
            </span>
        )
      },
    {
        title: "Active Status",
        dataIndex: "status",
        key: "status",
        render: (text, record) => (
            <span>
              {record?.status === true ? <CheckOutlined /> : <CloseOutlined />}
            </span>
        )
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
            title="Are you sure to verify phone?"
            onConfirm={() => fetchUsersPhoneVerify(record?._id)}
          >
            <PhoneOutlined  className="edit-icon" />
          </Popconfirm>
          <Popconfirm
            title="Are you sure to activate?"
            onConfirm={() => fetchUsersVerify(record?._id)}
          >
            <ThunderboltOutlined className="edit-icon" />
          </Popconfirm>
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
    <TajiraCard heading="Users" actions={<AddNewButton onAdd={handleAdd} />}>
      <TajiraTable
        fetchData={fetchTeamList}
        dataSource={teamList}
        columns={columns}
        title="All Users"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default TeamList;
