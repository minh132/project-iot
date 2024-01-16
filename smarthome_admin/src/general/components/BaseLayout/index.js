import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import HeaderLandingPage from '../HeaderLandingPage';
import './style.scss';
import AppResource from 'general/constants/AppResource';
import SideBar from '../SideBar';
import UserHelper from 'general/helpers/UserHelper';
import { useState } from 'react';

BaseLayout.propTypes = {
    selected: PropTypes.string
};

BaseLayout.defaultProps = {
    selected: ""
}

function BaseLayout(props) {
    const { selected } = props;
    const isAuth = UserHelper.checkAccessTokenValid();
    const PageUp = useRef();
    const handleScrollTop = () => {
        document.documentElement.scrollTop = 0;
    };
    window.onscroll = function () {
        if (PageUp.current) {
            PageUp.current.style.display =
                document.documentElement.scrollTop > 450 ? "block" : "none";
            PageUp.current.style.animation = "scroll-to-top-animation 0.5s";
        }
    };
    const [showSideBarMobile, setShowSideBarMobile] = useState(false);

    const callbackFunction = (value) => {
      setShowSideBarMobile(!value)
    }
    return (
        <div className='min-vh-100 bg-light d-flex' 
        // style={{flexFlow: 'row wrap'}}
        >
            {/* side bar */}
            <div ><SideBar selected={selected} showSideBarMobile={showSideBarMobile}/></div>
            
            <div className='d-flex flex-column flex-grow-1' >
                {/* header */}
                <HeaderLandingPage showSideBarMobile={showSideBarMobile} parentCallback={callbackFunction}/>
                <div onClick={() => setShowSideBarMobile(false)}>
                    {/* Content */}
                    <div
                        className={`flex-grow-1 align-self-center d-flex flex-column justify-content-between m-1 m-sm-8`}
                    >
                        {props.children}
                    </div>

                </div>

            </div>
            
            <div className="fixed-button">
                <button
                ref={PageUp}
                id="page-up-dashboard"
                style = {
                    {
                    marginBottom: "0px",
                    display: "none"
                    }
                }
                onClick={handleScrollTop}
                >
                <img src={AppResource.icons.icPageUp} alt="scroll to top button"/>
                </button>
            </div>
        </div>
    );
}

export default BaseLayout;