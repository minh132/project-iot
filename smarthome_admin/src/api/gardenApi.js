import axiosClient from "./axiosClient";

const gardenApi = {
    //delete garden
    deletegarden: (params) => {
        const url = '/garden/delete';
        return axiosClient.delete(url, {params});
    },

    // update garden data
    updategardenData: (params) => {
        const url = '/garden/update';
        return axiosClient.put(url, params);
    },

    //get gardens list 
    getgardensList: (params) => {
        const url = '/garden/find';
        return axiosClient.get(url, {params});
    },

};

export default gardenApi;
