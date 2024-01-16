import axiosClient from "./axiosClient";

const authApi = {
    // sign in
    signIn: (params) => {
        const url = '/account/sign-in';
        return axiosClient.post(url, params);
    },

    //sign up
    signUp: (params) => {
        const url = '/account/sign-up';
        return axiosClient.post(url, params);
    },

    //getAccountInfor
    getAccountInfor: () => {
        const url = '/account/detail';
        return axiosClient.get(url);
    },

    // edit personal information
    updateProfile: (params) => {
        const url = '/account/update';
        return axiosClient.put(url, params);
    },

    //log out 
    signOut: () => {
        const url = '/account/sign-out';
        return axiosClient.post(url);
    },

    //request reset password
    requestToResetPassword: (params) => {
        const url = '/account/request-reset-password';
        return axiosClient.post(url, params);
    },

    // change password
    changePassword: (params) => {
        const url = '/account/change-password';
        return axiosClient.put(url, params);
    },
};

export default authApi;
