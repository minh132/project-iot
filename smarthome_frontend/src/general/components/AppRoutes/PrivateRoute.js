import React from 'react';
import PropTypes from 'prop-types';
import UserHelper from 'general/helpers/UserHelper';
import { Navigate } from 'react-router-dom';

PrivateRoute.propTypes = {
    
};

function PrivateRoute(props) {
    // MARK: --- Params ---
    const isAuth = UserHelper.checkAccessTokenValid();

    return isAuth
        ? props.children
        : <Navigate to='/sign-in' />
}

export default PrivateRoute;