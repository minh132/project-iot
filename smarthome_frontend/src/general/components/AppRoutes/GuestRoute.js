import React from 'react';
import PropTypes from 'prop-types';
import UserHelper from 'general/helpers/UserHelper';
import { Navigate } from 'react-router-dom';

GuestRoute.propTypes = {
    
};

function GuestRoute(props) {
    const isAuth = UserHelper.checkAccessTokenValid();

    return !isAuth
        ? props.children
        : <Navigate to='/dashboard' />
}

export default GuestRoute;