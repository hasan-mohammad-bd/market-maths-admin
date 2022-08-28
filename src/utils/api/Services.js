import axios from "axios";
import { API_URL, ACCESS_TOKEN } from "../constants";

export default class Services {
  getServicesList = (payload = {}) => {
    const url = `${API_URL}api/v1/service/list?limit=${
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

  getSubServicesList = (payload = {}) => {
    const url = `${API_URL}api/v1/service/list?limit=${
      payload?.limit || 50
    }&name=${payload?.name || ""}&offset=${payload?.offset || 0}&type=${
      payload?.type || ""
    }&parent=${payload?.parent || ""}`;
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

  getServiceDetails = (id) => {
    const url = `${API_URL}api/v1/service/details/${id}`;
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

  addService = (payload) => {
    const url = `${API_URL}api/v1/service/add`;
    return axios({
      url,
      method: "POST",
      data: payload,
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
        return error.response?.data;
      });
  };

  editService = (payload, id) => {
    const url = `${API_URL}api/v1/service/update/${id}`;
    return axios({
      url,
      method: "PUT",
      data: payload,
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
        return error.response?.data;
      });
  };

  deleteService = (id) => {
    const url = `${API_URL}api/v1/service/delete/${id}/`;
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

  getOnlySubServicesList = (payload = {}) => {
    const url = `${API_URL}api/v1/service/subservice?type=${
      payload?.type || ""
    }`;
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
