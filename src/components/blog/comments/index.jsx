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

const Comments = () => {
  const blog = new API.Blog();

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
    return getDataManager(blog?.getBlogDetails, setLoading, id).then((x) => {
      if (x?.status) {
        setCommentsList(x?.data?.comments);
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const handleDelete = (id) => {
    getDataManager(blog?.deleteComment, setLoading, id).then((x) => {
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
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
    },
    {
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
    },
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
