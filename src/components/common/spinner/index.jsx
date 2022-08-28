import React from 'react';
import { Spin } from 'antd';

import './styles.scss';

const Spinner = ({ title }) => {
  return (
    <div className="custom-loader">
      <Spin tip={title || 'Loading...'}></Spin>
    </div>
  );
};

export default Spinner;
