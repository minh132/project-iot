import roomApi from "api/roomApi";
import PreferenceKeys from "general/constants/PreferenceKey";
import ToastHelper from "general/helpers/ToastHelper";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const thunkCreateRoom = createAsyncThunk(
    "room/create",
    async (params) => {
        const res = await roomApi.createRoom(params);
        return res;
    }
);

export const thunkDeleteRoom = createAsyncThunk(
    "room/delete",
    async (params) => {
        const res = await roomApi.deleteRoom(params);
        return res;
    }
);

export const thunkGetRoomData = createAsyncThunk(
    "room/detail",
    async (params) => {
        const res = await roomApi.getRoomData(params);
        return res;
    }
);

export const thunkGetRoomsList = createAsyncThunk(
    "room/find",
    async (params) => {
        const res = await roomApi.getRoomsList(params);
        return res;
    }
);

export const thunkUpdateRoomData = createAsyncThunk(
    "room/update",
    async (params) => {
        const res = await roomApi.updateRoomData(params);
        return res;
    }
);

const roomSlice = createSlice({
    name: "room",
    initialState: {
        isGettingRoomData: false,
        isGettingRoomsList: false,
        isCreatingRoom: false,
        isUpdatingRoom: false,
        isDeletingRoom: false,
        currentRoom: {},
        roomsList: [],
    },
    reducers: {
        updateCurrentRoomData: (state, action) => {
            return {
                ...state,
                currentRoom: {
                    ...state.currentRoom,
                    ...action.payload,
                },
            };
        },
        updateRoomsListData: (state, action) => {
            return {
                ...state,
                roomsList: [
                    ...state.roomsList,
                    ...action.payload,
                ],
            };
        },
    },
    extraReducers: {
        //create new room
        [thunkCreateRoom.pending]: (state, action) => {
            state.isCreatingRoom = true;
        },

        [thunkCreateRoom.rejected]: (state, action) => {
            state.isCreatingRoom = false;
        },

        [thunkCreateRoom.fulfilled]: (state, action) => {
            state.isCreatingRoom = false;
        },

        //Get room data
        [thunkGetRoomData.pending]: (state, action) => {
            state.isGettingRoomData = true;
        },

        [thunkGetRoomData.rejected]: (state, action) => {
            state.isGettingRoomData = false;
        },

        [thunkGetRoomData.fulfilled]: (state, action) => {
            state.isGettingRoomData = false;
            const { roomData } = action.payload;
            state.currentRoom = roomData;
        },

        //get rooms list of home
        [thunkGetRoomsList.pending]: (state, action) => {
            state.isGettingRoomsList = true;
        },

        [thunkGetRoomsList.rejected]: (state, action) => {
            state.isGettingRoomsList = false;
        },

        [thunkGetRoomsList.fulfilled]: (state, action) => {
            state.isGettingRoomsList = false;
            const { result, roomsList } = action.payload;
            if (result === "success"){
                state.roomsList = roomsList;
            }
        },

        //update room
        [thunkUpdateRoomData.pending]: (state, action) => {
            state.isUpdatingRoom = true;
        },

        [thunkUpdateRoomData.rejected]: (state, action) => {
            state.isUpdatingRoom = false;
        },

        [thunkUpdateRoomData.fulfilled]: (state, action) => {
            state.isUpdatingRoom = false;
        },

        //delete room
        [thunkDeleteRoom.pending]: (state, action) => {
            state.isDeletingRoom = true;
        },

        [thunkDeleteRoom.rejected]: (state, action) => {
            state.isDeletingRoom = false;
        },

        [thunkDeleteRoom.fulfilled]: (state, action) => {
            state.isDeletingRoom = false;
        },
    },
});

const { reducer, actions } = roomSlice;
export const { updateCurrentRoomData, updateRoomsListData } = actions;
export default reducer;
