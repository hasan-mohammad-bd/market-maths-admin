import { handleActions } from "redux-actions";
import produce from "immer";

import * as actions from "./actions";

const initialState = {
  userData: {},
};

export default handleActions(
  {
    [actions.setUserData](state, { payload }) {
      return produce(state, (state) => {
        state.userData = payload;
      });
    },
  },
  initialState
);
