/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Button } from "antd";
import { FormOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";
import AddNewButton from "../common/add-button";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";
import Plan from "../../utils/api/Plan";

const PlanList = () => {
  const plan = new API.Plan();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [planList, setPlanList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });


  useEffect(() => {
    fetchPlanList();
  }, []);

  const getOrganizedData = (data) => {
    return (data || []).map((d) => {
      return {
        ...d,
        key: d._id,
      };
    });
  };

  const fetchPlanList = async (payload) => {
    return getDataManager(plan?.getPlanList, setLoading).then((x) => {
      if (x?.status) {
        const organizedData = getOrganizedData(x?.data);
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setPlanList(organizedData);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

/*   const handleActiveStatus = (id) => {
    getDataManager(tag?.editCategory, setLoading, id).then((x) => {
      if (x.status) {
        fetchCategoryList();
        message.success({
          content: "Tag status updated successfully",
          duration: 2,
        });
      } else {
        message.error({ content: "Process failed", duration: 2 });
      }
    });
  }; */

  const handleAdd = () => {
    navigate("/add-plan");
  };

  const handleEdit = (id) => {
    navigate(`/edit-plan/${id}`);
  };

  const handleDelete = (id) => {
    getDataManager(plan?.deletePlan, setLoading, id).then((x) => {
      if (x.status) {
        fetchPlanList();
        message.success({
          content: "Plan deleted successfully",
          duration: 2,
        });
      } else {
        message.error({ content: "Process failed", duration: 2 });
      }
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: `price`,
      key: "price",
      render: (text, record) => (
        <span>
            {`${record?.price} USD`}
        </span>
      )
    },

    {
        title: "Support",
        dataIndex: "support",
        key: "support",
    },

    {
        title: "Plan Type",
        dataIndex: `plan_type`,
        key: "plan_type",
        render: (text, record) => (
          <span>
              {record?.plan_type === 1 ? <CheckOutlined /> : <CloseOutlined />}
          </span>
        )
      },



    {
        title: "Price Type",
        dataIndex: `price_type`,
        key: "price_type",
        render: (text, record) => (
          <span>
              {record?.price_type === 1 ? <CheckOutlined /> : <CloseOutlined />}
          </span>
        )
      },

    {
      title: "Dashboard Status",
      dataIndex: "dashboard_status",
      key: "dashboard_status",
      render: (text, record) => (
        <span>
          {record?.dashboard_status === true ? <CheckOutlined /> : <CloseOutlined />}
        </span>
      ),
    },
    {
      title: "Email Status",
      dataIndex: "email_status",
      key: "email_status",
      render: (text, record) => (
        <span>
          {record?.email_status === true ? <CheckOutlined /> : <CloseOutlined />}
        </span>
      ),
    },
    {
      title: "SMS Status",
      dataIndex: "sms_status",
      key: "sms_status",
      render: (text, record) => (
        <span>
          {record?.sms_status === true ? <CheckOutlined /> : <CloseOutlined />}
        </span>
      ),
    },
    {
      title: "Telegram Status",
      dataIndex: "telegram_status",
      key: "telegram_status",
      render: (text, record) => (
        <span>
          {record?.telegram_status === true ? <CheckOutlined /> : <CloseOutlined />}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span>
          {record?.status === true ? <CheckOutlined /> : <CloseOutlined />}
        </span>
      ),
    },

    {
        title: "Duration",
        dataIndex: `duration`,
        key: "duration",
        render: (text, record) => (
          <span>
              {`${record?.duration} Days`}
          </span>
        )
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
    <TajiraCard heading="Plan" actions={<AddNewButton onAdd={handleAdd} />}>
      <TajiraTable
        fetchData={fetchPlanList}
        dataSource={planList}
        columns={columns}
        title="All Plans"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default PlanList;
