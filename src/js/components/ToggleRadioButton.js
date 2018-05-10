import React, { PropTypes } from 'react';
import cx from 'classnames';

const ToggleRadioButton = ({ id, name, text, isChecked, isSmall, onToggle }) => {
    const toggleButtonClass = cx('toggle-button__button', {
        'toggle-button__button--active': isChecked,
        'toggle-button__button--small': isSmall
    });

    return (
        <div className="toggle-button">
            <input
                type="radio"
                id={ id }
                name={ name }
                value={ id }
                checked={ isChecked }
                onChange={ onToggle }
            />
            <label
                htmlFor={ id }
                className={ toggleButtonClass }>
                { text }
            </label>
        </div>
    );
};

ToggleRadioButton.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    isSmall: PropTypes.bool,
    onToggle: PropTypes.func.isRequired
};

export default ToggleRadioButton;
