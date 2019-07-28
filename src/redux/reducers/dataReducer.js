import {
  SET_WHISPERS,
  LIKE_WHISPER,
  UNLIKE_WHISPER,
  LOADING_DATA,
  DELETE_WHISPER,
  POST_WHISPER,
  SET_WHISPER,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  whispers: [],
  whisper: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_WHISPERS:
      return {
        ...state,
        whispers: action.payload,
        loading: false
      };
    case SET_WHISPER:
      return {
        ...state,
        whisper: action.payload
      };
    case LIKE_WHISPER:
    case UNLIKE_WHISPER:
      let index = state.whispers.findIndex(
        (whisper) => whisper.whisperId === action.payload.whisperId
      );
      state.whispers[index] = action.payload;
      if (state.whisper.whisperId === action.payload.whisperId) {
        let temp = state.whisper.comments;
        state.whisper = action.payload;
        state.whisper.comments = temp;
      }
      return {
        ...state
      };
    case DELETE_WHISPER:
      index = state.whispers.findIndex(
        (whisper) => whisper.whisperId === action.payload
      );
      state.whispers.splice(index, 1);
      return {
        ...state
      };
    case POST_WHISPER:
      return {
        ...state,
        whispers: [action.payload, ...state.whispers]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        whisper: {
          ...state.whisper,
          comments: [action.payload, ...state.whisper.comments]
        }
      };
    default:
      return state;
  }
}

