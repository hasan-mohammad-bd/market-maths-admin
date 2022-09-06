/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Image, Tag, Tooltip } from "antd";
import { FormOutlined, DeleteOutlined, EyeOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";
import AddNewButton from "../common/add-button";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";
import moment from "moment";

const BlogList = () => {
  const blog = new API.Signal();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchBlogList();
  }, []);

  const fetchBlogList = async (payload) => {
    return getDataManager(blog?.getSignalList, setLoading, payload).then((x) => {
      console.log(x);
      if (x?.status) {
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setBlogList(x?.data);
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
    navigate("/add-signal");
  };

  const handleEdit = (id) => {
    navigate(`/edit-signal/${id}`);
  };

  const handleDelete = (id) => {
    getDataManager(blog?.deleteSignal, setLoading, id).then((x) => {
      if (x.status) {
        fetchBlogList();
        message.success({
          content: "Signal deleted successfully",
          duration: 2,
        });
      } else {
        message.error({ content: "Process failed", duration: 2 });
      }
    });
  };

  const handleViewComments = (id) => {
    navigate(`/signal-comments/${id}`);
  };
  const handleViewReview = (id) => {
    navigate(`/review/${id}`);
  };

  const columns = [
/*     {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => <Image width={50} src={record?.image} />,
    }, */
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Posted By",
      dataIndex: "post_by",
      key: "post_by",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => 
      <span>
        {moment(record?.createdAt).format("MMMM Do YYYY")}
      </span>
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
      title: "Status",
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
          <Tooltip title="View comments" placement="top">
            <EyeOutlined
              className="view-icon"
              onClick={() => handleViewComments(record?._id)}
            />
          </Tooltip>
          <Tooltip title="View Review" placement="top">
            <EyeOutlined
              className="view-icon"
              onClick={() => handleViewReview(record?._id)}
            />
          </Tooltip>

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
    <TajiraCard heading="Signal" actions={<AddNewButton onAdd={handleAdd} />}>
      <TajiraTable
        fetchData={fetchBlogList}
        dataSource={blogList}
        columns={columns}
        title="All Signal"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default BlogList;
