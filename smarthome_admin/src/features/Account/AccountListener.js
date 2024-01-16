import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Utils from "general/utils/Utils";
import UserHelper from "general/helpers/UserHelper";
import { thunkGetAccountInfor, thunkGetUsersList } from "app/authSlice";
import { thunkGetgardensList } from "app/gardenSlice";
import { thunkGetDevicesList } from "app/deviceSlice";

AccountListener.propTypes = {};

function AccountListener(props) {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.auth.currentAccount);
    useEffect(() => {
        const fetchData = async () => {
            if (
                Utils.isObjectEmpty(loggedInUser) &&
                UserHelper.checkAccessTokenValid()
            ) {
                await dispatch(thunkGetAccountInfor());
                await dispatch(thunkGetUsersList({ q: "" }));
                await dispatch(thunkGetgardensList({ q: "" }));
                await dispatch(thunkGetDevicesList({ q: "" }));
            }
        };
        fetchData();
    }, [loggedInUser]);
    return <div></div>;
}

export default AccountListener;
