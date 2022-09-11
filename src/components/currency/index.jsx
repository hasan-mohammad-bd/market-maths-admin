/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space} from "antd";
import { FormOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";


import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";


const CurrencyList = () => {
  const currency = new API.Currency();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [currencyList, setCurrencyList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchCurrency();
  }, []);

  const fetchCurrency = async (payload) => {
    return getDataManager(currency?.getCurrency, setLoading, payload).then((x) => {

      if (x?.status) {
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setCurrencyList([x?.data]);
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
    navigate(`/edit-currency`);
  };



  const columns = [


    {
      title: "Title",
      dataIndex: "currency_title",
      key: "currency_title",


    },
    {
      title: "Description",
      dataIndex: "currency_description",
      key: "currency_description",

    },
    {
      title: "currency Live",
      dataIndex: "currency_live",
      key: "currency_live",

    },
    {
      title: "currency cal",
      dataIndex: "currency_cal",
      key: "currency_live",

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
    <TajiraCard heading="Currency Section">
      <TajiraTable
        fetchData={fetchCurrency}
        dataSource={currencyList}
        columns={columns}
        title="All currency Setting"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default CurrencyList;
