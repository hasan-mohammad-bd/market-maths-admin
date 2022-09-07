import axios from "axios";
import { API_URL, ACCESS_TOKEN } from "../constants";

export default class Slider {
  getSliderList = (payload = {}) => {
    const url = `${API_URL}website/slider?limit=${
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

  getSliderDetails = (id) => {
    const url = `${API_URL}website/slider/${id}`;
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

  addSlider = (payload) => {
    const url = `${API_URL}website/slider`;
    return axios({
      url,
      method: "POST",
      data: payload ,
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

  editSlider = (formData, id) => {
    const url = `${API_URL}website/slider/${id}`;
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

  deleteSlider = (id) => {
    const url = `${API_URL}website/slider/${id}`;
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
