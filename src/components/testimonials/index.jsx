/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Image } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";
import AddNewButton from "../common/add-button";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";

const TestimonialList = () => {
  const testimonial = new API.Testimonials();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchTestimonialsList();
  }, []);

  const fetchTestimonialsList = async (payload) => {
    return getDataManager(
      testimonial?.getTestimonialsList,
      setLoading,
      payload
    ).then((x) => {
      if (x?.status) {
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setServicesList(x?.data);
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
    navigate("/add-testimonial");
  };

  const handleEdit = (id) => {
    navigate(`/edit-testimonial/${id}`);
  };

  const handleDelete = (id) => {
    getDataManager(testimonial?.deleteTestimonial, setLoading, id).then((x) => {
      if (x.status) {
        fetchTestimonialsList();
        message.success({
          content: "Testimonial deleted successfully",
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
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (_, record) => parse(record?.message || ""),
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
    <TajiraCard
      heading="Testimonial"
      actions={<AddNewButton onAdd={handleAdd} />}
    >
      <TajiraTable
        fetchData={fetchTestimonialsList}
        dataSource={servicesList}
        columns={columns}
        title="All Testimonials"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default TestimonialList;
