/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import TajiraTable from "../../common/table";
import TajiraCard from "../../common/tajira-card";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";
import moment from "moment";

const Comments = () => {
  const signal = new API.Signal();

  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(false);
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    if (id) {
      fetchCommentsList();
    }
  }, [id]);

  const fetchCommentsList = async () => {
    return getDataManager(signal?.getSignalComments, setLoading, id).then((x) => {
        console.log(x);
      if (x?.status) {
        setCommentsList(x?.data);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

/*   const handleDelete = (id) => {
    getDataManager(signal?.deleteComment, setLoading, id).then((x) => {
      if (x.status) {
        fetchCommentsList();
        message.success({
          content: "comment deleted successfully",
          duration: 2,
        });
      } else {
        message.error({ content: "Process failed", duration: 2 });
      }
    });
  }; */

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => 
      <span>
        {moment(record?.createdAt).format("MMMM Do YYYY")}
      </span>
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
    },
/*     {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete?"
          onConfirm={() => handleDelete(record?._id)}
        >
          <DeleteOutlined className="delete-icon" />
        </Popconfirm>
      ),
    }, */
  ];

  return (
    <TajiraCard heading="Comments">
      <TajiraTable
        fetchData={fetchCommentsList}
        dataSource={commentsList}
        columns={columns}
        title="All Comments"
        loading={loading}
        hideSearch={true}
      />
    </TajiraCard>
  );
};

export default Comments;
