import axios from "axios";

import {
  GET_STORIES,
  STORIES_LOADING
} from "./types";



// Get stories by region id
export const getStories = (id) => async dispatch => {
  dispatch(setStoriesLoading());
  const path = `/api/stories/region-list/` + id
  console.log(path);
  axios
    .get(path)
    .then(res =>
      dispatch({
        type: GET_STORIES,
        stories: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STORIES,
        stories: err
      })
    );
};


// Regions loading
export const setStoriesLoading = () => {
  return {
    type: STORIES_LOADING
  };
};

