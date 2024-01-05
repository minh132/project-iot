import _ from 'lodash';
import PropTypes from 'prop-types';

EmptyView.propTypes = {
    text: PropTypes.string,
    buttonText: PropTypes.string,
    onClickButton: PropTypes.func,
    buttonIcon: PropTypes.string,
    imageEmpty: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    visible: PropTypes.bool,
    widthInPercent: PropTypes.number,
};

EmptyView.defaultProps = {
    text: "No data to display",
    buttonText: 'Refresh',
    onClickButton: null,
    buttonIcon: 'fad fa-redo-alt',
    imageEmpty: '',
    visible: true,
    widthInPercent: 25,
};

/**
 * 
 * @param {{
 * text: string,
 * buttonText: string,
 * onClickButton: function,
 * buttonIcon: string,
 * imageEmpty: string|element,
 * visible: boolean,
 * widthInPercent: number,
 * }} props 
 * @returns 
 */
function EmptyView(props) {
    const { text,
        buttonText,
        onClickButton,
        buttonIcon,
        visible,
        imageEmpty,
        widthInPercent
    } = props;

    const handleButtonClick = () => {
        if (onClickButton) {
            onClickButton();
        }
    }

    return (
        <div className="d-flex flex-column align-items-center">
            {
                !_.isEmpty(imageEmpty) && (
                    <img
                        alt='empty'
                        src={imageEmpty}
                        style={{
                            width: `${widthInPercent}%`,
                        }}
                    />
                )
            }
            <p className='text-muted font-size-lg mt-6 font-weight-normal'>{text}</p>
            <a href="#" onClick={handleButtonClick} className={`btn btn-sm btn-light-primary font-weight-bolder py-2 px-3 ${visible ? '' : 'd-none'}`}>
                <i className={`${buttonIcon} mr-2`}></i>
                {buttonText}
            </a>
        </div>
    );
}

export default EmptyView;