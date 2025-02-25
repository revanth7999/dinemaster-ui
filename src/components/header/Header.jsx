import React, { Component } from 'react';
import '../header/header.css';
import im from '../utils/food-logo.png';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <img src={im} alt="Header Image" className="header-image" />
      </div>
    );
  }
}
