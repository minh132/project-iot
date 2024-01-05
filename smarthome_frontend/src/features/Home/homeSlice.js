import { updateAxiosAccessToken } from "api/axiosClient";
import homeApi from "api/homeApi";
import PreferenceKeys from "general/constants/PreferenceKey";
import ToastHelper from "general/helpers/ToastHelper";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const thunkCreateHome = createAsyncThunk(
    "home/create-home",
    async (params) => {
        const res = await homeApi.createHome(params);
        return res;
    }
);

export const thunkDeleteHome = createAsyncThunk(
    "home/delete-home",
    async (params) => {
        const res = await homeApi.deleteHome(params);
        return res;
    }
);

export const thunkGetHomeData = createAsyncThunk(
    "home/get-home-data",
    async (params) => {
        const res = await homeApi.getHomeData(params);
        return res;
    }
);

export const thunkUpdateHomeData = createAsyncThunk(
    "home/update-home-data",
    async (params) => {
        const res = await homeApi.updateHomeData(params);
        return res;
    }
);

export const thunkGetOtherHomesList = createAsyncThunk(
    "home/get-other-homes-list",
    async (params) => {
        const res = await homeApi.getOtherHomesList(params);
        return res;
    }
);

export const thunkRequestToJoinHome = createAsyncThunk(
    "home/request-to-join-home",
    async (params) => {
        const res = await homeApi.requestToJoinHome(params);
        return res;
    }
);

export const thunkConfirmJoinHome = createAsyncThunk(
    "home/confirm-join-home",
    async (params) => {
        const res = await homeApi.confirmJoinHome(params);
        return res;
    }
);

export const thunkRefuseJoinHome = createAsyncThunk(
    "home/refuse-join-home",
    async (params) => {
        const res = await homeApi.refuseJoinHome(params);
        return res;
    }
);

export const thunkDeleteMember = createAsyncThunk(
    "home/delete-member",
    async (params) => {
        const res = await homeApi.deleteMember(params);
        return res;
    }
);

const homeSlice = createSlice({
    name: "home",
    initialState: {
        isGettingHomeData: false,
        isUpdatingHomeData: false,
        isDeletingHome: false,
        isDeletingMember: false,
        isGettingDataList: false,
        currentHome: {},
        otherHomesList: [],
    },
    reducers: {
        updateCurrentHomeData: (state, action) => {
            return {
                ...state,
                currentHome: {
                    ...state.currentHome,
                    ...action.payload,
                },
            };
        },
        updateOtherHomesListData: (state, action) => {
            return {
                ...state,
                otherHomesList: [
                    ...state.otherHomesList,
                    ...action.payload,
                ],
            };
        },
    },
    extraReducers: {
        //Create Home
        [thunkCreateHome.fulfilled]: (state, action) => {
            const { result, home } = action.payload;
            if (result === "success") {
                state.currentHome = home;
                localStorage.setItem(PreferenceKeys.currentHome_id, home._id);
            }
        },

        //Delete Home
        [thunkDeleteHome.pending]: (state, action) => {
            state.isDeletingHome = true;
        },

        [thunkDeleteHome.rejected]: (state, action) => {
            state.isDeletingHome = false;
        },

        [thunkDeleteHome.fulfilled]: (state, action) => {
            state.isDeletingHome = false;
            localStorage.removeItem(PreferenceKeys.currentHome_id);
            state.currentHome = {};
        },
        
        //Get Other Homes List
        [thunkGetOtherHomesList.pending]: (state, action) => {
            state.isGettingDataList = true;
        },

        [thunkGetOtherHomesList.rejected]: (state, action) => {
            state.isGettingDataList = false;
        },

        [thunkGetOtherHomesList.fulfilled]: (state, action) => {
            state.isGettingDataList = false;
            const { result , otherHomesList } = action.payload;
            state.otherHomesList = otherHomesList;
        },

        //Get Home Data
        [thunkGetHomeData.pending]: (state, action) => {
            state.isGettingHomeData = true;
        },

        [thunkGetHomeData.rejected]: (state, action) => {
            state.isGettingHomeData = false;
        },

        [thunkGetHomeData.fulfilled]: (state, action) => {
            state.isGettingHomeData = false;
            const { homeData } = action.payload;
            state.currentHome = homeData;
            if (homeData._id) {
                localStorage.setItem(PreferenceKeys.currentHome_id, homeData._id);
            }
        },

        //Update Home Data
        [thunkUpdateHomeData.pending]: (state, action) => {
            state.isUpdatingHomeData = true;
        },
        [thunkUpdateHomeData.rejected]: (state, action) => {
            state.isUpdatingHomeData = false;
        },
        [thunkUpdateHomeData.fulfilled]: (state, action) => {
            state.isUpdatingHomeData = false;
            const { result, newHomeData } = action.payload;
            if (result === "success") {
                state.currentHome = { ...state.currentHome, ...newHomeData };
            }
        },

        //Request To Join Home
        [thunkRequestToJoinHome.fulfilled]: (state, action) => {
            const { result, message } = action.payload;
            if (result === "success") {
                ToastHelper.showSuccess(message);
            }
        },

        //Confirm Join Home
        [thunkConfirmJoinHome.fulfilled]: (state, action) => {
            const { result, message } = action.payload;
            if (result === "success") {
                ToastHelper.showSuccess(message);
            }
        },

        //Refuse Join Home
        [thunkRefuseJoinHome.fulfilled]: (state, action) => {
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

const { reducer, actions } = homeSlice;
export const { updateCurrentHomeData, updateOtherHomesListData } = actions;
export default reducer;
