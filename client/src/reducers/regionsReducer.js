import {
    GET_REGIONS,
    REGIONS_LOADING
  } from "../actions/types";
  
  const initialState = {
    regions: [],
    regionsLoading: false
  };
  
  export default function (state = initialState, action) {
    console.log(action)
    switch (action.type) {
      case GET_REGIONS:
        return {
          ...state,
          regions: action.regions,
          regionsLoading: false
        };
      case REGIONS_LOADING:
        return {
          ...state,
          regionsLoading: true
        };
      default:
        return state;
    }
  }

  // switch (action.type) {
    //   case CREATE_TASK:
    //     return {
    //       ...state,
    //       tasks: [action.payload, ...state.tasks]
    //     };