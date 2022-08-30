/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Image, Tooltip } from "antd";
import {
  FormOutlined,
  DeleteOutlined,
  LinkOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";
import AddNewButton from "../common/add-button";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";

const SpecialityList = () => {
  const services = new API.Speciality();

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
    fetchSpecialityList();
  }, []);

  const getOrganizedData = (data) => {
    return (data || []).map((d) => {
      return {
        ...d,
        key: d.id,
      };
    });
  };

  const fetchSpecialityList = async (payload) => {
    return getDataManager(services?.getSpecialityList, setLoading, payload).then(
      (x) => {
        if (x?.status) {
            console.log(x);
          const organizedData = getOrganizedData(x?.data);
          setPagination({
            ...pagination,
            current: payload?.current || pagination?.current,
            pageSize: payload?.pageSize || pagination?.pageSize,
            total: x?.data?.count,
          });
          setServicesList(organizedData);
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

  const handleAdd = () => {
    navigate("/add-speciality");
  };

  const handleEdit = (id) => {
    navigate(`/edit-speciality/${id}`);
  };

  const handleDelete = (id) => {
    getDataManager(services?.deleteSpeciality, setLoading, id).then((x) => {
      if (x.status) {
        fetchSpecialityList();
        message.success({
          content: "Service deleted successfully",
          duration: 2,
        });
      } else {
        message.error({ content: "Process failed", duration: 2 });
      }
    });
  };

/*   const handleSubService = (id) => {
    navigate(`/sub-service/${id}`);
  }; */

  const columns = [

    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (_, record) => <Image width={50} src={record?.icon} />,
    },
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
    <TajiraCard heading="Services" actions={<AddNewButton onAdd={handleAdd} />}>
      <TajiraTable
        fetchData={fetchSpecialityList}
        dataSource={servicesList}
        columns={columns}
        title="All Services"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default SpecialityList;
