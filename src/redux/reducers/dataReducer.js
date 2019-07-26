import {
  SET_WHISPERS,
  LIKE_WHISPER,
  UNLIKE_WHISPER,
  LOADING_DATA,
  DELETE_WHISPER,
  POST_WHISPER,
  SET_WHISPER
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
        state.whisper = action.payload;
      }
      return {
        ...state
      };
      case DELETE_WHISPER:
        let newIndex = state.whispers.findIndex(
          (whisper) => whisper.whisperId === action.payload
        );
        state.whispers.splice(newIndex, 1);
        return {
          ...state
        };
    case POST_WHISPER:
      return {
        ...state,
        whispers: [action.payload, ...state.whispers]
      };
    default:
      return state;
  }
}