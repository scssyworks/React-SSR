import React from 'react';
import PropTypes from 'prop-types';

const TCell = ({ children, className }) => (
    <td className={className}>
        {children}
    </td>
);

TCell.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export default TCell;