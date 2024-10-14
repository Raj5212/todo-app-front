import * as constants from '../constant';

const initialState = {
  checkingAuth: true,
  loading: false,
  registered: false,
  isAuth: false,
  user: null,
  error : null,
  profile: null,
  refetch: false,
  deleting: false,
  registerData: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case constants.REGISTER_REQUEST:
    case constants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        fetchRegister: false,
        registered: false,
      };

    case constants.REGISTER_SUCCESS:
      let data = {
        userId: payload?.userId,
      };
      return {
        ...state,
        loading: false,
        registered: true,
        fetchRegister: false,
        registerData: data,
      };

    case constants.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        registered: false,
        fetchRegister: false,
      };

    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchRegister: false,
        fetchSubscription: false,
        isAuth: true,
        user: payload,
      };

    case constants.LOGIN_FAIL:
    case constants.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        checkingAuth: false,
      };

    case constants.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: false,
        checkingAuth: false,
      };
      
    default:
      return state;
  }
}
