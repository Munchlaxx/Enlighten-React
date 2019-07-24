import {
  SET_WHISPERS,
  LIKE_WHISPER,
  UNLIKE_WHISPER,
  LOADING_DATA
} from "../types";

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
    case LIKE_WHISPER:
    case UNLIKE_WHISPER:
      let index = state.whispers.findIndex(
        whisper => whisper.whisperId === action.payload.whisperId
      );
      state.whispers[index] = action.payload;
      return {
        ...state,
      };
    
      default:
          return state;
  }
}
