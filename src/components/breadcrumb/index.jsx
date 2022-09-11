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


const BreadcrumbList = () => {
  const breadcrumb = new API.Breadcrumb();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [breadcrumbList, setBreadcrumbList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchBreadcrumbList();
  }, []);

  const fetchBreadcrumbList = async (payload) => {
    return getDataManager(breadcrumb?.getBreadcrumb, setLoading, payload).then((x) => {
      console.log(x);
      if (x?.status) {
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setBreadcrumbList([x?.data]);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };



  const handleEdit = () => {
    navigate(`/edit-breadcrumb`);
  };





  const columns = [

    {
        title: "Image",
        dataIndex: "breadcrumb",
        key: "breadcrumb",
        render: (_, record) => <Image width={50} src={record?.breadcrumb} />,
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
    <TajiraCard heading="Breadcrumb">
      <TajiraTable
        fetchData={fetchBreadcrumbList}
        dataSource={breadcrumbList}
        columns={columns}
        title="All Breadcrumb Info"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default BreadcrumbList;
