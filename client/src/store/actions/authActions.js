import axios from "axios";
import { returnErrors } from "./errorActions";

import { CLEAR_ERRORS } from "./errorActions";

export const USER_LOADED = "USER_LOADED";
export const USER_LOADING = "USER_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

//check token and load user. This function will be called all the time
export const loadUser = () => {
  console.log("loaduser");
  return async (dispatch, getState) => {
    //user loading
    dispatch({ type: USER_LOADING }); //ser is loading to true
    axios
      .get("http:localhost:5000/user", tokenConfig(getState))
      .then((res) =>
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: AUTH_ERROR,
        });
      });
  };
};

export const register = ({ name, email, password, password2 }) => {
  console.log("register");
  return async (dispatch, getState) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ name, email, password, password2 });
    axios
      .post("http://localhost:5000/register", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: CLEAR_ERRORS,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({
          type: REGISTER_FAIL,
        });
        console.log(getState().error.msg.msg);
      });
  };
};

export const login = ({ email, password }) => {
  console.log("login");
  return async (dispatch, getState) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ email, password });
    axios
      .post("http://localhost:5000/login", body, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: CLEAR_ERRORS,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({
          type: LOGIN_FAIL,
        });
        console.log(getState().error.msg.msg);
      });
  };
};

export const logout = () => {
  console.log("logout");
  return async (dispatch) => {
    console.log("in action");
    dispatch({ type: LOGOUT_SUCCESS });
  };
};

//set up config/headers and token
export const tokenConfig = (token) => {
  console.log("token config");
  //get token from local storage
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
