import deviceApi from "api/deviceApi";
import PreferenceKeys from "general/constants/PreferenceKey";
import ToastHelper from "general/helpers/ToastHelper";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const thunkDeleteDevice = createAsyncThunk(
    "device/delete",
    async (params) => {
        const res = await deviceApi.deleteDevice(params);
        console.log(res);
        return res;
    }
);

export const thunkGetDevicesList = createAsyncThunk(
    "device/devices-list",
    async (params) => {
        const res = await deviceApi.getDevicesList(params);
        return res;
    }
);

export const thunkUpdateDeviceData = createAsyncThunk(
    "device/update",
    async (params) => {
        const res = await deviceApi.updateDeviceData(params);
        console.log(res);
        return res;
    }
);

const deviceSlice = createSlice({
    name: "device",
    initialState: {
        isGettingDevicesList: false,
        isUpdatingDevice: false,
        isDeletingDevice: false,
        devicesList: [],
    },
    reducers: {
        updateDevicesListData: (state, action) => {
            return {
                ...state,
                devicesList: [...state.devicesList, ...action.payload],
            };
        },
    },
    extraReducers: {
        //get devices list
        [thunkGetDevicesList.pending]: (state, action) => {
            state.isGettingDevicesList = true;
        },

        [thunkGetDevicesList.rejected]: (state, action) => {
            state.isGettingDevicesList = false;
        },

        [thunkGetDevicesList.fulfilled]: (state, action) => {
            state.isGettingDevicesList = false;
            const { result, devicesList } = action.payload;
            if (result === "success") {
                state.devicesList = devicesList;
            }
        },


        //update device
        [thunkUpdateDeviceData.pending]: (state, action) => {
            state.isUpdatingDevice = true;
        },

        [thunkUpdateDeviceData.rejected]: (state, action) => {
            state.isUpdatingDevice = false;
        },

        [thunkUpdateDeviceData.fulfilled]: (state, action) => {
            state.isUpdatingDevice = false;
        },

        //delete device
        [thunkDeleteDevice.pending]: (state, action) => {
            state.isDeletingDevice = true;
        },

        [thunkDeleteDevice.rejected]: (state, action) => {
            state.isDeletingDevice = false;
        },

        [thunkDeleteDevice.fulfilled]: (state, action) => {
            state.isDeletingDevice = false;
        },
    },
});

const { reducer, actions } = deviceSlice;
export const { updateDevicesListData } = actions;
export default reducer;
