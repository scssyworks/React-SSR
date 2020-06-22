import React from 'react';
import PropTypes from 'prop-types';

const Anchor = ({ children, href, className, onClick }) => {
    if (href) {
        return (
            <a className={className} onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}>{children}</a>
        );
    }
    return;
}

Anchor.propTypes = {
    children: PropTypes.any.isRequired,
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default Anchor;