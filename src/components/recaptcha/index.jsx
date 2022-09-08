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
import About from "../../utils/api/About";

const BlogList = () => {
  const recaptcha = new API.Recaptcha();

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
    fetchRecaptcha();
  }, []);

  const fetchRecaptcha= async (payload) => {
    return getDataManager(recaptcha?.getRecaptcha, setLoading, payload).then((x) => {

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


/*   const handleAdd = () => {
    navigate("/add-logo");
  };
 */
  const handleEdit = () => {
    navigate(`/edit-recaptcha`);
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
      title: "Captcha Status",
      dataIndex: "captcha_status",
      key: "captcha_status",
      render: (text, record) => (
        <span>
          {record?.captcha_status === true ? <CheckOutlined /> : <CloseOutlined />}
        </span>
      ),

    },
    {
      title: "Capthcha Secret",
      dataIndex: "captcha_secret",
      key: "captcha_secret",

    },

    {
      title: "Capthcha Site",
      dataIndex: "captcha_site",
      key: "captcha_site",

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
    <TajiraCard heading="Recapthcha Setting">
      <TajiraTable
        fetchData={fetchRecaptcha}
        dataSource={aboutList}
        columns={columns}
        title="All Recaptcha Setting"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default BlogList;
