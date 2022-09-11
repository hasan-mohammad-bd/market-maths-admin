import axios from "axios";
import { API_URL, ACCESS_TOKEN } from "../constants";

export default class About {
    getAbout = (payload = {}) => {
        const url = `${API_URL}website/about?limit=${
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



  editAbout = (formData) => {
    const url = `${API_URL}website/about`;
    return axios({
      url,
      method: "PUT",
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
        return error.response?.data;
      });
  };


}
