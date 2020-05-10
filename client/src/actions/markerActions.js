
import axios from "axios";

import {
  GET_MARKERS,
  MARKERS_LOADING,
  RESET_MARKERS
} from "./types";



// Get markers by region id
export const getMarkers = (storyid) => async dispatch => {
  dispatch(setMarkersLoading());
  const path = `/api/stories/list-markers/` + storyid
  console.log(path);
  axios
    .get(path)
    .then(res =>
      dispatch({
        type: GET_MARKERS,
        markers: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MARKERS,
        markers: err
      })
    );
};

export const resetMarkers = () => {
  return{
    type: RESET_MARKERS
  }
};

// Regions loading
export const setMarkersLoading = () => {
  return {
    type: MARKERS_LOADING
  };
};

