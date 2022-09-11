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

const LogoList = () => {
  const logo = new API.TheLogo();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [logoList, setLogoList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchLogoList();
  }, []);

  const fetchLogoList = async (payload) => {
    return getDataManager(logo?.getTheLogo, setLoading, payload).then((x) => {
      console.log(x);
      if (x?.status) {
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setLogoList([x?.data]);
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
    navigate("/add-logo");
  };

  const handleEdit = () => {
    navigate(`/edit-logo`);
  };

/*   const handleDelete = (id) => {
    getDataManager(blog?.deleteBlog, setLoading, id).then((x) => {
      if (x.status) {
        fetchBlogList();
        message.success({
          content: "blog deleted successfully",
          duration: 2,
        });
      } else {
        message.error({ content: "Process failed", duration: 2 });
      }
    });
  }; */



  const columns = [
    {
      title: "logo 1",
      dataIndex: "logo",
      key: "logo",
      render: (_, record) => <Image width={50} src={record?.logo} />,
    },
    {
      title: "logo 2",
      dataIndex: "logo2",
      key: "logo2",
      render: (_, record) => <Image width={50} src={record?.logo2} />,
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
    <TajiraCard heading="Logo">
      <TajiraTable
        fetchData={fetchLogoList}
        dataSource={logoList}
        columns={columns}
        title="All Logos"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default LogoList;
