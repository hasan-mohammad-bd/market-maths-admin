/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Image } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";

const AboutSectionList = () => {
  const about = new API.AboutSection();

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
    fetchAboutSection();
  }, []);

  const fetchAboutSection = async (payload) => {
    return getDataManager(about?.getAboutSection, setLoading, payload).then(
      (x) => {
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
      }
    );
  };

  const handleEdit = () => {
    navigate(`/edit-about-section`);
  };

  const columns = [
    {
      title: "About Image",
      dataIndex: "about_image",
      key: "about_image",
      render: (_, record) => <Image width={50} src={record?.about_image} />,
    },

    {
      title: "About Title",
      dataIndex: "about_title",
      key: "about_title",
    },
    {
      title: "About Description",
      dataIndex: "about_description",
      key: "about_description",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space>
          <FormOutlined className="edit-icon" onClick={() => handleEdit()} />
        </Space>
      ),
    },
  ];

  return (
    <TajiraCard heading="About Section">
      <TajiraTable
        fetchData={fetchAboutSection}
        dataSource={aboutList}
        columns={columns}
        title="About Section Text"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default AboutSectionList;
