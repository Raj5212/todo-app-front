import * as constants from '../constant';
import * as apis from '../api';
// import * as payloads from 'redux/auth/payloads';
import * as services from '../service/index';
// import * as messages from 'redux/toast/messages';
import {  GET, POST } from '../constant';
import API_REQUEST from '../request/index';

export const register = (payload) => async (dispatch) => {
  try {
    dispatch({ type: constants.REGISTER_REQUEST });
    const res = await API_REQUEST(POST, apis.CREATE_USER, payload);
    dispatch({ type: constants.REGISTER_SUCCESS, payload: res?.data?.data });
  } catch (err) {
    console.error('register...', err);
    dispatch({ type: constants.REGISTER_FAIL });
   
  }
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: constants.LOGIN_REQUEST });
    const res1 = await API_REQUEST(POST, apis.LOGIN_USER, data);
    services.setToken(res1?.data?.accessToken);
      dispatch({
        type: constants.LOGIN_SUCCESS,
        payload: res1?.data?.data?.user,
      });
  } catch (err) {
    console.error('login...', err);
    dispatch({ type: constants.LOGIN_FAIL });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: constants.LOGOUT_REQUEST });
    // await API_REQUEST(GET, apis.ORG_LOGOUT_API);
    dispatch({ type: constants.LOGOUT_SUCCESS });
    services.removeToken();
  } catch (err) {
    console.error('logout...', err);
    dispatch({ type: constants.LOGOUT_FAIL });
  }
};














