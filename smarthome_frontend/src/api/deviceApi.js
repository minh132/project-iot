import axiosClient from "./axiosClient";

const deviceApi = {
    // create device
    createDevice: (params) => {
        const url = "/device/create";
        return axiosClient.post(url, params);
    },

    //delete device
    deleteDevice: (params) => {
        const url = "/device/delete";
        return axiosClient.delete(url, { params });
    },

    //control Device
    controlDevice: (params) => {
        const url = "/device/control";
        return axiosClient.post(url, params);
    },

    //get temperature
    getTemperatureAndHumidity: (params) => {
        const url = "/device/temperature-humidity";
        return axiosClient.get(url, { params });
    },

    //get humidity
    // getHumidity: (params) => {
    //     const url = '/device/humidity';
    //     return axiosClient.get(url, {params});
    // },

    //get device list of home
    getDevicesListOfHome: (params) => {
        const url = "/device/find-by-home";
        return axiosClient.get(url, { params });
    },

    //get device list of room
    getDevicesListOfRoom: (params) => {
        const url = "/device/find-by-room";
        return axiosClient.get(url, { params });
    },

    // update device data
    updateDeviceData: (params) => {
        const url = "/device/update";
        return axiosClient.put(url, params);
    },
};

export default deviceApi;
