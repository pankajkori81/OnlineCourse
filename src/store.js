import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./components/PagesData/dashboardSlice.js";
import courseListReducer from "./components/PagesData/courseListSlice.js";


export default configureStore({
  reducer: {
    dashboard: dashboardReducer,
    courses: courseListReducer,
  },
});
