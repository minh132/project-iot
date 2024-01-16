import { updateAxiosAccessToken } from "api/axiosClient";
import gardenApi from "api/gardenApi";
import PreferenceKeys from "general/constants/PreferenceKey";
import ToastHelper from "general/helpers/ToastHelper";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const thunkCreateGarden = createAsyncThunk(
    "garden/create-garden",
    async (params) => {
        const res = await gardenApi.createGarden(params);
        return res;
    }
);

export const thunkDeleteGarden = createAsyncThunk(
    "garden/delete-garden",
    async (params) => {
        const res = await gardenApi.deleteGarden(params);
        return res;
    }
);

export const thunkGetGardenData = createAsyncThunk(
    "garden/get-garden-data",
    async (params) => {
        const res = await gardenApi.getGardenData(params);
        return res;
    }
);

export const thunkUpdateGardenData = createAsyncThunk(
    "garden/update-garden-data",
    async (params) => {
        const res = await gardenApi.updateGardenData(params);
        return res;
    }
);

export const thunkGetOtherGardensList = createAsyncThunk(
    "garden/get-other-gardens-list",
    async (params) => {
        const res = await gardenApi.getOtherGardensList(params);
        return res;
    }
);

export const thunkRequestToJoinGarden = createAsyncThunk(
    "garden/request-to-join-garden",
    async (params) => {
        const res = await gardenApi.requestToJoinGarden(params);
        return res;
    }
);

export const thunkConfirmJoinGarden = createAsyncThunk(
    "garden/confirm-join-garden",
    async (params) => {
        const res = await gardenApi.confirmJoinGarden(params);
        return res;
    }
);

export const thunkRefuseJoinGarden = createAsyncThunk(
    "garden/refuse-join-garden",
    async (params) => {
        const res = await gardenApi.refuseJoinGarden(params);
        return res;
    }
);

export const thunkDeleteMember = createAsyncThunk(
    "garden/delete-member",
    async (params) => {
        const res = await gardenApi.deleteMember(params);
        return res;
    }
);

const gardenSlice = createSlice({
    name: "garden",
    initialState: {
        isGettingGardenData: false,
        isUpdatingGardenData: false,
        isDeletingGarden: false,
        isDeletingMember: false,
        isGettingDataList: false,
        currentGarden: {},
        otherGardensList: [],
    },
    reducers: {
        updateCurrentGardenData: (state, action) => {
            return {
                ...state,
                currentgarden: {
                    ...state.currentgarden,
                    ...action.payload,
                },
            };
        },
        updateOtherGardensListData: (state, action) => {
            return {
                ...state,
                othergardensList: [
                    ...state.othergardensList,
                    ...action.payload,
                ],
            };
        },
    },
    extraReducers: {
        //Create garden
        [thunkCreateGarden.fulfilled]: (state, action) => {
            const { result, garden } = action.payload;
            if (result === "success") {
                state.currentgarden = garden;
                localStorage.setItem(PreferenceKeys.currentgarden_id, garden._id);
            }
        },

        //Delete garden
        [thunkDeleteGarden.pending]: (state, action) => {
            state.isDeletinggarden = true;
        },

        [thunkDeleteGarden.rejected]: (state, action) => {
            state.isDeletinggarden = false;
        },

        [thunkDeleteGarden.fulfilled]: (state, action) => {
            state.isDeletinggarden = false;
            localStorage.removeItem(PreferenceKeys.currentgarden_id);
            state.currentgarden = {};
        },
        
        //Get Other gardens List
        [thunkGetOtherGardensList.pending]: (state, action) => {
            state.isGettingDataList = true;
        },

        [thunkGetOtherGardensList.rejected]: (state, action) => {
            state.isGettingDataList = false;
        },

        [thunkGetOtherGardensList.fulfilled]: (state, action) => {
            state.isGettingDataList = false;
            const { result , othergardensList } = action.payload;
            state.othergardensList = othergardensList;
        },

        //Get garden Data
        [thunkGetGardenData.pending]: (state, action) => {
            state.isGettinggardenData = true;
        },

        [thunkGetGardenData.rejected]: (state, action) => {
            state.isGettinggardenData = false;
        },

        [thunkGetGardenData.fulfilled]: (state, action) => {
            state.isGettinggardenData = false;
            const { gardenData } = action.payload;
            state.currentgarden = gardenData;
            if (gardenData._id) {
                localStorage.setItem(PreferenceKeys.currentgarden_id, gardenData._id);
            }
        },

        //Update garden Data
        [thunkUpdateGardenData.pending]: (state, action) => {
            state.isUpdatinggardenData = true;
        },
        [thunkUpdateGardenData.rejected]: (state, action) => {
            state.isUpdatinggardenData = false;
        },
        [thunkUpdateGardenData.fulfilled]: (state, action) => {
            state.isUpdatinggardenData = false;
            const { result, newgardenData } = action.payload;
            if (result === "success") {
                state.currentgarden = { ...state.currentgarden, ...newgardenData };
            }
        },

        //Request To Join garden
        [thunkRequestToJoinGarden.fulfilled]: (state, action) => {
            const { result, message } = action.payload;
            if (result === "success") {
                ToastHelper.showSuccess(message);
            }
        },

        //Confirm Join garden
        [thunkConfirmJoinGarden.fulfilled]: (state, action) => {
            const { result, message } = action.payload;
            if (result === "success") {
                ToastHelper.showSuccess(message);
            }
        },

        //Refuse Join garden
        [thunkRefuseJoinGarden.fulfilled]: (state, action) => {
            const { result, message } = action.payload;
            if (result === "success") {
                ToastHelper.showSuccess(message);
            }
        },

        //Delete Member
        [thunkDeleteMember.pending]: (state, action) => {
            state.isDeletingMember = true;
        },

        [thunkDeleteMember.rejected]: (state, action) => {
            state.isDeletingMember = false;
        },

        [thunkDeleteMember.fulfilled]: (state, action) => {
            state.isDeletingMember = false;
        },
    },
});

const { reducer, actions } = gardenSlice;
export const { updateCurrentGardenData, updateOtherGardensListData } = actions;
export default reducer;
