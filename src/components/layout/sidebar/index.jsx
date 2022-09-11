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
  GroupOutlined,
  FireOutlined,
  GlobalOutlined,
  SettingOutlined,
  SelectOutlined,
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
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item
          icon={<AppstoreOutlined />}
          onClick={() => navigate("/category")}
          key="1"
        >
          Category
        </Menu.Item>
        <Menu.Item
          icon={<RadarChartOutlined />}
          onClick={() => navigate("/speciality")}
          key="2"
        >
          Specialty
        </Menu.Item>
        <Menu.Item
          icon={<CodepenOutlined />}
          onClick={() => navigate("/plan")}
          key="3"
        >
          Plan
        </Menu.Item>
        <Menu.Item
          icon={<TeamOutlined />}
          onClick={() => navigate("/staff")}
          key="4"
        >
          Staff
        </Menu.Item>
        <Menu.Item
          icon={<UsergroupAddOutlined />}
          onClick={() => navigate("/subscriber-list")}
          key="5"
        >
          Subscriber List
        </Menu.Item>
        <Menu.Item
          icon={<MessageOutlined />}
          onClick={() => navigate("/message-list")}
          key="6"
        >
          Message List
        </Menu.Item>



        <Menu.Item
          icon={<ProjectOutlined />}
          onClick={() => navigate("/blog")}
          key="7"
        >
          Blog
        </Menu.Item>
        <Menu.Item
          icon={<UserOutlined />}
          onClick={() => navigate("/users")}
          key="8"
        >
          Users
        </Menu.Item>
        <Menu.SubMenu key="9" icon={<GroupOutlined />} title="Withdraw">
        <Menu.Item
          onClick={() => navigate("/withdraw")}
          key="10"
        >
          Withdraw Method
        </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="11" icon={<FireOutlined />} title="Signal">
        <Menu.Item
          onClick={() => navigate("/signal")}
          key="12"
        >
          Signal
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/assets")}
          key="13"
        >
          Assets
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/symbol")}
          key="14"
        >
          Symbol
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/type")}
          key="15"
        >
          Type
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/frame")}
          key="16"
        >
          Frame
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/status")}
          key="17"
        >
          Status
        </Menu.Item>

        </Menu.SubMenu>
        <Menu.SubMenu key="18" icon={<GlobalOutlined />} title="Manage Website">

        <Menu.Item
          onClick={() => navigate("/logo")}
          key="19"
        >
          Logo
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/about")}
          key="20"
        >
          About
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/footer")}
          key="21"
        >
          Footer
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/social")}
          key="22"
        >
          Social
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/Breadcrumb")}
          key="23"
        >
          Breadcrumb
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/slider")}
          key="24"
        >
          Slider
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/menu")}
          key="25"
        >
          Menu
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/team")}
          key="26"
        >
          Team
        </Menu.Item>
        
        <Menu.Item
          onClick={() => navigate("/testimonials")}
          key="27"
        >
          Testimonials
        </Menu.Item>

        <Menu.Item
          onClick={() => navigate("/terms")}
          key="28"
        >
          Terms & Conditions
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/privacy")}
          key="29"
        >
          Privacy & Policy
        </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="30" icon={<SettingOutlined />} title="Basic Control">
        <Menu.Item
          onClick={() => navigate("/basic-setting")}
          key="31"
        >
          Basic Setting
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/referral")}
          key="32"
        >
          Referral Setting
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/recaptcha")}
          key="33"
        >
          Recaptcha Setting
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/telegram")}
          key="34"
        >
          Telegram Setting
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/google-analytic")}
          key="35"
        >
          Google Analytic
        </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="36" icon={<SelectOutlined />} title="Manage Section">
        <Menu.Item
          onClick={() => navigate("/speciality-section")}
          key="37"
        >
          Specialty Section 
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/currency")}
          key="38"
        >
          Currency Section 
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/trading")}
          key="39"
        >
          Trading Section 
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/plan-section")}
          key="40"
        >
          Plan Section
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/about-section")}
          key="41"
        >
          About Section
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/advertise")}
          key="42"
        >
          Advertise Section
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/testimonial-section")}
          key="43"
        >
          Testimonial Section
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/subscriber-section")}
          key="44"
        >
          Subscriber Section
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/blog-section")}
          key="45"
        >
          Blog Section
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/team-section")}
          key="46"
        >
          Team Section
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/counter-section")}
          key="47"
        >
          Counter Section
        </Menu.Item>
        </Menu.SubMenu>

      </Menu>
    </Sider>
  );
};

export default SiderBar;
