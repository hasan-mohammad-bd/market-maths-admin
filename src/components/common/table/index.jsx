/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Table, Row, Col } from "antd";

import Search from "../search";

import "./styles.scss";

const tableTitleStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "2px solid #f5f6fa",
  paddingBottom: "10px",
  fontWeight: 500,
};

const TajiraTable = ({
  fetchData,
  dataSource,
  pagination,
  setPagination,
  columns,
  title,
  loading,
  hideSearch,
}) => {
  const [timer, setTimer] = useState(null);

  const handleSearch = (value) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        fetchData({ name: value });
      }, 500)
    );
  };

  const handleTableChange = (pagination) => {
    const offset = (pagination?.current - 1) * pagination?.pageSize;
    const limit = pagination?.pageSize;
    fetchData({
      offset,
      limit,
      current: pagination?.current,
      pageSize: pagination?.pageSize,
    });
    setPagination(pagination);
  };

  return (
    <Row gutter={[0, 15]}>
      <Col span={24} style={tableTitleStyle}>
        <div className="tajira-table-title">{title}</div>
        {!hideSearch && <Search handleSearch={handleSearch} />}
      </Col>
      <Col span={24}>
        <Table
          bordered
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </Col>
    </Row>
  );
};

export default TajiraTable;
