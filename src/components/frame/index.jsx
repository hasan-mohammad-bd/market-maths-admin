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

const FrameList = () => {
  const frame = new API.Frame();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });


  useEffect(() => {
    fetchFrameList();
  }, []);

  const getOrganizedData = (data) => {
    return (data || []).map((d) => {
      return {
        ...d,
        key: d._id,
      };
    });
  };

  const fetchFrameList = async (payload) => {
    return getDataManager(frame?.getFrameList, setLoading).then((x) => {
      if (x?.status) {
        const organizedData = getOrganizedData(x?.data);
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setCategoryList(organizedData);
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
    navigate("/add-frame");
  };

  const handleEdit = (id) => {
    navigate(`/edit-frame/${id}`);
  };

  const handleDelete = (id) => {
    getDataManager(frame?.deleteFrame, setLoading, id).then((x) => {
      if (x.status) {
        fetchFrameList();
        message.success({
          content: "Frame deleted successfully",
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
    <TajiraCard heading="Frame" actions={<AddNewButton onAdd={handleAdd} />}>
      <TajiraTable
        fetchData={fetchFrameList}
        dataSource={categoryList}
        columns={columns}
        title="All Frames"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default FrameList;
