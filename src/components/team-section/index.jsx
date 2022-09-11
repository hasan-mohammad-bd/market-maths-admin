/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Space} from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraTable from "../common/table";
import TajiraCard from "../common/tajira-card";


import API from "../../utils/api";
import { getDataManager, getErrorMessage } from "../../utils/helper.functions";


const TeamSection = () => {
  const team = new API.TeamSection();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 50,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 25, 50, 100],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async (payload) => {
    return getDataManager(team?.getTeamSection, setLoading, payload).then((x) => {

      if (x?.status) {
        setPagination({
          ...pagination,
          current: payload?.current || pagination?.current,
          pageSize: payload?.pageSize || pagination?.pageSize,
          total: x?.data?.count,
        });
        setTeamList([x?.data]);
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
    navigate(`/edit-team-section`);
  };


  const columns = [


    {
      title: "Blog Title",
      dataIndex: "team_title",
      key: "team_title",


    },
    {
      title: "Team Description",
      dataIndex: "team_description",
      key: "team_description",

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
    <TajiraCard heading="Team Section ">
      <TajiraTable
        fetchData={fetchTeam}
        dataSource={teamList}
        columns={columns}
        title="All Team Section Text"
        loading={loading}
        pagination={pagination}
        hideSearch={true}
        setPagination={(p) => setPagination(p)}
      />
    </TajiraCard>
  );
};

export default TeamSection;
