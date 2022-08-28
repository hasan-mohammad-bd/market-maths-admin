/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message, Row, Col, Card, Space } from "antd";
import { useParams } from "react-router-dom";

import Spinner from "../../common/spinner";
import TajiraCard from "../../common/tajira-card";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";

import "./styles.scss";

const QuestionareDetails = () => {
  const question = new API.Questionnaire();

  const params = useParams();
  const { id } = params;

  const [loading, setLoading] = useState(false);
  const [questDetails, setQuestDetails] = useState([]);

  useEffect(() => {
    if (id) {
      fetchQuestionaireDetails();
    }
  }, [id]);

  const fetchQuestionaireDetails = () => {
    getDataManager(question?.getQuestionnaireDetails, setLoading, id).then(
      (x) => {
        if (x?.status) {
          setQuestDetails(x?.data);
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

  return (
    <TajiraCard heading="Questionare Details">
      {loading && <Spinner />}
      <Card bordered={false} className="profile-details-card">
        <div className="body">
          <Card title="Personal details">
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Full Name</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.fullName}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Email</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.email}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Phone</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.phone}
              </Col>
            </Row>
          </Card>
          <br />
          <Card title="Spouse details">
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Full Name</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.spouse?.fullName}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Email</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.spouse?.email}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Phone</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.spouse?.phone}
              </Col>
            </Row>
          </Card>
          <br />
          <Card title="Service">
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>ID</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.service?._id}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Name</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.service?.name}
              </Col>
            </Row>
          </Card>
          <br />
          <Card title="English Skills">
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Reading</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.englishSkill?.reading}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Writing</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.englishSkill?.writing}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Speaking</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.englishSkill?.speaking}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Listening</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.englishSkill?.listening}
              </Col>
            </Row>
          </Card>
          <br />
          <Card title="French Skills">
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Reading</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.frenchSkill?.reading}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Writing</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.frenchSkill?.writing}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Speaking</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.frenchSkill?.speaking}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Listening</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.frenchSkill?.listening}
              </Col>
            </Row>
          </Card>
          <br />
          <Card title="Spouse English Skills">
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Reading</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.spouseEnglishSkill?.reading}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Writing</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.spouseEnglishSkill?.writing}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Speaking</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.spouseEnglishSkill?.speaking}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Listening</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.spouseEnglishSkill?.listening}
              </Col>
            </Row>
          </Card>
          <br />
          <Card title="Spouse French Skills">
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Reading</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.spouseFrenchSkill?.reading}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Writing</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.spouseFrenchSkill?.writing}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Speaking</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.spouseFrenchSkill?.speaking}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Listening</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.spouseFrenchSkill?.listening}
              </Col>
            </Row>
          </Card>
          <br />
          <Card title="IELTS Score">
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Reading</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.IELTSScore?.reading}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Writing</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.IELTSScore?.writing}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Speaking</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.IELTSScore?.speaking}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Listening</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.IELTSScore?.listening}
              </Col>
            </Row>
          </Card>
          <br />
          <Card title="Spouse IELTS Score">
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Reading</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.spouseIELTSScore?.reading}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Writing</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.spouseIELTSScore?.writing}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Speaking</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.spouseIELTSScore?.speaking}
              </Col>
            </Row>
            <Row className="data-row">
              <Col span={6} className="label">
                <Space size={15}>Listening</Space>
              </Col>
              <Col span={18} className="value">
                {questDetails?.spouseIELTSScore?.listening}
              </Col>
            </Row>
          </Card>
        </div>
      </Card>
    </TajiraCard>
  );
};

export default QuestionareDetails;
