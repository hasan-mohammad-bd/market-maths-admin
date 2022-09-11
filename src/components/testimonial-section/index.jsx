/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";


import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";


const TestimonialSection = () => {
  const testimonial = new API.TestimonialSection();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [testimonialList, setTestimonialList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchTestimonial();
  }, []);

  const fetchTestimonial = async (payload) => {
    return getDataManager(testimonial?.getTestimonialSection, setLoading, payload).then((x) => {

      if (x?.status) {
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setTestimonialList([x?.data]);
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
    navigate(`/edit-testimonial-section`);
  };



  const columns = [


    {
      title: "Testimonial Title",
      dataIndex: "testimonial_title",
      key: "testimonial_title",


    },
    {
      title: "Testimonial Description",
      dataIndex: "testimonial_description",
      key: "testimonial_description",

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
    <TajiraCard heading="Testimonial Section">
      <TajiraTable
        fetchData={fetchTestimonial}
        dataSource={testimonialList}
        columns={columns}
        title="All Testimonial Section Text"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default TestimonialSection;
