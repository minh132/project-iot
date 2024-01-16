// Import reducers
import authReducer from "./authSlice";
import gardenReducer from "../features/Garden/gardenSlice";
import roomReducer from "../features/Room/roomSlice";
import deviceReducer from "../features/Device/deviceSlice";

const {
  configureStore
} = require("@reduxjs/toolkit");

// root reducer
const rootReducer = {
  auth: authReducer,
  garden: gardenReducer,
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
