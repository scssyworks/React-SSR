import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, className, type = 'button', onClick }) => (
    <button className={className} type={type} onClick={onClick}>
        {children}
    </button>
);

Button.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func
};

export default Button;