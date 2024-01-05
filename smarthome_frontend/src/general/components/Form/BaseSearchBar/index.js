import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Utils from 'general/utils/Utils';
import './style.scss';

BaseSearchBar.propTypes = {
    name: PropTypes.string.isRequired,

    type: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    value: PropTypes.string,
    typingTimeout: PropTypes.number,
    onSubmit: PropTypes.func,
    noBorder: PropTypes.bool,
};

BaseSearchBar.defaultProps = {
    type: 'text',
    placeholder: '',
    disabled: false,
    className: '',
    value: '',
    typingTimeout: 500,
    onSubmit: null,
    noBorder: false,
};

function BaseSearchBar(props) {
    // MARK: --- Params ---
    const {
        name,
        type,
        placeholder,
        disabled,
        className,
        value,
        typingTimeout,
        onSubmit,
        noBorder,
        onFocus
    } = props;
    const [text, setText] = useState(value);
    const typingTimeoutRef = useRef(null);

    // MARK: --- Functions ---
    function handleTextChanged(e) {
        const value = e.target.value;
        setText(value);

        if (onSubmit === null) {
            return;
        }

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            onSubmit(value);
        }, typingTimeout);
    }

    return (
        <div className={`BaseSearchBar input-icon ${className}`}>
            <input
                id={name}
                onFocus={onFocus}
                type={type}
                className={`form-control ${noBorder && 'border-0'}`}
                placeholder={placeholder}
                value={text}
                onChange={handleTextChanged}
            />
            <span className=''>
                <i className="fas fa-search" style={{color: '#4A5677'}}/>
            </span>
        </div>
    );
}

export default BaseSearchBar;
