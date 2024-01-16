import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Utils from 'general/utils/Utils';
import UserHelper from 'general/helpers/UserHelper';
import { thunkGetAccountInfor } from 'app/authSlice';

AccountListener.propTypes = {
    
};

function AccountListener(props) {
    const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.currentAccount);
  useEffect(() => {
    if (
      Utils.isObjectEmpty(loggedInUser) &&
      UserHelper.checkAccessTokenValid()
    ) {
      dispatch(thunkGetAccountInfor());
    }
  }, [loggedInUser]);
    return (
        <div>
            
        </div>
    );
}

export default AccountListener;