// src/components/Header.jsx
import React from 'react';
import Logo from '../assets/logo.svg';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
        <a href='/'>
            <img src={Logo} alt="Logo" className="w-32 h-11" />
        </a>
    </header>
  );
};

export default Header;