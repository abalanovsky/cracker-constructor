import React, { useState } from 'react';
import {SIZES} from "../../constants";
import arrowUp from '../../assets/icons/arrow-up-select.svg';
import arrowDown from '../../assets/icons/arrow-down-select.svg';
import './ConstructorSelect.css'
const CustomSelect = ({ handleSizeChange }) => {
    const [showOptions, setShowOptions] = useState(false);
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };
    const handleOptionClick = (size) => {
        handleSizeChange(size);
        setShowOptions(false);
    };

    return (
        <div className={`custom-select ${showOptions ? 'show-options' : ''}`}>
            <div className="selected-item" onClick={toggleOptions}>
                Choose your size
                <img
                    className="arrow-icon"
                    src={showOptions ? arrowUp : arrowDown}
                    alt="Arrow"
                />
            </div>
            {showOptions && (
                <div className="options">
                    {SIZES.map((size) => (
                        <div
                            key={size}
                            className="option"
                            onClick={() => handleOptionClick(size)}
                        >
                            {size}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
