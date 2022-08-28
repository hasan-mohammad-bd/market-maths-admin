import axios from "axios";
import { API_URL, ACCESS_TOKEN } from "../constants";

export default class Website {
  getWebsiteData = (id) => {
    const url = `${API_URL}api/v1/website/`;
    return axios
      .get(url, {
        headers: {
          Authorization: `Token ${ACCESS_TOKEN}`,
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
        return error.response?.data;
      });
  };

  addWebsite = (formData) => {
    const url = `${API_URL}api/v1/website/add`;
    return axios({
      url,
      method: "POST",
      data: formData,
      headers: {
        Authorization: `Token ${ACCESS_TOKEN}`,
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
        return error.response?.data;
      });
  };

  editWebsite = (formData, id) => {
    const url = `${API_URL}api/v1/website/update`;
    return axios({
      url,
      method: "PUT",
      data: formData,
      headers: {
        Authorization: `Token ${ACCESS_TOKEN}`,
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
        return error.response?.data;
      });
  };
}
