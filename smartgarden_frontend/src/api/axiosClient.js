// api/axiosClient.js
import axios from "axios";
import PreferenceKeys from "general/constants/PreferenceKey";
import ToastHelper from "general/helpers/ToastHelper";
import UserHelper from "general/helpers/UserHelper";
// import PreferenceKeys from '../general/constants/PreferenceKeys';
// import ToastHelper from '../general/helpers/ToastHelper';
// import UserHelper from '../general/helpers/UserHelper';
import queryString from "query-string";

const sTag = "[AxiosClient]";
// Cai dat config mac dinh cho http request
// Tham khao: `https://github.com/axios/axios#request-config`
// de xem chi tiet
const axiosClient = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // console.log(`${sTag} - ${config.baseURL}${config.url}, ${config.method}, ${config.method === 'post' ? JSON.stringify(config.data) : JSON.stringify(config.params)}`);
    console.log(`${sTag} - headers: ${JSON.stringify(config.headers.common)}`);
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        console.log(`${sTag} - ${error}`);
        let errorMessage = null;
        const response = error.response;
        if (response && (response.status === 403 || response.status === 401)) {
            UserHelper.signOut();
            window.location.href = "/sign-in";
            return;
        }
        if (response && response.data) {
            const data = response.data;
            // const { result, reason, detail } = data;
            // if (result === 'failed') {
            //     if (reason) {
            //         errorMessage = reason;
            //     } else if (detail) {
            //         errorMessage = detail;
            //     }
            // }
            const { result, message } = response.data;
            if (result === "failed") {
                errorMessage = message;
            }
        }
        if (errorMessage) {
            ToastHelper.showError(errorMessage);
        }
        throw error;
    }
);

// Update base url
const updateAxiosBaseURL = (baseUrl) => {
    axiosClient.defaults.baseURL = baseUrl;
};

// Update access token
const updateAxiosAccessToken = (accessToken) => {
    axiosClient.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${accessToken}`;
};

// Remove access token
const removeAxiosAccessToken = () => {
    delete axiosClient.defaults.headers.common["Authorization"];
};

(() => {
    const isTokenValid = UserHelper.checkAccessTokenValid();
    if (isTokenValid) {
        const token = localStorage.getItem(PreferenceKeys.accessToken);
        updateAxiosAccessToken(token);
    } else {
        UserHelper.signOut();
    }
})();

export { updateAxiosAccessToken, removeAxiosAccessToken, updateAxiosBaseURL };

export default axiosClient;
