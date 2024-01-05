import { updateAxiosAccessToken } from "api/axiosClient";
import ToastHelper from "general/helpers/ToastHelper";
import authApi from "api/authApi";
import PreferenceKeys from "general/constants/PreferenceKey";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const thunkSignIn = createAsyncThunk(
    "auth/sign-in",
    async (params, thunkApi) => {
        const res = await authApi.signIn(params);
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

export const thunkRequestToResetPassword = createAsyncThunk(
    "account/request-reset-password",
    async (params, thunkApi) => {
        const res = await authApi.requestToResetPassword(params);
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
        isChangingPassword: false,
        currentAccount: {},
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
                localStorage.setItem(PreferenceKeys.accessToken, accessToken);
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
                        PreferenceKeys.accessToken,
                        accessToken
                    );
                    updateAxiosAccessToken(accessToken);
                }
            }
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

        //Request to reset password
        [thunkRequestToResetPassword.fulfilled]: (state, action) => {
            const { result } = action.payload;
            if (result === "success") {
                ToastHelper.showSuccess("Mật khẩu mới đã được gửi tới email của bạn. Vui lòng kiểm tra hòm thư (bao gồm cả hòm thư rác).")
            }
        },

        // log out
        [thunkSignOut.fulfilled]: (state, action) => {
            const { result } = action.payload;
            if (result === "success") {
                localStorage.removeItem(PreferenceKeys.accessToken);
                state.currentAccount = {};
                state.loggedIn = false;
                localStorage.removeItem(PreferenceKeys.currentHome_id);
                state.currentHome = {};
            }
        },

        //
    },
});

const { reducer, actions } = authSlice;
export const { updateCurrentAccountInfor, setOnlineStatus } = actions;
export default reducer;
