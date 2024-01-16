import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

AppLoader.propTypes = {
    customHeight: PropTypes.string,
};

AppLoader.defaultProps = {
    customHeight: '100%'
}

function AppLoader(props) {
    const { customHeight } = props;
    return (
        <div className='AppLoader d-flex align-items-center justify-content-center' style={{
            height: customHeight,
        }}>
            <div className="lds-dual-ring"></div>
        </div>
    );
}

export default AppLoader;