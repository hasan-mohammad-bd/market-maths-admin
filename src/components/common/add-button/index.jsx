import React from "react";
import { Button, Space } from "antd";

import addNewIcon from "../../../images/expand-all.png";

import "./styles.scss";

const AddNewButton = ({ onAdd }) => {
  return (
    <Button onClick={onAdd} type="primary" className="add-new-btn">
      <Space>
        <img src={addNewIcon} alt="" />
        Add New
      </Space>
    </Button>
  );
};

export default AddNewButton;
