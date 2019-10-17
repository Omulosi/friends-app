import { useContext, useReducer } from 'react';
import axios from 'axios';
import { AuthReducer, initialState } from '../store/reducers/auth_reducer';
import {loginSuccess, loginFailure } from '../store/actions/actions'
import { AuthContext } from '../context';

const API = `http://localhost:5000/api/login`;


export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    }
  })
}


export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {

  const [authState, dispatch] = useReducer(AuthReducer, initialState);

  const login = (user, props) => {

    axiosWithAuth().post(`${API}`, user)
      .then(res => {
        dispatch(loginSuccess());
        localStorage.setItem('token', res.data.payload);
        props.history.push('/friends')
      })
      .catch(error => {
        debugger
        dispatch(loginFailure(error.response.data.error));
      })
  };

  const logout = () => {
    localStorage.clear();
    dispatch(loginFailure(null))
  };

  return {
    authState,
    login,
    logout,
    dispatch
  };

}

