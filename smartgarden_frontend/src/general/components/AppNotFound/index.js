import AppResource from 'general/constants/AppResource';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppButton from '../AppButton';
import './style.scss';

NotFound.propTypes = {

};

function NotFound(props) {
    // MARK: --- Params ---
    const navigate = useNavigate()

    // MARK: --- Functions ---
    const handleClickBack = () => {
        navigate(-1)
    };

    return (
        <div className="AppNotFound d-flex flex-column flex-root align-items-center justify-content-center bg-white" style={{ height: "100vh" }}>
            <div className=''>
                <img src={AppResource.images.img404NotFound} alt='Page Not Found' />
            </div>
            <span style={{fontWeight: '800', fontSize: '60px', color: '#2C2B2B'}}>Oops, This Page Could Not Be Found.</span>
            <p style={{fontWeight: '800', fontSize: '16px', color: '#908D8D'}}>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <div>
                <AppButton
                    text='Quay lại trang trước'
                    className='btn-orange'
                    beforIcon={(<i className="fas fa-long-arrow-left text-white mr-2"></i>)}
                    onClick={handleClickBack}
                />
            </div>
        </div>
    );
}

export default NotFound;