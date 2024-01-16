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

export const thunkGetDevicesListOfGarden = createAsyncThunk(
    "device/find-by-garden",
    async (params) => {
        const res = await deviceApi.getDevicesListOfGarden(params);
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
        devicesListOfgarden: [],
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
        updateDevicesListOfGarden: (state, action) => {
            try {
                const { deviceId, data, control, automatic } = action.payload;
                const { devicesListOfgarden } = state;
                for (let i = 0; i < devicesListOfgarden.length; i++) {
                    if (devicesListOfgarden[i]._id === deviceId) {
                        devicesListOfgarden[i].data = data;
                        devicesListOfgarden[i].control = control;
                        devicesListOfgarden[i].automatic = automatic;
                    }
                }
                state.devicesListOfgarden = devicesListOfgarden;
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
            for (let i = 0; i < state.devicesListOfgarden.length; i++) {
                if (state.devicesListOfgarden[i]._id === deviceId) {
                    state.devicesListOfgarden[i].control =
                        action.meta.arg.control;
                    state.devicesListOfgarden[i].automatic =
                        action.meta.arg.automatic;
                }
            }
        },

        //get devices list of garden
        [thunkGetDevicesListOfGarden.pending]: (state, action) => {
            state.isGettingDevicesList = true;
        },

        [thunkGetDevicesListOfGarden.rejected]: (state, action) => {
            state.isGettingDevicesList = false;
        },

        [thunkGetDevicesListOfGarden.fulfilled]: (state, action) => {
            state.isGettingDevicesList = false;
            const { result, devicesListOfgarden } = action.payload;
            if (result === "success") {
                state.devicesListOfgarden = devicesListOfgarden;
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
    updateDevicesListOfGarden,
} = actions;
export default reducer;
