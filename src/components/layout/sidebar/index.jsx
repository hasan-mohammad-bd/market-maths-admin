import React from "react";
import { Layout, Menu } from "antd";
import {
  ReadOutlined,
  UserOutlined,
  AppstoreOutlined,
  InsuranceOutlined,
  ProjectOutlined,
  BookOutlined,
  SettingFilled,
  SoundOutlined,
  QuestionCircleOutlined,
  DeploymentUnitOutlined,
  MacCommandOutlined,
  FileDoneOutlined,
  NotificationOutlined,
  FileOutlined,
  RadarChartOutlined,
  CodepenOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraLogo from "../../../images/logo-white-removebg-preview.png";
import Logo from "../../../images/onlyLogo.png";

const { Sider } = Layout;

const SiderBar = ({ toggle, collapsed }) => {
  const navigate = useNavigate();

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
      <div className="tajira-logo">
        <img src={collapsed ? Logo : TajiraLogo} alt="" />
      </div>
      <Menu theme="dark" defaultSelectedKeys={["15"]} mode="inline">
        <Menu.Item
          icon={<AppstoreOutlined />}
          onClick={() => navigate("/category")}
          key="15"
        >
          Category
        </Menu.Item>
        <Menu.Item
          icon={<RadarChartOutlined />}
          onClick={() => navigate("/speciality")}
          key="16"
        >
          Specialty
        </Menu.Item>
        <Menu.Item
          icon={<CodepenOutlined />}
          onClick={() => navigate("/plan")}
          key="17"
        >
          Plan
        </Menu.Item>
        <Menu.Item
          icon={<AppstoreOutlined />}
          onClick={() => navigate("/services")}
          key="1"
        >
          Services
        </Menu.Item>
        <Menu.Item
          icon={<NotificationOutlined />}
          onClick={() => navigate("/offers")}
          key="2"
        >
          Offers
        </Menu.Item>
        <Menu.Item
          icon={<MacCommandOutlined />}
          onClick={() => navigate("/portfolio")}
          key="3"
        >
          Portfolio
        </Menu.Item>
        <Menu.Item
          icon={<UserOutlined />}
          onClick={() => navigate("/client")}
          key="4"
        >
          Client
        </Menu.Item>
        <Menu.Item
          icon={<ReadOutlined />}
          onClick={() => navigate("/universities")}
          key="5"
        >
          Universities
        </Menu.Item>
        <Menu.Item
          icon={<DeploymentUnitOutlined />}
          onClick={() => navigate("/Website")}
          key="6"
        >
          Immigration Websites
        </Menu.Item>
        <Menu.Item
          icon={<ProjectOutlined />}
          onClick={() => navigate("/blog")}
          key="7"
        >
          Blog
        </Menu.Item>
        <Menu.Item
          icon={<FileOutlined />}
          onClick={() => navigate("/directory")}
          key="8"
        >
          Directory
        </Menu.Item>
        <Menu.Item
          icon={<InsuranceOutlined />}
          onClick={() => navigate("/tags")}
          key="9"
        >
          Tags
        </Menu.Item>
        <Menu.Item
          icon={<BookOutlined />}
          onClick={() => navigate("/testimonials")}
          key="10"
        >
          Testimonials
        </Menu.Item>
        <Menu.Item
          icon={<QuestionCircleOutlined />}
          onClick={() => navigate("/faq")}
          key="11"
        >
          FAQs
        </Menu.Item>
        <Menu.Item
          icon={<FileDoneOutlined />}
          onClick={() => navigate("/questionarrie")}
          key="12"
        >
          Questionnarie
        </Menu.Item>
        <Menu.Item
          key="13"
          icon={<SoundOutlined />}
          onClick={() => navigate("/contact-us")}
        >
          Contact Us Requests
        </Menu.Item>
        <Menu.Item
          key="14"
          icon={<SettingFilled />}
          onClick={() => navigate("/settings/website-settings")}
        >
          Website Settings
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SiderBar;
