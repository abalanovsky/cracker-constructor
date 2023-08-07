import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteItem} from "../../redux/redux";
import {ReactComponent as RemoveIcon} from '../../assets/icons/delete-icon.svg';
import {ReactComponent as BlackSeedIcon} from '../../assets/icons/black-seed.svg';
import './Cart.css'

const Cart = () => {
    const dispatch = useDispatch();
    const crackers = useSelector((state) => state.crackers);
    const totalPrice = useSelector((state) => state.totalPrice);

    const handleDelete = (id) => {
        dispatch(deleteItem(id))
    }

    return (
        <div>
            {crackers.length ? <>
                <div className="cart-icons-container">
                    <img src={require('../../assets/icons/peas-cart-icon.png')} alt="Peas icon" width="32" />
                    <img src={require('../../assets/icons/seeds-cart-icon.png')} alt="Seeds icon" width="32" />
                    <img src={require('../../assets/icons/grain-cart-icon.png')} alt="Grain icon" width="32" />
                    <img src={require('../../assets/icons/corn-cart-icon.png')} alt="Corn icon" width="32" />
                </div>
                {crackers.map((cracker) => {
                    return <div key={cracker.id} className="cracker-item">
                        <BlackSeedIcon className="seed-icon"/>
                        <div className="ingredient">{cracker.peas}%</div>
                        <div className="ingredient">{cracker.seeds}%</div>
                        <div className="ingredient">{cracker.grain}%</div>
                        <div className="ingredient">{cracker.corn}%</div>
                        <div className="totals">{cracker.weight / 1000} kg</div>
                        <div className="totals">{cracker.price}€</div>
                        <button className="remove-button"
                                onClick={() => handleDelete(cracker.id)}>
                            <RemoveIcon />
                        </button>
                    </div>
                })}
                <div className="cart-info-container">
                    <div className="total-cart-text">
                        Total:
                        <span> {totalPrice.toFixed(2)}€</span>
                    </div>
                    <button className="checkout-button">Checkout</button>
                </div>
            </> : <h2>Your cart is empty</h2>}
        </div>
    );
};

export default Cart;
