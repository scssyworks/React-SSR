import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class THeading extends PureComponent {
    static propTypes = {
        heading: PropTypes.arrayOf(
            PropTypes.string
        ).isRequired,
        className: PropTypes.string
    };

    render() {
        const { heading = [], className } = this.props;
        return (
            <thead className={className}>
                {heading.map((item, index) => (
                    <th key={index}>{item}</th>
                ))}
            </thead>
        );
    }
}

export default THeading;