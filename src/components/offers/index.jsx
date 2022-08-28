/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space, Popconfirm, Image, Tooltip } from "antd";
import { FormOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";
import AddNewButton from "../common/add-button";

import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";

const OffersList = () => {
  const offers = new API.Offers();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [offersList, setOffersList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchOffersList();
  }, []);

  const getOrganizedData = (data) => {
    return (data || []).map((d) => {
      return {
        ...d,
        key: d.id,
      };
    });
  };

  const fetchOffersList = async (payload) => {
    return getDataManager(offers?.getOffersList, setLoading, payload).then(
      (x) => {
        if (x?.status) {
          const organizedData = getOrganizedData(x?.data?.offers);
          setPagination({
            ...pagination,
            current: payload?.current || pagination?.current,
            pageSize: payload?.pageSize || pagination?.pageSize,
            total: x?.data?.count,
          });
          setOffersList(organizedData);
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
    navigate("/add-offer");
  };

  const handleEdit = (id) => {
    navigate(`/edit-offer/${id}`);
  };

  const handleDelete = (id) => {
    getDataManager(offers?.deleteOffer, setLoading, id).then((x) => {
      if (x.status) {
        fetchOffersList();
        message.success({
          content: "Offer deleted successfully",
          duration: 2,
        });
      } else {
        message.error({ content: "Process failed", duration: 2 });
      }
    });
  };

  const columns = [
    {
      title: "Banner",
      dataIndex: "banner",
      key: "banner",
      render: (_, record) => <Image width={50} src={record?.banner} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Introduction",
      dataIndex: "introduction",
      key: "introduction",
    },
    // {
    //   title: "Expire Date",
    //   dataIndex: "expireDate",
    //   key: "expireDate",
    //   render: (_, record) => moment(record?.expireDate).format("YYYY-MM-DD"),
    // },
    {
      title: "Video",
      dataIndex: "video",
      key: "video",
      render: (_, record) => (
        <a href={record?.video} alt="" target="_blank" rel="noreferrer">
          {record?.video}
        </a>
      ),
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
    <TajiraCard heading="Offers" actions={<AddNewButton onAdd={handleAdd} />}>
      <TajiraTable
        fetchData={fetchOffersList}
        dataSource={offersList}
        columns={columns}
        title="All Offers"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default OffersList;
