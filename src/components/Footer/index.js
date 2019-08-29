/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import './Footer.scss';

const Footer = () => (
  <div className="footer-container">
    <hr />
    <div className="footer-labels">
      <div className="about">
        <label>ABOUT</label>
      </div>
      <div className="terms">
        <label>TERMS</label>
      </div>
      <div className="help">
        <label>HELP</label>
      </div>
    </div>
  </div>
);

export default Footer;
