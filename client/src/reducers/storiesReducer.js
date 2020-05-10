import {
    GET_STORIES,
    STORIES_LOADING
  } from "../actions/types";
  
  const initialState = {
    stories: [],
    storiesLoading: false
  };
  
  export default function (state = initialState, action) {
    console.log(action)
    switch (action.type) {
      case GET_STORIES:
        return {
          ...state,
          stories: action.stories,
          storiesLoading: false
        };
      case STORIES_LOADING:
        return {
          ...state,
          storiesLoading: true
        };
      default:
        return state;
    }
  }