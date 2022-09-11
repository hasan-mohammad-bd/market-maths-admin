import axios from "axios";
import { API_URL, ACCESS_TOKEN } from "../constants";

export default class Telegram {
    getTelegram = (payload = {}) => {
        const url = `${API_URL}setting/telegram_bot?limit=${
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



  editTelegram = (formData) => {
    const url = `${API_URL}setting/telegram_bot`;
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
