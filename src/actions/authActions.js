import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import {
  SET_CURRENT_USER,
  MODAL_CLOSE,
  LOADING,
  NOT_LOADING,
} from '@Actions/types';
import { axiosInstance, setToken } from '@Utils/';

export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

export const logIn = (userData, history) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const response = await axiosInstance.post('users/login', { user: { ...userData } });
    if (response.status === 200) {
      const { user } = response.data;
      localStorage.setItem('haven', user.token);
      setToken(user.token);
      dispatch(setCurrentUser(jwtDecode(user.token)));
      history.push('/');
      toast.dismiss();
      toast.success('Login Successful');
    }
    dispatch({
      type: NOT_LOADING,
    });
    return dispatch({
      type: MODAL_CLOSE,
    });
  } catch (err) {
    const { error } = err.response.data;
    toast.dismiss();
    toast.error(error, { autoClose: 10000 });
    return dispatch({
      type: NOT_LOADING,
    });
  }
};

export const createUser = (userData, history) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const response = await axiosInstance.post('users', { user: { ...userData } });
    if (response.status === 201) {
      const { user } = response.data;
      localStorage.setItem('haven', user.token);
      setToken(user.token);
      dispatch(setCurrentUser(jwtDecode(user.token)));
      history.push('/');
      toast.dismiss();
      toast.success('Registration Successful!');
    }
    dispatch({
      type: NOT_LOADING,
    });
    return dispatch({
      type: MODAL_CLOSE,
    });
  } catch (err) {
    const { error } = err.response.data;
    toast.dismiss();
    toast.error(error, { autoClose: 10000 });
    return dispatch({
      type: NOT_LOADING,
    });
  }
};

export const requestPasswordLink = (email) => async (dispatch) => {
  const response = await axiosInstance.post('users/passwordReset', { user: { email } });
  dispatch({
    type: LOADING,
  });

  try {
    if (response.data.status === 200) {
      toast.dismiss();
      toast.success(response.data.message);
    }
    dispatch({
      type: NOT_LOADING,
    });
    return dispatch({
      type: MODAL_CLOSE,
    });
  } catch (err) {
    const { error } = err.response.data;
    toast.dismiss();
    toast.error(error, { autoClose: 5000 });
    return dispatch({
      type: NOT_LOADING,
    });
  }
};

export const setNewPassword = (data, history) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    const { password, id, token } = data;

    const response = await axiosInstance.put(`users/resetPassword/${id}/${token}`, { user: { password } });

    if (response.status === 200) {
      history.push('/');
      toast.dismiss();
      toast.success(response.data.message);
    }
    dispatch({
      type: NOT_LOADING,
    });
  } catch (err) {
    const { error } = err.response.data;
    toast.dismiss();
    toast.error(error, { autoClose: 5000 });
  }
};