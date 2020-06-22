import React from 'react';
import PropTypes from 'prop-types';

const TRow = ({ children, className }) => (
    <tr className={className}>
        {children}
    </tr>
);

TRow.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export default TRow;