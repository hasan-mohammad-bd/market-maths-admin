/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Form, Input, Button, message, Row, Col, Card, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Spinner from "../../common/spinner";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";
import { setUserData } from "../../../utils/redux/actions";

import authImg from "../../../images/logo-white-removebg-preview.png";
import logo from "../../../images/logo-white-removebg-preview.png";

import "./styles.scss";

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();

  const auth = new API.Auth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    window.location.reload(false);
  };

  const onLogin = (payload) => {
    getDataManager(auth?.loginUser, setLoading, payload).then((x) => {
      if (x?.status) {
        if (x?.data?.admin) {
          if (x?.data?.token) {
            message.success({
              content: "You have successfully logged in",
              duration: 3,
            });
            localStorage.setItem(
              "fado-admin-panel-user-data",
              JSON.stringify({ ...x?.data?.admin, token: x?.data?.token })
            );
            dispatch(setUserData({ ...x?.data?.admin, token: x?.data?.token }));
            // navigate("/dashboard");
            handleRefresh();
          }
        } else {
          message.warning({
            content: "You are not allowed to login to admin panel",
            duration: 3,
          });
        }
      } else {
        const error = getErrorMessage(x?.errors);
        dispatch(setUserData({}));
        localStorage.removeItem("fado-admin-panel-user-data");
        message.error({
          content: x?.message || error || "Error ocurred while logging in",
          duration: 3,
        });
      }
    });
  };

  const handleForgotPassword = () => {
    navigate("/reset-password");
  };

  return (
    <Row>
      <Col span={12} className="login-right-section">
        <img src={authImg} alt="" />
        <div className="main-tagline">
          Welcome to dashboard
        </div>
        <div className="sub-tagline">Manage all your system in one place</div>
      </Col>
      <Col span={12} className="login-left-section">
        <Card className="login-card" bordered={false}>
          {loading && <Spinner />}
          <div className="logo-container">
            <img src={logo} alt="" className="logo" />
          </div>
          <Title level={4} className="login-title">
            Sign In
          </Title>
          <Form form={form} onFinish={onLogin} scrollToFirstError>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter email",
                },
                {
                  type: "email",
                  message: "Please enter valid email",
                },
              ]}
            >
              <Input placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter password",
                },
              ]}
              className="password-field"
            >
              <Input.Password
                placeholder="Password"
                visible={true}
                size="large"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <div className="forgot-password-btn-container">
              <Button
                type="link"
                onClick={handleForgotPassword}
                style={{ padding: 0 }}
              >
                Forgot Password ?
              </Button>
            </div>
            <Form.Item>
              <Button htmlType="submit" size="large">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
