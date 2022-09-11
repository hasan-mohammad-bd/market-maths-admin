/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Image } from "antd";
import { FormOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";
import AddNewButton from "../common/add-button";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";

const StaffList = () => {
  const staff = new API.Staff();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [staffList, setStaffList] = useState([]);

  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async (payload) => {
    return getDataManager(staff?.getStaffList, setLoading, payload).then(
      (x) => {
        if (x?.status) {
          setPagination({
            ...pagination,
            current: payload?.current || pagination?.current,
            pageSize: payload?.pageSize || pagination?.pageSize,
            total: x?.data?.count,
          });
          setStaffList(x?.data);

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
    navigate("/add-staff");
  };

  const handleEdit = (id) => {
    navigate(`/edit-staff/${id}`);
  };

/*   const handleDelete = (id) => {
    getDataManager(staff?.deleteStaff, setLoading, id).then((x) => {
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
  }; */

  const columns = [

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
        title: "Active",
        dataIndex: "is_active",
        key: "is_active",
        render: (text, record) => (
            <span>
              {record?.is_active === true ? <CheckOutlined /> : <CloseOutlined />}
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
{/*           <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record?._id)}
          >
            <DeleteOutlined className="delete-icon" />
          </Popconfirm> */}
        </Space>
      ),
    },
  ];

  return (
    <TajiraCard heading="Staff Members" actions={<AddNewButton onAdd={handleAdd} />}>
      <TajiraTable
        fetchData={fetchStaffList}
        dataSource={staffList}
        columns={columns}
        title="All Staff Members"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default StaffList;
