import React from 'react';
import Avocado from './Avocado.js';

const Header = () => (
  <header className="px-6 py-12 bg-green-50 relative">
    <h1 className="font-serif font-bold text-5xl text-green-500">NutriPlan!</h1>
    <Avocado className="absolute top-5 right-5" width="182.17" height="250" />
  </header>
);

export default Header;
