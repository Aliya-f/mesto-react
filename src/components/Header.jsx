import React from 'react';
import logo from '../images/logo.svg';

function Header() {
    return (
        <div className="header">
        <img
          src={logo}
          alt="Место"
          className="header__logo"
        />
      </div>
    )
}

export default Header;