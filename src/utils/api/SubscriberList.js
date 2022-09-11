import axios from "axios";
import { API_URL, ACCESS_TOKEN } from "../constants";

export default class SubscriberList {


  getSubscriberList = (payload = {}) => {
    const url = `${API_URL}subscriber?limit=${
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

//done
/*   getSubscriberDetails = (id) => {
    const url = `${API_URL}subscriber/${id}`;
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
  }; */



/*   addSubscriber = (payload) => {
    const url = `${API_URL}subscriber`;
    return axios({
      url,
      method: "POST",
      data: payload,
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
  }; */

/*   editSubscriber = (payload, id) => {
    const url = `${API_URL}subscriber/${id}`;
    return axios({
      url,
      method: "PUT",
      data: payload,
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
  }; */


  deleteSubscriber = (id) => {
    const url = `${API_URL}subscriber/${id}`;
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

  activateTags = (id) => {
    const url = `${API_URL}api/v1/tag/activate/${id}/`;
    return axios({
      url,
      method: "PUT",
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
