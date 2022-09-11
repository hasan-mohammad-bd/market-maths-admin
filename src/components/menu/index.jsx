/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Image, Tag, Tooltip } from "antd";
import { FormOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";
import AddNewButton from "../common/add-button";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";

const MenuList = () => {
  const menu = new API.Menu();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchMenuList();
  }, []);

  const fetchMenuList = async (payload) => {
    return getDataManager(menu?.getMenuList, setLoading, payload).then((x) => {
      console.log(x);
      if (x?.status) {
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setMenuList(x?.data);
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
    navigate("/add-menu");
  };

  const handleEdit = (id) => {
    navigate(`/edit-menu/${id}`);
  };

  const handleDelete = (id) => {
    getDataManager(menu?.deleteMenu, setLoading, id).then((x) => {
      if (x.status) {
        fetchMenuList();
        message.success({
          content: "Menu item deleted successfully",
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
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
    <TajiraCard heading="Menu List" actions={<AddNewButton onAdd={handleAdd} />}>
      <TajiraTable
        fetchData={fetchMenuList}
        dataSource={menuList}
        columns={columns}
        title="All Menu Items"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default MenuList;
