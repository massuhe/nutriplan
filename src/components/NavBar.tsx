import React from 'react';
import { Link } from 'react-router-dom';

const links = [
  { text: '🏠 Inicio', to: '/' },
  { text: '👨‍⚕️ Pacientes', to: '/' },
  { text: '🧾 Recetas', to: '/' },
  { text: '⚙ Configuración', to: '/' },
];

const NavBar = (): JSX.Element => {
  return (
    <nav className="flex flex-col py-5 px-5 bg-green-50 shadow-2xl z-10 md:fixed md:h-full md:w-[300px] md:py-10">
      <div className="flex">
        <h2 className="mb-0 font-serif font-bold text-4xl text-left text-green-500 md:mb-4">
          NutriPlan!
        </h2>
        <button className="ml-5 text-2xl md:hidden">
          <label htmlFor="checkbox_menu">🥦</label>
        </button>
      </div>
      <input
        type="checkbox"
        name="checkbox_menu"
        id="checkbox_menu"
        className="peer sr-only"
      />
      <div className="hidden peer-checked:block md:flex md:flex-col md:justify-between md:flex-1 md:h-screen">
        <ul>
          {links.map((link) => (
            <li className="flex border-b" key={link.text}>
              <Link
                className="w-full p-3 text-gray-500 hover:text-green-600 transition-transform transform hover:translate-x-1"
                to={link.to}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <button className="p-3 text-red-500 text-left hover:text-red-400">
          ❌ Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
