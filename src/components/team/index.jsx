/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Image, Tag, Tooltip } from "antd";
import { FormOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";
import AddNewButton from "../common/add-button";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";

const BlogList = () => {
  const team = new API.Team();

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
    fetchSliderList();
  }, []);

  const fetchSliderList = async (payload) => {
    return getDataManager(team?.getTeamList, setLoading, payload).then((x) => {

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
    navigate("/add-team");
  };

  const handleEdit = (id) => {
    navigate(`/edit-team/${id}`);
  };

  const handleDelete = (id) => {
    getDataManager(team?.deleteTeam, setLoading, id).then((x) => {
      if (x.status) {
        fetchSliderList();
        message.success({
          content: "Team member deleted successfully",
          duration: 2,
        });
      } else {
        message.error({ content: "Process failed", duration: 2 });
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
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },

    {
      title: "Facebook",
      dataIndex: "facebook",
      key: "facebook",
    },
    {
      title: "Twitter",
      dataIndex: "twitter",
      key: "twitter",
    },
    {
      title: "Linkedin",
      dataIndex: "linkedin",
      key: "linkedin",
    },
    {
      title: "Instagram",
      dataIndex: "instragram",
      key: "instragram",
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
    <TajiraCard heading="Team Member" actions={<AddNewButton onAdd={handleAdd} />}>
      <TajiraTable
        fetchData={fetchSliderList}
        dataSource={blogList}
        columns={columns}
        title="All Team Member"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default BlogList;
