import api from '../utils/api';
import _ from 'lodash';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAN_ERROR,
  LOGOUT,
  UPDATE_PROFILE,
} from './types';


/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/


// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
    const res = await api.post('/users', formData);
    if(_.hasIn(res.data, 'token')){
      
      dispatch({
        type: REGISTER_SUCCESS,
        payload:res.data
      });

      dispatch(loadUser());
    }
    else{
      dispatch({
        type: REGISTER_FAIL,
        payload: res.data.errors
      });
    }
    
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth', body);

    if(_.has(res.data, 'errors'))
    {
      dispatch({
        type: LOGIN_FAIL,
        payload: res.data.errors
      })
    }
    else
    {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    }
    
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: LOGIN_FAIL,
      payload: errors
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT,
    payload: null
  })
}

export const setCleanErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAN_ERROR,
    payload: null,
  })
}

export const updateProfile = (formData) => async (dispatch) => {
  dispatch({
    type: UPDATE_PROFILE,
    payload: formData
  })
}