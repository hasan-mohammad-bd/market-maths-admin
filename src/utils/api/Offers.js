import axios from "axios";
import { API_URL, ACCESS_TOKEN } from "../constants";

export default class Offers {
  getOffersList = (payload = {}) => {
    const url = `${API_URL}api/v1/offer/list?limit=${
      payload?.limit || 50
    }&offset=${payload?.offset || 0}&isExpired=true`;
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

  getOfferDetails = (id) => {
    const url = `${API_URL}api/v1/offer/details/${id}`;
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

  addOffer = (payload) => {
    const url = `${API_URL}api/v1/offer/add`;
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

  editOffer = (payload, id) => {
    const url = `${API_URL}api/v1/offer/update/${id}`;
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

  deleteOffer = (id) => {
    const url = `${API_URL}api/v1/offer/delete/${id}/`;
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
}
