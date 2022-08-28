import axios from "axios";
import { API_URL, ACCESS_TOKEN } from "../constants";
import moment from "moment";

export default class Dashboard {
  getDashboardData = () => {
    const url = `${API_URL}api/v1/account/admin/home-common-stats/`;
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

  getSalesChartData = (payload) => {
    const url = `${API_URL}api/v1/account/admin/sales-report/?start_date=${
      payload?.start_date || moment().format("YYYY-MM-DD")
    }&end_date=${
      payload?.end_date || moment().add(30, "days").format("YYYY-MM-DD")
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

  getCommissionsChartData = (payload) => {
    const url = `${API_URL}api/v1/account/admin/commission-by-sale-report/?start_date=${
      payload?.start_date || moment().format("YYYY-MM-DD")
    }&end_date=${
      payload?.end_date || moment().add(30, "days").format("YYYY-MM-DD")
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

  getOrdersChartData = (payload) => {
    const url = `${API_URL}api/v1/account/admin/delivered-by-order-report/?start_date=${
      payload?.start_date || moment().format("YYYY-MM-DD")
    }&end_date=${
      payload?.end_date || moment().add(30, "days").format("YYYY-MM-DD")
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

  getUsersChartData = (payload) => {
    const url = `${API_URL}api/v1/account/admin/user-stats/?start_date=${
      payload?.start_date || moment().format("YYYY-MM-DD")
    }&end_date=${
      payload?.end_date || moment().add(30, "days").format("YYYY-MM-DD")
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
