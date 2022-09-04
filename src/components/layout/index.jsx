/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Suspense } from "react";
import { Layout, Space, Avatar, Popover } from "antd";
import {
  AlignRightOutlined,
  AlignLeftOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Spinner from "../common/spinner";
import SiderBar from "./sidebar";

import { setUserData } from "../../utils/redux/actions";

import "./styles.scss";


const WebsiteSettings = React.lazy(() => import("../website-settings"));
const ServiceList = React.lazy(() => import("../services"));
const AddService = React.lazy(() => import("../services/add-services"));
const SubServiceList = React.lazy(() => import("../sub-services"));
const AddSubService = React.lazy(() =>
  import("../sub-services/add-sub-services")
);
const Testimonials = React.lazy(() => import("../testimonials"));
const AddTestimonial = React.lazy(() =>
  import("../testimonials/add-testimonials")
);
const OffersList = React.lazy(() => import("../offers"));
const AddOffer = React.lazy(() => import("../offers/add-offers"));
const DirectoryList = React.lazy(() => import("../directory"));
const AddDirectory = React.lazy(() => import("../directory/add-directory"));

const FaqList = React.lazy(() => import("../faq"));
const AddFaq = React.lazy(() => import("../faq/add-faq"));
const BlogList = React.lazy(() => import("../blog"));
const AddBlog = React.lazy(() => import("../blog/add-blog"));
const CommentsList = React.lazy(() => import("../blog/comments"));
const TagList = React.lazy(() => import("../tags"));
const Questionarrie = React.lazy(() => import("../questionarrie"));
const QuestionareDetails = React.lazy(() =>
  import("../questionarrie/questionair-detail")
);
const AddTag = React.lazy(() => import("../tags/add-tags"));
const Contactus = React.lazy(() => import("../contact"));
const PortfolioList = React.lazy(() => import("../portfolio"));
const AddPortfolio = React.lazy(() => import("../portfolio/add-portfolio"));
const AddContact = React.lazy(() => import("../contact/add-contact"));
const UniversitiesList = React.lazy(() => import("../universities"));
const AddUniversity = React.lazy(() =>
  import("../universities/add-universities")
);
const WebsiteList = React.lazy(() => import("../website"));
const AddWebsite = React.lazy(() => import("../website/add-website"));
const ClientList = React.lazy(() => import("../clients"));
const AddClient = React.lazy(() => import("../clients/add-client"));

const BlogCategoryList = React.lazy(() => import("../blog-category"));
const AddCategory = React.lazy(() => import("../blog-category/add-category"));

const Speciality = React.lazy(() => import("../speciality"));
const AddSpeciality = React.lazy(() => import("../speciality/add-speciality"));

const Plan = React.lazy(() => import("../plan"));
const AddPlan = React.lazy(() => import("../plan/add-plan"));

const Staff = React.lazy(() => import("../staff"));
const AddStaff = React.lazy(() => import("../staff/add-staff"));

const SubscriberList = React.lazy(() => import("../subscriber-list"));
const AddSubScriberList = React.lazy(() => import("../subscriber-list/add-subscriber-list"));

const MessageList = React.lazy(() => import("../message-list"));
const AddMessageList = React.lazy(() => import("../message-list/add-message-list"));

const Assets = React.lazy(() => import("../assets"));
const AddAssets = React.lazy(() => import("../assets/add-assets"));

const Symbol = React.lazy(() => import("../symbol"));
const AddSymbol = React.lazy(() => import("../symbol/add-symbol"));

const { Header, Content } = Layout;

const FadoLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const userPopover = () => {
    return (
      <section className="user-inner-container">
        <div className="logout-opt" onClick={handleLogout}>
          <LoginOutlined />
          Logout
        </div>
      </section>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("fado-admin-panel-user-data");
    dispatch(setUserData({}));
    navigate("/login");
  };

  return (
    <Layout>
      <SiderBar toggle={toggle} collapsed={collapsed} />
      <Layout className="site-layout">
        <Header className="site-layout-background bugify-navbar">
          <div className="collapse-btn" onClick={toggle}>
            {collapsed ? (
              <AlignRightOutlined className="trigger" />
            ) : (
              <AlignLeftOutlined className="trigger" />
            )}
          </div>
          <Space align="center" size={20}>
            <Popover
              placement="rightBottom"
              content={userPopover()}
              trigger="click"
              className="user-popover"
            >
              <Avatar shape="square" src="https://joeschmoe.io/api/v1/random" />
            </Popover>
          </Space>
        </Header>
        <Content className="site-layout-background content-main-section">
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route
                path="/settings/website-settings"
                element={<WebsiteSettings />}
              />

              <Route path="/services" element={<ServiceList />} />
              <Route path="/add-service" element={<AddService />} />
              <Route path="/edit-service/:id" element={<AddService />} />

              <Route path="/sub-service/:id" element={<SubServiceList />} />
              <Route
                path="/add-subservice/:parent/:type"
                element={<AddSubService />}
              />
              <Route
                path="/edit-subservice/:parent/:id"
                element={<AddSubService />}
              />

              <Route path="/offers" element={<OffersList />} />
              <Route path="/add-offer" element={<AddOffer />} />
              <Route path="/edit-offer/:id" element={<AddOffer />} />

              <Route path="/directory" element={<DirectoryList />} />
              <Route path="/add-directory" element={<AddDirectory />} />
              <Route path="/edit-directory/:id" element={<AddDirectory />} />

              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/add-testimonial" element={<AddTestimonial />} />
              <Route
                path="/edit-testimonial/:id"
                element={<AddTestimonial />}
              />

              <Route path="/faq" element={<FaqList />} />
              <Route path="/add-faq" element={<AddFaq />} />
              <Route path="/edit-faq/:id" element={<AddFaq />} />

              <Route path="/blog" element={<BlogList />} />
              <Route path="/add-blog" element={<AddBlog />} />
              <Route path="/edit-blog/:id" element={<AddBlog />} />
              <Route path="/comments/:id" element={<CommentsList />} />

              <Route path="/tags" element={<TagList />} />
              <Route path="/add-tag" element={<AddTag />} />
              <Route path="/edit-tag/:id" element={<AddTag />} />

              <Route path="/questionarrie" element={<Questionarrie />} />
              <Route
                path="/questionarrie-details/:id"
                element={<QuestionareDetails />}
              />

              <Route path="/contact-us" element={<Contactus />} />
              <Route path="/edit-contact/:id" element={<AddContact />} />

              <Route path="/portfolio" element={<PortfolioList />} />
              <Route path="/add-portfolio" element={<AddPortfolio />} />
              <Route path="/edit-portfolio/:id" element={<AddPortfolio />} />

              <Route path="/universities" element={<UniversitiesList />} />
              <Route path="/add-university" element={<AddUniversity />} />
              <Route path="/edit-university/:id" element={<AddUniversity />} />

              <Route path="/website" element={<WebsiteList />} />
              <Route path="/add-website" element={<AddWebsite />} />
              <Route path="/edit-website/:id" element={<AddWebsite />} />

              <Route path="/client" element={<ClientList />} />
              <Route path="/add-client" element={<AddClient />} />
              <Route path="/edit-client/:id" element={<AddClient />} />

              {/* new */}

              <Route path="/category" element={<BlogCategoryList/>} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/edit-category/:id" element={<AddCategory />} />


              <Route path="/speciality" element={<Speciality/>} />
              <Route path="/add-speciality" element={<AddSpeciality/>} />
              <Route path="/edit-speciality/:id" element={<AddSpeciality />} />

              <Route path="/plan" element={<Plan/>} />
              <Route path="/add-plan" element={<AddPlan/>} />
              <Route path="/edit-plan/:id" element={<AddPlan />} />

              <Route path="/staff" element={<Staff/>} />
              <Route path="/add-staff" element={<AddStaff/>} />
              <Route path="/edit-staff/:id" element={<AddStaff />} />

              <Route path="/subscriber-list" element={<SubscriberList/>} />
              <Route path="/add-subscriber-list" element={<AddSubScriberList/>} />
              <Route path="/edit-subscriber-list/:id" element={<AddSubScriberList />} />

              <Route path="/message-list" element={<MessageList/>} />
              <Route path="/add-message-list" element={<AddMessageList/>} />
              <Route path="/edit-message-list/:id" element={<AddMessageList />} />

              <Route path="/assets" element={<Assets/>} />
              <Route path="/add-assets" element={<AddAssets/>} />
              <Route path="/edit-assets/:id" element={<AddAssets />} />

              <Route path="/symbol" element={<Symbol/>} />
              <Route path="/add-symbol" element={<AddSymbol/>} />
              <Route path="/edit-symbol/:id" element={<AddSymbol />} />

            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default FadoLayout;
