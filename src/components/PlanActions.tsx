import React, { ReactElement } from 'react';

interface IPlanActions {
  planName: string|void;
}

const PlanActions = ({ planName = '' }: IPlanActions): ReactElement => (
  <section className="w-full sm:w-auto inline-block p-6 bg-green-50 bg-opacity-30 relative sm:rounded-br-xl shadow-xl text-green-50 self-start">
    <h2 className="font-serif text-3xl">{planName}</h2>
    <ul className="flex text-sm">
      <li>
        <a href="#">Cambiar plan</a>
      </li>
      <span className="px-2">|</span>
      <li>
        <a href="#">Editar plan</a>
      </li>
      <span className="px-2">|</span>
      <li>
        <a href="#">Generar lista de compras</a>
      </li>
    </ul>
  </section>
);

export default PlanActions;
