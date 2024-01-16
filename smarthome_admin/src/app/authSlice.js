import { updateAxiosAccessToken } from "api/axiosClient";
import ToastHelper from "general/helpers/ToastHelper";
import authApi from "api/authApi";
import PreferenceKeys from "general/constants/PreferenceKey";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const thunkSignIn = createAsyncThunk(
    "auth/sign-in",
    async (params, thunkApi) => {
        const res = await authApi.signIn(params);
        console.log(res);
        return res;
    }
);

export const thunkGetAccountInfor = createAsyncThunk(
    "account/get-account-infor",
    async (params, thunkApi) => {
        const res = await authApi.getAccountInfor(params);
        return res;
    }
);

export const thunkChangePassword = createAsyncThunk(
    "account/change-password",
    async (params, thunkApi) => {
        const res = await authApi.changePassword(params);
        return res;
    }
);

export const thunkEditProfile = createAsyncThunk(
  "account/update",
  async (params) => {
    const res = await authApi.updateProfile(params);
    return res;
  }
);

export const thunkGetUsersList = createAsyncThunk(
    "account/users-list",
    async (params) => {
        const res = await authApi.getUsersList(params);
        return res;
    }
);

export const thunkDeleteUser = createAsyncThunk(
    "account/delete-user",
    async (params) => {
        const res = await authApi.deleteUser(params);
        return res;
    }
);

export const thunkSignOut = createAsyncThunk(
    "auth/sign-out",
    async (params) => {
        const res = await authApi.signOut(params);
        return res;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loggedIn: false,
        isSigningIn: false,
        isGettingUsersList: false,
        isDeletingUser: false,
        isChangingPassword: false,
        currentAccount: {},
        usersList : [],
        isOnlineStatus: false,
    },
    reducers: {
        updateCurrentAccountInfor: (state, action) => {
            return {
                ...state,
                currentAccount: {
                    ...state.currentAccount,
                    ...action.payload,
                },
            };
        },

        setOnlineStatus: (state, action) => {
            state.isOnlineStatus = action.payload;
        },
    },
    extraReducers: {
        //sign in
        [thunkSignIn.pending]: (state, action) => {
            state.isSigningIn = true;
        },

        [thunkSignIn.rejected]: (state, action) => {
            state.isSigningIn = false;
        },

        [thunkSignIn.fulfilled]: (state, action) => {
            state.isSigningIn = false;
            const { account } = action.payload;
            state.loggedIn = true;
            state.currentAccount = account;
            const { accessToken, expirationDateToken } = account;
            if (accessToken) {
                localStorage.setItem(PreferenceKeys.adminSgarden_accessToken, accessToken);
                updateAxiosAccessToken(accessToken);
            }
        },
        //get current account infor
        [thunkGetAccountInfor.pending]: (state, action) => {
            state.isGettingInfor = true;
        },

        [thunkGetAccountInfor.rejected]: (state, action) => {
            state.isGettingInfor = false;
        },

        [thunkGetAccountInfor.fulfilled]: (state, action) => {
            state.isGettingInfor = false;
            const { accountData } = action.payload;
            if (accountData) {
                state.currentAccount = accountData;
                state.loggedIn = true;

                const { accessToken } = accountData;
                if (accessToken) {
                    localStorage.setItem(
                        PreferenceKeys.adminSgarden_accessToken,
                        accessToken
                    );
                    updateAxiosAccessToken(accessToken);
                }
            }
        },

         //Get  Users List
         [thunkGetUsersList.pending]: (state, action) => {
            state.isGettingUsersList = true;
        },

        [thunkGetUsersList.rejected]: (state, action) => {
            state.isGettingUsersList = false;
        },

        [thunkGetUsersList.fulfilled]: (state, action) => {
            state.isGettingUsersList = false;
            const { result , usersList } = action.payload;
            state.usersList = usersList;
        },

         //Get delete user
         [thunkDeleteUser.pending]: (state, action) => {
            state.isDeletingUser = true;
        },

        [thunkDeleteUser.rejected]: (state, action) => {
            state.isDeletingUser = false;
        },

        [thunkDeleteUser.fulfilled]: (state, action) => {
            state.isDeletingUser = false;
        },

        //Change password
        [thunkChangePassword.pending]: (state, action) => {
            state.isChangingPassword = true;
        },

        [thunkChangePassword.rejected]: (state, action) => {
            state.isChangingPassword = false;
        },
        [thunkChangePassword.fulfilled]: (state, action) => {
            state.isChangingPassword = false;
            const { result } = action.payload;
            if (result === "success") {
                ToastHelper.showSuccess("Đổi mật khẩu thành công")
            }
        },


        // log out
        [thunkSignOut.fulfilled]: (state, action) => {
            const { result } = action.payload;
            if (result === "success") {
                localStorage.removeItem(PreferenceKeys.adminSgarden_accessToken);
                state.currentAccount = {};
                state.loggedIn = false;
            }
        },

        //
    },
});

const { reducer, actions } = authSlice;
export const { updateCurrentAccountInfor, setOnlineStatus } = actions;
export default reducer;
