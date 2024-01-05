import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Utils from 'general/utils/Utils';
import PreferenceKeys from 'general/constants/PreferenceKey';
import { thunkGetHomeData } from './homeSlice';

HomeListener.propTypes = {
    
};

function HomeListener(props) {
    const dispatch = useDispatch();
  const currentHomeInRedux = useSelector((state) => state.home.currentHome);
  const currentHomeInLocal = localStorage.getItem(PreferenceKeys.currentHome_id);
  useEffect(() => {
      if (
        Utils.isObjectEmpty(currentHomeInRedux) &&
        currentHomeInLocal
      ) {
        dispatch(thunkGetHomeData({homeId: currentHomeInLocal}));
      }
  }, [currentHomeInRedux, currentHomeInLocal]);
    return (
        <div>
            
        </div>
    );
}

export default HomeListener;