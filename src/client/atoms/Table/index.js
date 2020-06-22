import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ children, className }) => (
    <table className={className}>
        {children}
    </table>
);

Table.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export default Table;