import axiosClient from "./axiosClient";

const authApi = {
    // sign in
    signIn: (params) => {
        const url = '/admin-account/sign-in';
        return axiosClient.post(url, params);
    },


    //getAccountInfor
    getAccountInfor: () => {
        const url = '/account/detail';
        return axiosClient.get(url);
    },

    // edit personal information
    updateProfile: (params) => {
        const url = '/account/update-user';
        return axiosClient.put(url, params);
    },

    //log out 
    signOut: () => {
        const url = '/account/sign-out';
        return axiosClient.post(url);
    },


    // change password
    changePassword: (params) => {
        const url = '/account/change-password';
        return axiosClient.put(url, params);
    },

    //get users list 
    getUsersList: (params) => {
        const url = '/account/find';
        return axiosClient.get(url, {params});
    },

    //delete user
    deleteUser: (params) => {
        const url = '/account/delete-user';
        return axiosClient.delete(url, {params});
    },
};

export default authApi;
