import axiosClient from "./axiosClient";

const deviceApi = {
    //delete device
    deleteDevice: (params) => {
        const url = '/device/delete';
        return axiosClient.delete(url, {params});
    },

    // update device data
    updateDeviceData: (params) => {
        const url = '/device/update';
        return axiosClient.put(url, params);
    },

    //get devices list 
    getDevicesList: (params) => {
        const url = '/device/find';
        return axiosClient.get(url, {params});
    },
};

export default deviceApi;
