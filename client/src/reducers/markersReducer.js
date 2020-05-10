import {
    GET_MARKERS,
    MARKERS_LOADING,
    RESET_MARKERS
  } from "../actions/types";
  
  const initialState = {
    markers: [],
    markersLoading: false
  };
  
  export default function (state = initialState, action) {
    console.log(action)
    switch (action.type) {
      case GET_MARKERS:
        return {
          ...state,
          markers: action.markers,
          markersLoading: false
        };
      case RESET_MARKERS:
        return initialState;
      case MARKERS_LOADING:
        return {
          ...state,
          markersLoading: true
        };
      default:
        return state;
    }
  }