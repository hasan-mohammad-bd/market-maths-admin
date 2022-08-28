import axios from "axios";
import { API_URL, ACCESS_TOKEN } from "../constants";

export default class University {
  getUniversityList = (payload = {}) => {
    const url = `${API_URL}api/v1/university-website/list/?limit=${
      payload?.limit || 50
    }&offset=${payload?.offset || 0}`;
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

  getUniversityDetails = (id) => {
    const url = `${API_URL}api/v1/university-website/details/${id}/`;
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

  addUniversity = (formData) => {
    const url = `${API_URL}api/v1/university-website/add/`;
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

  editUniversity = (formData, id) => {
    const url = `${API_URL}api/v1/university-website/update/${id}/`;
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

  deleteUniversity = (id) => {
    const url = `${API_URL}api/v1/university-website/delete/${id}/`;
    return axios
      .delete(url, {
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

  getWebsiteList = (payload = {}) => {
    const url = `${API_URL}api/v1/university-website/list/?limit=${
      payload?.limit || 50
    }&offset=${payload?.offset || 0}&type=website`;
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
}
