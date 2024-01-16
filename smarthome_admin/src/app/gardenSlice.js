import { updateAxiosAccessToken } from "api/axiosClient";
import gardenApi from "api/gardenApi";
import PreferenceKeys from "general/constants/PreferenceKey";
import ToastHelper from "general/helpers/ToastHelper";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const thunkDeletegarden = createAsyncThunk(
    "garden/delete-garden",
    async (params) => {
        const res = await gardenApi.deletegarden(params);
        console.log(res);
        return res;
    }
);

export const thunkUpdategardenData = createAsyncThunk(
    "garden/update-garden-data",
    async (params) => {
        const res = await gardenApi.updategardenData(params);
        console.log(res);
        return res;
    }
);

export const thunkGetgardensList = createAsyncThunk(
    "garden/gardens-list",
    async (params) => {
        const res = await gardenApi.getgardensList(params);
        return res;
    }
);


const gardenSlice = createSlice({
    name: "garden",
    initialState: {
        isUpdatinggardenData: false,
        isDeletinggarden: false,
        isGettingDataList: false,
        gardensList: [],
    },
    reducers: {
        updategardensListData: (state, action) => {
            return {
                ...state,
                gardensList: [
                    ...state.gardensList,
                    ...action.payload,
                ],
            };
        },
    },
    extraReducers: {
        //Delete garden
        [thunkDeletegarden.pending]: (state, action) => {
            state.isDeletinggarden = true;
        },

        [thunkDeletegarden.rejected]: (state, action) => {
            state.isDeletinggarden = false;
        },

        [thunkDeletegarden.fulfilled]: (state, action) => {
            state.isDeletinggarden = false;
        },
        
        //Get  gardens List
        [thunkGetgardensList.pending]: (state, action) => {
            state.isGettingDataList = true;
        },

        [thunkGetgardensList.rejected]: (state, action) => {
            state.isGettingDataList = false;
        },

        [thunkGetgardensList.fulfilled]: (state, action) => {
            state.isGettingDataList = false;
            const { result , othergardensList } = action.payload;
            state.gardensList = othergardensList;
        },

        //Update garden Data
        [thunkUpdategardenData.pending]: (state, action) => {
            state.isUpdatinggardenData = true;
        },
        [thunkUpdategardenData.rejected]: (state, action) => {
            state.isUpdatinggardenData = false;
        },
        [thunkUpdategardenData.fulfilled]: (state, action) => {
            state.isUpdatinggardenData = false;
        },
    },
});

const { reducer, actions } = gardenSlice;
export const { updategardensListData } = actions;
export default reducer;
