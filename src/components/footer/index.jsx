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
import About from "../../utils/api/About";

const FooterList = () => {
  const footer = new API.Footer();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [aboutList, setAboutList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async (payload) => {
    return getDataManager(footer?.getFooter, setLoading, payload).then((x) => {
      console.log(x);
      if (x?.status) {
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setAboutList([x?.data]);
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
    navigate(`/edit-footer`);
  };





  const columns = [


    {
      title: "Google Map",
      dataIndex: "google_map",
      key: "google_map",

    },
    {
      title: "Footer Text",
      dataIndex: "footer_text",
      key: "footer_text",

    },
    {
      title: "Copy Text",
      dataIndex: "copy_text",
      key: "copy_text",

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
    <TajiraCard heading="Footer">
      <TajiraTable
        fetchData={fetchFooter}
        dataSource={aboutList}
        columns={columns}
        title="All Footer Info"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default FooterList;
