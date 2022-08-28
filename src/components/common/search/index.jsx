import React from "react";
import { Input } from "antd";

import "./styles.scss";

const Search = ({ handleSearch }) => {
  return (
    <div className="search-field">
      <Input
        placeholder="Search..."
        allowClear
        style={{ width: "200px" }}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
