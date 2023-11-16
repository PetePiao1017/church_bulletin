import { combineReducers } from 'redux';
import auth from './auth';
import builletins from './bulletins';
import retrieve from './retriveData';

export default combineReducers({
  auth,
  builletins,
  retrieve,
});