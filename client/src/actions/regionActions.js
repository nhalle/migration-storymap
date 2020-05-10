import axios from "axios";

import {
  GET_REGIONS,
  REGIONS_LOADING
} from "./types";

// // Create Region
// export const createRegion = taskData => dispatch => {
//   axios
//     .post("/api/tasks/create", taskData)
//     .then(res =>
//       dispatch({
//         type: CREATE_TASK,
//         payload: res.data
//       })
//     )
//     .catch(err => console.log(err));
// };

// Get tasks by project id
export const getRegions = (dispatch) => {
  dispatch(setRegionsLoading());
  axios
    .get(`/api/regions/all`)
    .then(res =>
      dispatch({
        type: GET_REGIONS,
        regions: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REGIONS,
        regions: err
      })
    );
};


// Regions loading
export const setRegionsLoading = () => {
  return {
    type: REGIONS_LOADING
  };
};

