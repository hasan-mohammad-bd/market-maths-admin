import { createAction } from "redux-actions";

export const setUserData = createAction(
  "SET_USER_DATA",
  (userData) => userData
);
