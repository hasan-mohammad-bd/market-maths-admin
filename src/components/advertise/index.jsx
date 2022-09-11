/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space } from "antd"; 
import { FormOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";


import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";


const AdvertiseList = () => {
  const advertise = new API.Advertise();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [advertiseList, setAdvertiseList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchAdvertise();
  }, []);

  const fetchAdvertise = async (payload) => {
    return getDataManager(advertise?.getAdvertise, setLoading, payload).then((x) => {

      if (x?.status) {
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setAdvertiseList([x?.data]);
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
    navigate(`/edit-advertise`);
  };


  const columns = [


    {
      title: "Advertise Title",
      dataIndex: "advertise_title",
      key: "advertise_title",


    },
    {
      title: "Advertise Description",
      dataIndex: "advertise_description",
      key: "advertise_description",

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
    <TajiraCard heading="Advertise Section ">
      <TajiraTable
        fetchData={fetchAdvertise}
        dataSource={advertiseList}
        columns={columns}
        title="All Advertise Section "
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default AdvertiseList;
