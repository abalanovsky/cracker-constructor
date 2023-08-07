import React from 'react';
import './Footer.css'
import {ReactComponent as PinterestIcon} from '../../assets/icons/pinterest.svg';
import {ReactComponent as InstagramIcon} from '../../assets/icons/instagram.svg';
import {ReactComponent as FacebookIcon} from '../../assets/icons/facebook.svg';
import {ReactComponent as AddressIcon} from "../../assets/icons/map-pin.svg";
import {ReactComponent as ShareIcon} from "../../assets/icons/share.svg";
import {ReactComponent as PhoneIcon} from "../../assets/icons/phone.svg";

const Footer = () => {
    return (
        <div className="footer">
            <div className="info-container">
                <div className="info-block">
                    <div className="footer-titles">
                        <PhoneIcon />
                        <h3 className="footer-title">Phone</h3>
                    </div>
                    <div className="footer-text">+48 (987) 345 - 6789</div>
                </div>
                <div className="info-block">
                    <div className="footer-titles">
                        <AddressIcon />
                        <h3 className="footer-title">Address</h3>
                    </div>
                    <div className="footer-text">
                        Cracker Inc.
                        10 Cloverfield Lane
                        Berlin IL 10928, Germany
                    </div>
                </div>
                <div className="info-block">
                    <div className="footer-titles">
                        <ShareIcon />
                        <h3 className="footer-title">Share</h3>
                    </div>
                    <div className="social">
                        <div className="social-link">
                            <div className="social-icon"><PinterestIcon /></div>
                            <a href="https://pinterest.com">pinterest.com</a>
                        </div>
                        <div className="social-link">
                            <div className="social-icon"><FacebookIcon /></div>
                            <a href="https://facebook.com">facebook.com</a>
                        </div>
                        <div className="social-link">
                            <div className="social-icon"><InstagramIcon /></div>
                            <a href="https://instagram.com">instagram.com</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Footer;
