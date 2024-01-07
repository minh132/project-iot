import { removeAxiosAccessToken } from "api/axiosClient";
import AppResource from "general/constants/AppResource";
import PreferenceKeys from "general/constants/PreferenceKey";
import Utils from "general/utils/Utils";
import _ from "lodash";
import moment from 'moment';

const UserHelper = {
    // Get random avatar url
    getRandomAvatarUrl: () => {
        return 'https://i.ibb.co/8XSJPTb/avatar.jpg';
    },

    // Check access token valid
    checkAccessTokenValid: () => {
        const accessToken = localStorage.getItem(PreferenceKeys.accessToken);
        // const accessTokenExpired = localStorage.getItem(PreferenceKeys.accessTokenExpired);
        if (accessToken ) {
            // const momentExpired = moment.utc(accessTokenExpired);
            // const momentNow = moment.utc();
            // return momentExpired.isAfter(momentNow);
            return true;
        }

        return false;
    },

    // Get display name
    getDisplayName: (account) => {
        if (account) {
            return account.fullname ?? account.email ?? 'Unknown';
        }
        return '';
    },

    // Get avatar
    getAvatar: (account) => {
        if (account) {
            return account.avatar ?? UserHelper.getRandomAvatarUrl();
        }
        return UserHelper.getRandomAvatarUrl();
    },

    // Sign out
    signOut: () => {
        localStorage.removeItem(PreferenceKeys.accessToken);
        localStorage.removeItem(PreferenceKeys.accessTokenExpired);
        removeAxiosAccessToken();
    },

    isHSMAuthen: (account) => {
        const isAuthen = !_.isEmpty(account?.hsmAgreementUUID) && !_.isEmpty(account?.hsmPasscode);
        return isAuthen;
    },

    isHasRemoteSigning: (account) => {
        return account?.hasRemoteSigningP12 ?? false;
    },

    getAccountAvatar: (account) => {
        const avatar = account?.avatar;
        if (avatar) {
            return Utils.getFullUrl(avatar);
        } else {
            return AppResource.images.imgDefaultAvatar;
        }
    },
    renderGender: (gender) => {
        switch (gender) {
            case "Nam":
                return "Nam";
            case "Nữ":
                return "Nữ";
            case "Khác":
                return "Khác";
            default:
                break;
        }
    },
};

export default UserHelper;