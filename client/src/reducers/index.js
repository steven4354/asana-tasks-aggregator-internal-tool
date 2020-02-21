import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import counter from './counter';
import auth from './auth';
import asana from "./asana"
import fetchUser from "./fetchUserReducer"

export default combineReducers({
  auth,
  form,
  counter,
  asana,
  fetchUser
});