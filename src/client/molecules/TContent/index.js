import React from 'react';
import PropTypes from 'prop-types';

const TContent = ({ children, className }) => (
    <tbody className={className}>{children}</tbody>
);

TContent.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export default TContent;