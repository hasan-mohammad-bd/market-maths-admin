/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "./common/spinner";
import FadoLayout from "./layout";
import SignIn from "./auth/sign-in";
import API from "../utils/api";
import { setUserData } from "../utils/redux/actions";
import { getDataManager, getErrorMessage } from "../utils/helper.functions";

import "./App.scss";

const App = () => {
  const auth = new API.Auth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => {
    return state?.app;
  });

  const [loading, setLoading] = useState();

  const savedUserData = JSON.parse(
    localStorage.getItem("fado-admin-panel-user-data")
  );

  useEffect(() => {
    dispatch(setUserData(savedUserData));
  }, []);

  const isLoggedIn = !!savedUserData?.token || !!userData?.token;

  const validateToken = () => {
    return getDataManager(auth?.validateToken, setLoading, {
      token: savedUserData?.token,
    }).then((x) => {
      if (x?.status) {
        dispatch(setUserData(savedUserData));
        navigate("/category");
      } else {
        const error = x?.message || getErrorMessage(x?.errors);
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
/*         localStorage.removeItem("fado-admin-panel-user-data");
        dispatch(setUserData({}));
        navigate("/login"); */
      }
    });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      validateToken();
    }
  }, [isLoggedIn]);

  return (
    <div className="fado-main-container">
      {loading && <Spinner />}
      {isLoggedIn ? (
        <FadoLayout />
      ) : (
        <Routes>
          <Route path="/login" element={<SignIn />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
