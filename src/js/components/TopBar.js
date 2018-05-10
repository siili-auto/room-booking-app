import React, { PropTypes } from 'react';
import moment from 'moment';
import cx from 'classnames';

//
const TopBar = ({ showBackLink, onGoBack, loading }, { translate, currentTime }) => {
    const className = cx('top-bar', { 'top-bar--show-back': showBackLink });

    return (
        <div className={ className }>
            <button className="top-bar__back" onClick={ onGoBack }>
                ⇽ { translate('go-back') }
            </button>
            <p className="top-bar__date">{ moment(currentTime).format('dddd, LL') }</p>
            <p className="top-bar__time">
                { moment(currentTime).format('H:mm') }
            </p>
            { loading ? <div className="top-bar__indicator" /> : null }
        </div>
    );
};

TopBar.propTypes = {
    showBackLink: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    onGoBack: PropTypes.func
};

TopBar.contextTypes = {
    translate: PropTypes.func.isRequired,
    currentTime: PropTypes.number,
};

export default TopBar;
