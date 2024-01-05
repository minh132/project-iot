import deviceApi from "api/deviceApi";
import PreferenceKeys from "general/constants/PreferenceKey";
import ToastHelper from "general/helpers/ToastHelper";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const thunkCreateDevice = createAsyncThunk(
    "device/create",
    async (params) => {
        const res = await deviceApi.createDevice(params);
        return res;
    }
);

export const thunkDeleteDevice = createAsyncThunk(
    "device/delete",
    async (params) => {
        const res = await deviceApi.deleteDevice(params);
        return res;
    }
);

export const thunkControlDevice = createAsyncThunk(
    "device/control",
    async (params) => {
        const res = await deviceApi.controlDevice(params);
        return res;
    }
);

export const thunkGetTemperatureAndHumidity = createAsyncThunk(
    "device/temperature-humidity",
    async (params) => {
        const res = await deviceApi.getTemperatureAndHumidity(params);
        return res;
    }
);
// export const thunkGetHumidity = createAsyncThunk(
//     "device/humidity",
//     async (params) => {
//         const res = await deviceApi.getHumidity(params);
//         return res;
//     }
// );

export const thunkGetDeviceData = createAsyncThunk(
    "device/detail",
    async (params) => {
        const res = await deviceApi.getDeviceData(params);
        return res;
    }
);

export const thunkGetDevicesListOfHome = createAsyncThunk(
    "device/find-by-home",
    async (params) => {
        const res = await deviceApi.getDevicesListOfHome(params);
        return res;
    }
);

export const thunkGetDevicesListOfRoom = createAsyncThunk(
    "device/find-by-room",
    async (params) => {
        const res = await deviceApi.getDevicesListOfRoom(params);
        return res;
    }
);

export const thunkUpdateDeviceData = createAsyncThunk(
    "device/update",
    async (params) => {
        const res = await deviceApi.updateDeviceData(params);
        return res;
    }
);

const deviceSlice = createSlice({
    name: "device",
    initialState: {
        isOpenControlDeviceModal: false,
        isGettingDeviceData: false,
        isGettingDevicesList: false,
        isCreatingDevice: false,
        isUpdatingDevice: false,
        isDeletingDevice: false,
        currentDevice: {},
        temperature: "",
        humidity: "",
        lightSensor: "",
        devicesListOfHome: [],
        devicesListOfRoom: [],
    },
    reducers: {
        setIsOpenControlDeviceModal: (state, action) => {
            state.isOpenControlDeviceModal = action.payload.isOpenModal;
            state.currentDevice = action.payload.deviceItem;
        },
        updateTemperatureAndHumidity: (state, action) => {
            const data = action.payload;
            state.temperature = data.temperature;
            state.humidity = data.humidity;
        },
        updateLightSensorValue: (state, action) => {
            const data = action.payload;
            state.lightSensor = data.lightSensor;
        },
        updateCurrentDeviceData: (state, action) => {
            return {
                ...state,
                currentDevice: {
                    ...state.currentDevice,
                    ...action.payload,
                },
            };
        },
        updateDevicesListOfHome: (state, action) => {
            try {
                const { deviceId, data, control, automatic } = action.payload;
                const { devicesListOfHome } = state;
                for (let i = 0; i < devicesListOfHome.length; i++) {
                    if (devicesListOfHome[i]._id === deviceId) {
                        devicesListOfHome[i].data = data;
                        devicesListOfHome[i].control = control;
                        devicesListOfHome[i].automatic = automatic;
                    }
                }
                state.devicesListOfHome = devicesListOfHome;
            } catch (error) {
                console.log(error);
            }
        },
    },
    extraReducers: {
        //create new device
        [thunkCreateDevice.pending]: (state, action) => {
            state.isCreatingDevice = true;
        },

        [thunkCreateDevice.rejected]: (state, action) => {
            state.isCreatingDevice = false;
        },

        [thunkCreateDevice.fulfilled]: (state, action) => {
            state.isCreatingDevice = false;
        },

        //get device data
        [thunkGetDeviceData.pending]: (state, action) => {
            state.isGettingDeviceData = true;
        },

        [thunkGetDeviceData.rejected]: (state, action) => {
            state.isGettingDeviceData = false;
        },

        [thunkGetDeviceData.fulfilled]: (state, action) => {
            state.isGettingDeviceData = false;
            const { result, deviceData } = action.payload;
            if (result === "success") {
                state.currentDevice = deviceData;
            }
        },

        [thunkControlDevice.fulfilled]: (state, action) => {
            const { status, currentDevice } = action.payload;
            const deviceId = action.meta.arg.deviceId;
            for (let i = 0; i < state.devicesListOfHome.length; i++) {
                if (state.devicesListOfHome[i]._id === deviceId) {
                    state.devicesListOfHome[i].control =
                        action.meta.arg.control;
                    state.devicesListOfHome[i].automatic =
                        action.meta.arg.automatic;
                }
            }
        },

        //get devices list of home
        [thunkGetDevicesListOfHome.pending]: (state, action) => {
            state.isGettingDevicesList = true;
        },

        [thunkGetDevicesListOfHome.rejected]: (state, action) => {
            state.isGettingDevicesList = false;
        },

        [thunkGetDevicesListOfHome.fulfilled]: (state, action) => {
            state.isGettingDevicesList = false;
            const { result, devicesListOfHome } = action.payload;
            if (result === "success") {
                state.devicesListOfHome = devicesListOfHome;
            }
        },

        //get devices list of room
        [thunkGetDevicesListOfRoom.pending]: (state, action) => {
            state.isGettingDevicesList = true;
        },

        [thunkGetDevicesListOfRoom.rejected]: (state, action) => {
            state.isGettingDevicesList = false;
        },

        [thunkGetDevicesListOfRoom.fulfilled]: (state, action) => {
            state.isGettingDevicesList = false;
            const { result, devicesListOfRoom } = action.payload;
            if (result === "success") {
                state.devicesListOfRoom = devicesListOfRoom;
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
export const {
    setIsOpenControlDeviceModal,
    updateTemperatureAndHumidity,
    updateLightSensorValue,
    updateCurrentDeviceData,
    updateDevicesListOfHome,
} = actions;
export default reducer;
