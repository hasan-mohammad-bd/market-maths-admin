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
  const plan = new API.PlanSection();

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
    fetchPlanSection();
  }, []);

  const fetchPlanSection = async (payload) => {
    return getDataManager(plan?.getPlanSection, setLoading, payload).then((x) => {

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
    navigate(`/edit-plan-section`);
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
      title: "Price Title",
      dataIndex: "price_title",
      key: "price_title",


    },
    {
      title: "Price Description",
      dataIndex: "price_description",
      key: "price_description",

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
    <TajiraCard heading="Plan Section">
      <TajiraTable
        fetchData={fetchPlanSection}
        dataSource={aboutList}
        columns={columns}
        title="All Plan Section Text"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default BlogList;
