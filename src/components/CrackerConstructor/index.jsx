import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addToCart, setIngredients, setRemainingPercent, setSize, unsetCracker} from '../../redux/redux';
import {INGREDIENTS, LOREM_TEXT_LONG} from "../../constants";
import {ReactComponent as PackageIcon} from '../../assets/icons/package.svg';
import {ReactComponent as PlusIcon} from '../../assets/icons/plus-icon.svg';
import ConstructorSelect from "../ConstructorSelect";
import './CrackerConstructor.css'

const CrackerConstructor = () => {
    const dispatch = useDispatch();
    const cracker = useSelector((state) => state.cracker);

    const handleSliderChange = (ingredientName, value) => {
        dispatch(setIngredients({ ingredientName, value }));
    };

    const handleSizeChange = (size) => {
        dispatch(setSize(size));
    };

    const handleAddToCart = () => {
        dispatch(addToCart());
        dispatch(unsetCracker());
    };

    const handleMouseUp = () => {
        dispatch(setRemainingPercent());
    }

    const isDisabled = [cracker.peas.value, cracker.seeds.value, cracker.grain.value, cracker.corn.value]
        .every((value) => value === 0);

    return (
        <div className="constructor-container">
            <div className="about-title">About cracker</div>
            <div className="about-wrapper">
                <img src={require('../../assets/backgrounds/about-corner-image.png')}
                     alt="image"
                     width="380"
                     height="380"
                     className="about-image"/>
                <div className="cracker-about-container">
                    <div className="about-text">{LOREM_TEXT_LONG}</div>
                    <div className="about-decorator">Cracker</div>
                </div>
            </div>
            <div className="constructor-header">
                <h1>Cracker constructor</h1>
                <span>Current Value: {cracker.price} €</span>
            </div>
            <div className="ingredients-wrapper">
                {INGREDIENTS.map((ingredient, index) => {
                    const disabled = ingredient === 'corn';
                    return <div className="range-container" key={ingredient}>
                        <img src={require(`../../assets/icons/${ingredient}.png`)} alt={ingredient} width={60} height={60} />
                        <input
                            type="range"
                            min={0}
                            max={100}
                            className={`slider slider${index + 1}`}
                            value={cracker[ingredient].value}
                            disabled={disabled}
                            onMouseUp={!disabled ? () => handleMouseUp() : null}
                            onChange={!disabled ? (e) => handleSliderChange(ingredient, parseInt(e.target.value)) : null}
                        />
                        <label className="percents">
                            {cracker[ingredient].value}%
                        </label>
                    </div>
                })}
                <div className="constructor-footer">
                    <div className="size-select-container">
                        <PackageIcon/>
                        <ConstructorSelect cracker={cracker} handleSizeChange={handleSizeChange} />
                    </div>
                    <button onClick={handleAddToCart}
                            disabled={isDisabled}
                            className="add-button">
                        <span className="add-button-text">Add to cart</span>
                        <PlusIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CrackerConstructor;
