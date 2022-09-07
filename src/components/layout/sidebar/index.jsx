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
  TeamOutlined,
  UsergroupAddOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TajiraLogo from "../../../images/logo-white-removebg-preview.png";
import Logo from "../../../images/onlyLogo.png";

const { Sider } = Layout;

const SiderBar = ({ toggle, collapsed }) => {
  const navigate = useNavigate();

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
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
          icon={<TeamOutlined />}
          onClick={() => navigate("/staff")}
          key="18"
        >
          Staff
        </Menu.Item>
        <Menu.Item
          icon={<UsergroupAddOutlined />}
          onClick={() => navigate("/subscriber-list")}
          key="19"
        >
          Subscriber List
        </Menu.Item>
        <Menu.Item
          icon={<MessageOutlined />}
          onClick={() => navigate("/message-list")}
          key="20"
        >
          Message List
        </Menu.Item>

        <Menu.Item
          icon={<BookOutlined />}
          onClick={() => navigate("/testimonials")}
          key="21"
        >
          Testimonials
        </Menu.Item>

        <Menu.Item
          icon={<ProjectOutlined />}
          onClick={() => navigate("/blog")}
          key="22"
        >
          Blog
        </Menu.Item>
        <Menu.Item
          icon={<ProjectOutlined />}
          onClick={() => navigate("/users")}
          key="30"
        >
          Users
        </Menu.Item>
        <Menu.SubMenu key="31" icon={<NotificationOutlined />} title="Withdraw">
        <Menu.Item
          onClick={() => navigate("/withdraw")}
          key="32"
        >
          Withdraw Method
        </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="23" icon={<NotificationOutlined />} title="Signal">
        <Menu.Item
          onClick={() => navigate("/signal")}
          key="29"
        >
          Signal
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/assets")}
          key="24"
        >
          Assets
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/symbol")}
          key="25"
        >
          Symbol
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/type")}
          key="26"
        >
          Type
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/frame")}
          key="27"
        >
          Frame
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/status")}
          key="28"
        >
          Status
        </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="33" icon={<NotificationOutlined />} title="Manage Website">
        <Menu.Item
          onClick={() => navigate("/logo")}
          key="34"
        >
          Logo
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/about")}
          key="35"
        >
          About
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/footer")}
          key="36"
        >
          Footer
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/social")}
          key="37"
        >
          Social
        </Menu.Item>
        </Menu.SubMenu>
{/*         <Menu.Item
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
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
};

export default SiderBar;
