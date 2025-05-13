import { actionType } from "./actionType";
import { apiLogin } from "../../services/authApi";
import { DataLogin, LoginType, LoginRedux } from "../../utils/type";
import { Dispatch } from "react";

type DisPatchType = {
  type: string
}

export const login = (payload: LoginType) => async (dispatch: Dispatch<LoginRedux>) => {
  try {
    const responsive = await apiLogin(payload) as DataLogin;
    if (responsive?.data?.code === 0) {
      dispatch({
        type: actionType.LOGIN_SUCCESS,
        access_token: responsive?.data?.access_token,
      });
    } else {
      dispatch({
        type: actionType.LOGIN_FAIL,
        access_token: '',
      });
    }
  } catch (err) {
    console.log(err)
    dispatch({
      type: actionType.LOGIN_FAIL,
      access_token: '',
    });
  }
};

export const logout = () => async (dispatch: Dispatch<DisPatchType>) => {
  dispatch({
    type: actionType.LOGOUT
  })
};
