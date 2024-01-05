// Import reducers
import authReducer from "./authSlice";
import homeReducer from "../features/Home/homeSlice";
import roomReducer from "../features/Room/roomSlice";
import deviceReducer from "../features/Device/deviceSlice";

const {
  configureStore
} = require("@reduxjs/toolkit");

// root reducer
const rootReducer = {
  auth: authReducer,
  home: homeReducer,
  room: roomReducer,
  device: deviceReducer,
};

// app store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_DEV_TOOLS == 1 ? true : false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
