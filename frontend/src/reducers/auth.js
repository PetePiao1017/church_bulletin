import {
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGIN_FAIL,
    REGISTER_FAIL,
    CLEAN_ERROR,
  } from '../actions/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    errors: []
  };
  
  function authReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case LOGIN_FAIL:  
        return {
          ...state,
          errors: [...payload]
        }
      case REGISTER_FAIL:  
        return {
          ...state,
          errors: [...state.errors, ...payload]
        }
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case AUTH_ERROR:
      case LOGOUT:
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null
        };
      case CLEAN_ERROR:
        return{
          ...state,
          errors: []
        }
      default:
        return state;
    }
  }
  
  export default authReducer;