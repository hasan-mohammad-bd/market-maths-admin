export const API_URL = "https://fado.techtsy.tech/";
export const ACCESS_TOKEN = (
  JSON.parse(localStorage.getItem("fado-admin-panel-user-data")) || {}
).token;

export const Language = "en";
