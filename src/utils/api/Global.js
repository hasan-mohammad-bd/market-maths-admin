import axios from "axios";
import { API_URL, ACCESS_TOKEN } from "../constants";

export default class Global {
  getGlobalSettings = (id) => {
    const url = `${API_URL}api/v1/utility/admin/settings/`;
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

  updateGlobalSettings = (payload = {}) => {
    const url = `${API_URL}api/v1/utility/admin/settings/${payload?.id}/`;
    return axios
      .patch(
        url,
        { ...payload },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${ACCESS_TOKEN}`,
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
        return error.response?.data;
      });
  };
}
