import axios from "axios";
import { API_URL, ACCESS_TOKEN, Language } from "../constants";

export default class Auth {
  loginUser = (payload) => {
    const url = `${API_URL}api/v1/auth/login`;
    return axios
      .post(
        url,
        { ...payload },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": Language || "en",
          },
        }
      )
      .then(function (response) {
        if (response.status === 200 || response.status === 201) {
          return response.data;
        } else {
          return {
            data: {
              results: [],
            },
          };
        }
      })
      .catch(function (error) {
        return error?.response?.data;
      });
  };

  getCountry = () => {
    return axios
      .get(`${API_URL}api/v1/utility/public/country`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        if (response.status === 200 || response.status === 201) {
          return response.data;
        } else {
          return {
            data: {
              results: [],
            },
          };
        }
      })
      .catch(function (error) {
        console.log(error);
        return error.response?.data;
      });
  };

  uploadFile = (formData) => {
    const url = `${API_URL}api/v1/utility/public/media/`;
    return axios({
      url,
      method: "POST",
      data: formData,
      headers: {
        Authorization: `Token ${ACCESS_TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        if (response.status === 200 || response.status === 201) {
          return response.data;
        } else {
          return {
            data: {
              results: [],
            },
          };
        }
      })
      .catch(function (error) {
        return error?.response?.data;
      });
  };

  validateToken = (payload) => {
    const url = `${API_URL}api/v1/auth/check-token`;
    return axios
      .post(
        url,
        { ...payload },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": Language || "en",
          },
        }
      )
      .then(function (response) {
        if (response.status === 200 || response.status === 201) {
          return response.data;
        } else {
          return {
            data: {
              results: [],
            },
          };
        }
      })
      .catch(function (error) {
        return error?.response?.data;
      });
  };
}
