import {SET_WHISPERS, LOADING_DATA, LIKE_WHISPER, UNLIKE_WHISPER} from '../types';
import axios from 'axios';
// Get all whispers
export const getWhispers = () => dispatch => {
    dispatch({type: LOADING_DATA});
    axios.get('/whispers')
      .then(res => {
          dispatch({
              type: SET_WHISPERS,
              payload: res.data
          })
      })
      .catch(err => {
          dispatch({
              type: SET_WHISPERS,
              payload: []
          })
      })
}

// Like a whisper
export const likeWhisper = (whisperId) => dispatch => {
    axios.get(`/whisper/${whisperId}/like`)
      .then( res => {
          dispatch({
              type: LIKE_WHISPER,
              payload: res.data
          })
      })
      .catch(err => console.log(err));
} 

// Unlike a whisper
export const unlikeWhisper = (whisperId) => dispatch => {
    axios.get(`/whisper/${whisperId}/unlike`)
      .then( res => {
          dispatch({
              type: UNLIKE_WHISPER,
              payload: res.data
          })
      })
      .catch(err => console.log(err));
} 
