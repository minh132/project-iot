import axiosClient from "./axiosClient";

const roomApi = {
    // create room
    createRoom: (params) => {
        const url = '/room/create';
        return axiosClient.post(url, params);
    },

    //delete room
    deleteRoom: (params) => {
        const url = '/room/delete';
        return axiosClient.delete(url, {params});
    },

    //get room data
    getRoomData: (params) => {
        const url = '/room/detail';
        return axiosClient.get(url, {params});
    },

    //get rooms list
    getRoomsList: (params) => {
        const url = '/room/find';
        return axiosClient.get(url, {params});
    },

    // update room data
    updateRoomData: (params) => {
        const url = '/room/update';
        return axiosClient.put(url, params);
    },
};

export default roomApi;
