import axiosClient from "./axiosClient";

const homeApi = {
    // create home
    createHome: (params) => {
        const url = '/home/create';
        return axiosClient.post(url, params);
    },

    //delete home
    deleteHome: (params) => {
        const url = '/home/delete';
        return axiosClient.delete(url, {params});
    },

    //get home data
    getHomeData: (params) => {
        const url = '/home/detail';
        return axiosClient.get(url, {params});
    },

    // update home data
    updateHomeData: (params) => {
        const url = '/home/update';
        return axiosClient.put(url, params);
    },

    //get other homes list 
    getOtherHomesList: (params) => {
        const url = '/home/find';
        return axiosClient.get(url, {params});
    },

    //request to join home
    requestToJoinHome: (params) => {
        const url = '/home/request-to-join-home';
        return axiosClient.post(url, params);
    },

    //confirm join home
    confirmJoinHome: (params) => {
        const url = '/home/confirm-join-home';
        return axiosClient.post(url, params);
    },

    //refuse join home
    refuseJoinHome: (params) => {
        const url = '/home/refuse-join-home';
        return axiosClient.post(url, params);
    },

    //delete member
    deleteMember: (params) => {
        const url = '/home/delete-member';
        return axiosClient.delete(url, {params});
    },
};

export default homeApi;
