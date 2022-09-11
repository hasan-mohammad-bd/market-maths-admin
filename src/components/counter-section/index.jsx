/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Image} from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";

const CounterSection = () => {
  const counter = new API.CounterSection();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [counterList, setCounterList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchCounter();
  }, []);

  const fetchCounter = async (payload) => {
    return getDataManager(counter?.getCounterSection, setLoading, payload).then(
      (x) => {
        if (x?.status) {
          setPagination({
            ...pagination,
            current: payload?.current || pagination?.current,
            pageSize: payload?.pageSize || pagination?.pageSize,
            total: x?.data?.count,
          });
          setCounterList([x?.data]);
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
    navigate(`/edit-counter-section`);
  };

  const columns = [
    {
      title: "Counter Image",
      dataIndex: "counter_image",
      key: "counter_image",
      render: (_, record) => <Image width={50} src={record?.counter_image} />,
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
    <TajiraCard heading="Counter Section ">
      <TajiraTable
        fetchData={fetchCounter}
        dataSource={counterList}
        columns={columns}
        title="All Counter Section Text"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default CounterSection;
