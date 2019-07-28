import {
  SET_WHISPERS,
  LOADING_DATA,
  LIKE_WHISPER,
  UNLIKE_WHISPER,
  DELETE_WHISPER,
  SET_ERRORS,
  POST_WHISPER,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_WHISPER,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

// Get all whispers
export const getWhispers = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/whispers')
    .then((res) => {
      dispatch({
        type: SET_WHISPERS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_WHISPERS,
        payload: []
      });
    });
};
export const getWhisper = (whisperId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/whisper/${whisperId}`)
    .then((res) => {
      dispatch({
        type: SET_WHISPER,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
// Post a whisper
export const postWhisper = (newWhisper) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/whisper', newWhisper)
    .then((res) => {
      dispatch({
        type: POST_WHISPER,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like a whisper
export const likeWhisper = (whisperId) => (dispatch) => {
  axios
    .get(`/whisper/${whisperId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_WHISPER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a whisper
export const unlikeWhisper = (whisperId) => (dispatch) => {
  axios
    .get(`/whisper/${whisperId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_WHISPER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (whisperId, commentData) => (dispatch) => {
  axios
    .post(`/whisper/${whisperId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteWhisper = (whisperId) => (dispatch) => {
  axios
    .delete(`/whisper/${whisperId}`)
    .then(() => {
      dispatch({ type: DELETE_WHISPER, payload: whisperId });
    })
    .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};