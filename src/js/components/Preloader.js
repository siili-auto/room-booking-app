import React, { PropTypes } from 'react';
import cx from 'classnames';

const Preloader = ({ show }, { translate }) => {
    const className = cx('preloader', { 'preloader--visible': show });
    return (
        <div className={ className }>
            <div className="preloader__overlay" />
            <div className="preloader__box">
                <p className="preloader__message">{ translate('loader-text') }</p>
            </div>
        </div>
    );
};

Preloader.propTypes = {
    show: PropTypes.bool.isRequired
};

Preloader.contextTypes = {
    translate: PropTypes.func.isRequired,
};

export default Preloader;
