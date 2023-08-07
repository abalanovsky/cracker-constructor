import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {LOREM_TEXT_SHORT} from "../../constants";
import Cart from "../Cart";
import './Header.css'
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {ReactComponent as WhiteSeed } from '../../assets/icons/white-seed.svg';
import {ReactComponent as CartArrowUp} from '../../assets/icons/arrow-up.svg';
import {ReactComponent as CartArrowDown} from '../../assets/icons/arrow-down.svg';

const Header = () => {
    const orders = useSelector((state) => state.crackers);
    const totalPrice = useSelector((state) => state.totalPrice);
    const [checkoutIsOpen, setCheckout] = useState(false);
    const handleCheckout = () => {
        setCheckout(!checkoutIsOpen)
    }

    return (
        <div className="hero-container">
                <div className="main-header">
                    <Logo/>
                    <div className="summary-header-bar">
                        <div className="order-icon-container">
                            <WhiteSeed className="white-seed-icon" />
                            {orders.length > 0 && <div className="order-count">{orders.length}</div>}
                        </div>
                        <span>TOTAL: {totalPrice.toFixed(2)}€</span>
                        <div>
                            <div onClick={handleCheckout} className="details-opener">DETAILS {checkoutIsOpen ? <CartArrowUp /> : <CartArrowDown />}</div>
                        </div>
                    </div>
                </div>
            <nav className="header-menu">
                <ul className="header-menu-list">
                    <li className="active-menu-link"><a href="https://google.com" className="header-menu-link">Home</a></li>
                    <li><a href="https://google.com" className="header-menu-link">About us</a></li>
                    <li><a href="https://google.com" className="header-menu-link">Contacts us</a></li>
                    <li><a href="https://google.com" className="header-menu-link">Checkout</a></li>
                    <li><a href="https://google.com" className="header-menu-link">Account</a></li>
                </ul>
            </nav>
            <div className={`dropdown-window ${checkoutIsOpen ? 'show-dropdown' : ''}`}>
                <Cart />
            </div>
                <div className="hero">
                    <div className="hero-text-container">
                        <div className="hero-text">{LOREM_TEXT_SHORT}</div>
                    </div>
                    <div className="hero-right-container">
                        <div className="hero-title">mostly tastes with freshes</div>
                        <button className="hero-button">taste it</button>
                    </div>
                </div>
        </div>
    );
};

export default Header;
