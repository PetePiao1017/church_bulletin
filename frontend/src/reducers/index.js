import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import builletins from './bulletins';

export default combineReducers({
  auth,
  alert,
  builletins 
});