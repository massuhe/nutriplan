import React from 'react';
import Avocado from './Avocado.js';

const Header = (): JSX.Element => (
  <header className="py-5 text-center bg-green-50 relative sm:px-6 sm:py-12 sm:text-left">
    <h1 className="font-serif font-bold text-5xl text-green-500">NutriPlan!</h1>
    <Avocado
      className="hidden absolute top-5 right-5 sm:block"
      width="182.17"
      height="250"
    />
  </header>
);

export default Header;
