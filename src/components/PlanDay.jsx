import React from 'react';

const PlanDay = ({ active }) => {
  console.log({ active });
  return (
    <article
      className={`bg-green-50 py-3 px-5 flex flex-col max-w-sm rounded-lg shadow-2xl mx-2 ${
        !active ? 'my-10 w-1/6' : 'flex-1'
      }`}
    >
      <h3 className="text-center font-serif text-lg text-green-500 mb-5">
        Miércoles 16/02
      </h3>
      <div className="flex flex-col flex-1">
        <section className="flex-1">
          <h4 className="font-semibold text-blue-500">Desayuno</h4>
          <p className="text-green-900">
            Vaso de leche + panqueque de vainilla + miel + frutas a elección
          </p>
        </section>
        <section className="flex-1">
          <h4 className="font-semibold text-red-500">Almuerzo</h4>
          <p className="text-green-900">
            Milanesa de soja con queso y rodaja de tomate arriba + ensalada de
            repollo y zanahoria
          </p>
        </section>
        <section className="flex-1">
          <h4 className="font-semibold text-yellow-500">Merienda</h4>
          <p className="text-green-900">
            Yogurt + 2 rodajas de pan integral con queso untable + semillas +
            manzana
          </p>
        </section>
        <section className="flex-1">
          <h4 className="font-semibold text-indigo-500">Cena</h4>
          <p className="text-green-900">
            Omelette (2 huevos) de espinaca con queso, tomate y arvejas +
            ensalada de zanahoria, choclo y tomate
          </p>
        </section>
      </div>
    </article>
  );
};

export default PlanDay;
