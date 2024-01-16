import axiosClient from "./axiosClient";

const gardenApi = {
    // create garden
    createGarden: (params) => {
        const url = '/garden/create';
        return axiosClient.post(url, params);
    },

    //delete garden
    deleteGarden: (params) => {
        const url = '/garden/delete';
        return axiosClient.delete(url, {params});
    },

    //get garden data
    getGardenData: (params) => {
        const url = '/garden/detail';
        return axiosClient.get(url, {params});
    },

    // update garden data
    updateGardenData: (params) => {
        const url = '/garden/update';
        return axiosClient.put(url, params);
    },

    //get other gardens list 
    getOtherGardensList: (params) => {
        const url = '/garden/find';
        return axiosClient.get(url, {params});
    },

    //request to join garden
    requestToJoinGarden: (params) => {
        const url = '/garden/request-to-join-garden';
        return axiosClient.post(url, params);
    },

    //confirm join garden
    confirmJoinGarden: (params) => {
        const url = '/garden/confirm-join-garden';
        return axiosClient.post(url, params);
    },

    //refuse join garden
    refuseJoinGarden: (params) => {
        const url = '/garden/refuse-join-garden';
        return axiosClient.post(url, params);
    },

    //delete member
    deleteMember: (params) => {
        const url = '/garden/delete-member';
        return axiosClient.delete(url, {params});
    },
};

export default gardenApi;
