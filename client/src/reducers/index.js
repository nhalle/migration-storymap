import { combineReducers } from "redux";
import regionsReducer from "./regionsReducer";
import storiesReducer from "./storiesReducer";
import markersReducer from "./markersReducer";

export default combineReducers({
  regions: regionsReducer,
  stories: storiesReducer,
  markers: markersReducer,
});