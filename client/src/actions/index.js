import { INCREMENT_COUNTER, DECREMENT_COUNTER, AUTH_USER, AUTH_ERROR, ASANA, ASANA_ERROR, ASANA_DATA_ERROR, ASANA_USER_DATA } from "./types";
import axios from 'axios';


export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  };
};

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  };
};


export const signup = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/signup', formProps);
    dispatch({ type: AUTH_USER, payload: res.data.token });
    localStorage.setItem('token', res.data.token);
    callback();
  } catch(e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};
 
export const asanaConnect = (code)=> async dispatch =>{
  try{
    const response = await axios.post("/api/connect", code, { headers: { authorization: localStorage.getItem("token")}})
    console.log(response.data)
    localStorage.setItem('asanaToken', response.data.token);
    dispatch({type: ASANA, payload: response.data})
  }catch(e){
    dispatch({ type: ASANA_ERROR, payload: "error"})
  }  
}

export const getUserData = () => async dispatch => {
  try{
    const res = await axios.post("/api/asana", {accessToken: localStorage.getItem("asanaToken")})
    console.log(res.data)
    dispatch({type: ASANA_USER_DATA, payload: res.data})
  }catch(e){
    dispatch({ type: ASANA_DATA_ERROR, payload: "error"})
    console.log("calling refresh")
    automaticRefresh()
  }
}

export const signin = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/login', formProps);
    if (res.data.user.rows[0].access_token){
      localStorage.setItem('asanaToken', res.data.user.rows[0].access_token);
      localStorage.setItem('refreshToken', res.data.user.rows[0].refresh_token);
    }
    localStorage.setItem('token', res.data.token);
    dispatch({ type: AUTH_USER, payload: res.data.token });
    
    callback();
  } catch(e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('asanaToken');
  return {
    type: AUTH_USER,
    payload: null
  };
};

export const automaticRefresh = async () =>{
  console.log("i got here")
  try{
    
    const res = await axios.post('/api/asana/refresh', { headers: { authorization: localStorage.getItem("token")}})
    localStorage.setItem("asanaToken", res.data.accessToken)
  }catch(e){
    console.log(e)
  }
  

}

export const test = async () => {

  try{
    const res = await axios.get("/api/test", { headers: { authorization: localStorage.getItem("token")}})
    console.log(res.data)
  }catch(e){
    console.log(e)
  }
}



