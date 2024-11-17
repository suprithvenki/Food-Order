import React from "react";
import "./Footer.css";
import { assets } from "../../Assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos enim
            molestias impedit consequatur deleniti expedita nostrum fugit!
            Aliquid, vel distinctio. Nam repudiandae aliquid et omnis, vel sunt
            in quisquam soluta.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-7349305933</li>
            <li>suprithvenki@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">All rights reserved to tomato@2024</p>
    </div>
  );
};

export default Footer;
