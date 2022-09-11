/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Suspense } from "react";
import { Layout, Space, Avatar, Popover, Slider } from "antd";
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

const Type = React.lazy(() => import("../type"));
const AddType = React.lazy(() => import("../type/add-type"));

const Frame = React.lazy(() => import("../frame"));
const AddFrame = React.lazy(() => import("../frame/add-frame"));

const Status = React.lazy(() => import("../status"));
const AddStatus = React.lazy(() => import("../status/add-status"));

const Signal = React.lazy(() => import("../signal"));
const AddSignal = React.lazy(() => import("../signal/add-signal"));
const SignalComments = React.lazy(() => import("../signal/comments"));
const Review = React.lazy(() => import("../signal/review"));

const Users = React.lazy(() => import("../users"));
const AddUsers = React.lazy(() => import("../users/add-users"));

const Withdraw = React.lazy(() => import("../withdraw"));
const AddWithdraw = React.lazy(() => import("../withdraw/add-withdraw"));

const Logo = React.lazy(() => import("../logo"));
const AddLogo = React.lazy(() => import("../logo/add-logo"));

const About = React.lazy(() => import("../about"));
const AddAbout = React.lazy(() => import("../about/add-about"));

const Footer = React.lazy(() => import("../footer"));
const AddFooter = React.lazy(() => import("../footer/add-footer"));

const Social = React.lazy(() => import("../social"));
const AddSocial = React.lazy(() => import("../social/add-social"));

const Breadcrumb = React.lazy(() => import("../breadcrumb"));
const AddBreadcrumb = React.lazy(() => import("../breadcrumb/add-breadcrumb"));

const TheSlider = React.lazy(() => import("../slider"));
const AddSlider = React.lazy(() => import("../slider/add-slider"));

const Menu = React.lazy(() => import("../menu"));
const AddMenu = React.lazy(() => import("../menu/add-manu"));

const Team = React.lazy(() => import("../team"));
const AddTeam = React.lazy(() => import("../team/add-team"));

const Terms = React.lazy(() => import("../terms"));
const AddTerms = React.lazy(() => import("../terms/add-terms"));

const Privacy = React.lazy(() => import("../privacy"));
const AddPrivacy = React.lazy(() => import("../privacy/add-privacy"));

const BasicSetting = React.lazy(() => import("../basic-setting"));
const AddBasicSetting = React.lazy(() => import("../basic-setting/add-basic-setting"));

const Referral = React.lazy(() => import("../referral"));
const AddReferral = React.lazy(() => import("../referral/add-referral"));

const Recaptcha = React.lazy(() => import("../recaptcha"));
const AddRecaptcha = React.lazy(() => import("../recaptcha/add-recaptcha"));

const Telegram = React.lazy(() => import("../telegram"));
const AddTelegram = React.lazy(() => import("../telegram/add-telegram"));

const GoogleAnalytic = React.lazy(() => import("../google-analytic"));
const AddGoogleAnalytic = React.lazy(() => import("../google-analytic/add-google-analytic"));

const SpecialitySection = React.lazy(() => import("../speciality-section"));
const AddSpecialitySection = React.lazy(() => import("../speciality-section/add-speciality-section"));

const Currency = React.lazy(() => import("../currency"));
const AddCurrency = React.lazy(() => import("../currency/add-currency"));

const Trading = React.lazy(() => import("../trading"));
const AddTrading = React.lazy(() => import("../trading/add-trading"));

const PlanSection = React.lazy(() => import("../plan-section"));
const AddPlanSection = React.lazy(() => import("../plan-section/add-plan-section"));

const AboutSection = React.lazy(() => import("../about-section"));
const AddAboutSection = React.lazy(() => import("../about-section/add-about-section"));

const Advertise = React.lazy(() => import("../advertise"));
const AddAdvertise = React.lazy(() => import("../advertise/add-advertise"));

const TestimonialSection = React.lazy(() => import("../testimonial-section"));
const AddTestimonialSection = React.lazy(() => import("../testimonial-section/add-testimonial-section"));

const SubscriberSection = React.lazy(() => import("../subscriber-section"));
const AddSubscriberSection = React.lazy(() => import("../subscriber-section/add-subscriber-section"));

const BlogSection = React.lazy(() => import("../blog-section"));
const AddBlogSection = React.lazy(() => import("../blog-section/add-blog-secton"));

const TeamSection = React.lazy(() => import("../team-section"));
const AddTeamSection = React.lazy(() => import("../team-section/add-team-section"));

const CounterSection = React.lazy(() => import("../counter-section"));
const AddCounterSection = React.lazy(() => import("../counter-section/add-counter-section"));




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

              <Route path="/type" element={<Type/>} />
              <Route path="/add-type" element={<AddType/>} />
              <Route path="/edit-type/:id" element={<AddType />} />

              <Route path="/frame" element={<Frame/>} />
              <Route path="/add-frame" element={<AddFrame/>} />
              <Route path="/edit-frame/:id" element={<AddFrame />} />

              <Route path="/status" element={<Status/>} />
              <Route path="/add-status" element={<AddStatus/>} />
              <Route path="/edit-status/:id" element={<AddStatus />} />

              <Route path="/signal" element={<Signal/>} />
              <Route path="/add-signal" element={<AddSignal/>} />
              <Route path="/edit-signal/:id" element={<AddSignal />} />
              <Route path="/signal-comments/:id" element={<SignalComments />} />
              <Route path="/review/:id" element={<Review />} />

              
              <Route path="/users" element={<Users/>} />
              <Route path="/add-users" element={<AddUsers/>} />
              <Route path="/edit-users/:id" element={<AddUsers />} />
              
              <Route path="/withdraw" element={<Withdraw/>} />
              <Route path="/add-withdraw" element={<AddWithdraw/>} />
              <Route path="/edit-withdraw/:id" element={<AddWithdraw />} />

              <Route path="/logo" element={<Logo/>} />
              <Route path="/add-logo" element={<AddLogo/>} />
              <Route path="/edit-logo" element={<AddLogo />} />
              
              <Route path="/about" element={<About/>} />
              <Route path="/add-about" element={<AddAbout/>} />
              <Route path="/edit-about" element={<AddAbout />} />
              
              <Route path="/footer" element={<Footer/>} />
              <Route path="/add-footer" element={<AddFooter/>} />
              <Route path="/edit-footer" element={<AddFooter />} />
              
              <Route path="/social" element={<Social/>} />
              <Route path="/add-social" element={<AddSocial/>} />
              <Route path="/edit-social/:id" element={<AddSocial />} />

              <Route path="/breadcrumb" element={<Breadcrumb/>} />
              <Route path="/add-breadcrumb" element={<AddBreadcrumb/>} />
              <Route path="/edit-breadcrumb" element={<AddBreadcrumb />} />

              <Route path="/slider" element={<TheSlider/>} />
              <Route path="/add-slider" element={<AddSlider/>} />
              <Route path="/edit-slider/:id" element={<AddSlider />} />

              <Route path="/menu" element={<Menu/>} />
              <Route path="/add-menu" element={<AddMenu/>} />
              <Route path="/edit-menu/:id" element={<AddMenu />} />

              <Route path="/team" element={<Team/>} />
              <Route path="/add-team" element={<AddTeam/>} />
              <Route path="/edit-team/:id" element={<AddTeam />} />

              <Route path="/terms" element={<Terms/>} />
              <Route path="/add-terms" element={<AddTerms/>} />
              <Route path="/edit-terms" element={<AddTerms />} />

              <Route path="/privacy" element={<Privacy/>} />
              <Route path="/add-privacy" element={<AddPrivacy/>} />
              <Route path="/edit-privacy" element={<AddPrivacy />} />

              <Route path="/basic-setting" element={<BasicSetting/>} />
              <Route path="/add-basic-setting" element={<AddBasicSetting/>} />
              <Route path="/edit-basic-setting" element={<AddBasicSetting />} />

              <Route path="/referral" element={<Referral/>} />
              <Route path="/add-referral" element={<AddReferral/>} />
              <Route path="/edit-referral" element={<AddReferral />} />

              <Route path="/recaptcha" element={<Recaptcha/>} />
              <Route path="/add-recaptcha" element={<AddRecaptcha/>} />
              <Route path="/edit-recaptcha" element={<AddRecaptcha />} />

              <Route path="/telegram" element={<Telegram/>} />
              <Route path="/add-telegram" element={<AddTelegram/>} />
              <Route path="/edit-telegram" element={<AddTelegram />} />

              <Route path="/google-analytic" element={<GoogleAnalytic/>} />
              <Route path="/add-google-analytic" element={<AddGoogleAnalytic/>} />
              <Route path="/edit-google-analytic" element={<AddGoogleAnalytic />} />

              <Route path="/speciality-section" element={<SpecialitySection/>} />
              <Route path="/add-speciality-section" element={<AddSpecialitySection/>} />
              <Route path="/edit-speciality-section" element={<AddSpecialitySection />} />

              <Route path="/currency" element={<Currency/>} />
              <Route path="/add-currency" element={<AddCurrency/>} />
              <Route path="/edit-currency" element={<AddCurrency />} />

              <Route path="/trading" element={<Trading/>} />
              <Route path="/add-trading" element={<AddTrading/>} />
              <Route path="/edit-trading" element={<AddTrading />} />

              <Route path="/plan-section" element={<PlanSection/>} />
              <Route path="/add-plan-section" element={<AddPlanSection/>} />
              <Route path="/edit-plan-section" element={<AddPlanSection />} />

              <Route path="/about-section" element={<AboutSection/>} />
              <Route path="/add-about-section" element={<AddAboutSection/>} />
              <Route path="/edit-about-section" element={<AddAboutSection />} />

              <Route path="/advertise" element={<Advertise/>} />
              <Route path="/add-advertise" element={<AddAdvertise/>} />
              <Route path="/edit-advertise" element={<AddAdvertise />} />

              <Route path="/testimonial-section" element={<TestimonialSection/>} />
              <Route path="/add-testimonial-section" element={<AddTestimonialSection/>} />
              <Route path="/edit-testimonial-section" element={<AddTestimonialSection />} />

              <Route path="/subscriber-section" element={<SubscriberSection/>} />
              <Route path="/add-subscriber-section" element={<AddSubscriberSection/>} />
              <Route path="/edit-subscriber-section" element={<AddSubscriberSection />} />

              <Route path="/blog-section" element={<BlogSection/>} />
              <Route path="/add-blog-section" element={<AddBlogSection/>} />
              <Route path="/edit-blog-section" element={<AddBlogSection />} />

              <Route path="/team-section" element={<TeamSection/>} />
              <Route path="/add-team-section" element={<AddTeamSection/>} />
              <Route path="/edit-team-section" element={<AddTeamSection />} />

              <Route path="/counter-section" element={<CounterSection/>} />
              <Route path="/add-counter-section" element={<AddCounterSection/>} />
              <Route path="/edit-counter-section" element={<AddCounterSection />} />



            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default FadoLayout;
