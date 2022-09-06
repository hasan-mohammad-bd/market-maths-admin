import React from "react";
import { Card } from "antd";

import CardHeader from "../../common/card-header";

import "./styles.scss";

const TajiraCard = ({ heading, children, actions, forForm }) => {
  return (
    <div>
      <CardHeader className="card-header" heading={heading} actions={actions} />
      <section className="main-component-container">
        {forForm ? children : <Card bordered={false}>{children}</Card>}
      </section>
    </div>
  );
};

export default TajiraCard;
