import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Utils from 'general/utils/Utils';
import PreferenceKeys from 'general/constants/PreferenceKey';
import { thunkGetGardenData } from './gardenSlice';

GardenListener.propTypes = {
    
};

function GardenListener(props) {
    const dispatch = useDispatch();
  const currentgardenInRedux = useSelector((state) => state.garden.currentgarden);
  const currentgardenInLocal = localStorage.getItem(PreferenceKeys.currentgarden_id);
  useEffect(() => {
      if (
        Utils.isObjectEmpty(currentgardenInRedux) &&
        currentgardenInLocal
      ) {
        dispatch(thunkGetGardenData({gardenId: currentgardenInLocal}));
      }
  }, [currentgardenInRedux, currentgardenInLocal]);
    return (
        <div>
            
        </div>
    );
}

export default GardenListener;