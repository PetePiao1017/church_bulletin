import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import builletins from './bulletins';
import retrieved from './retrieved';

export default combineReducers({
  auth,
  alert,
  builletins,
  retrieved,
});