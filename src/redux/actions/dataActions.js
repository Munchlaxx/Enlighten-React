import {
  SET_WHISPERS,
  LOADING_DATA,
  LIKE_WHISPER,
  UNLIKE_WHISPER,
  DELETE_WHISPER,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_WHISPER
} from "../types";
import axios from "axios";
// Get all whispers
export const getWhispers = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/whispers")
    .then(res => {
      dispatch({
        type: SET_WHISPERS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_WHISPERS,
        payload: []
      });
    });
};
// Post a whisper
export const postWhisper = newWhisper => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/whisper", newWhisper)
    .then(res => {
      dispatch({
        type: POST_WHISPER,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like a whisper
export const likeWhisper = whisperId => dispatch => {
  axios
    .get(`/whisper/${whisperId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_WHISPER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
// Unlike a whisepr
export const unlikeWhisper = whisperId => dispatch => {
  axios
    .get(`/whisper/${whisperId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_WHISPER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deleteWhisper = (whisperId) => (dispatch) => {
    axios
      .delete(`/whisper/${whisperId}`)
      .then(() => {
        dispatch({ type: DELETE_WHISPER, payload: whisperId });
      })
      .catch((err) => console.log(err));
  };
