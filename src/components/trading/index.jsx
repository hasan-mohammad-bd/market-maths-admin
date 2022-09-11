/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Image, Tag, Tooltip } from "antd";
import { FormOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";


import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";


const TradingList = () => {
  const trading = new API.Trading();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [tradingList, setTradingList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchTrading();
  }, []);

  const fetchTrading = async (payload) => {
    return getDataManager(trading?.getTrading, setLoading, payload).then((x) => {

      if (x?.status) {
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setTradingList([x?.data]);
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
    navigate(`/edit-trading`);
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
      title: "Title",
      dataIndex: "trading_title",
      key: "trading_title",


    },
    {
      title: "Description",
      dataIndex: "trading_description",
      key: "trading_description",

    },
    {
      title: "Trading Script",
      dataIndex: "trading_script",
      key: "trading_script",

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
    <TajiraCard heading="Trading Section">
      <TajiraTable
        fetchData={fetchTrading}
        dataSource={tradingList}
        columns={columns}
        title="All Trading Section Text"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default TradingList;
