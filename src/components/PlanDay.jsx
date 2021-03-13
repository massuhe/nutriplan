import React, { useRef } from 'react';

const toDisplayDate = (date) => {
  return new Date(date).toDateString();
};

const PlanDay = ({ planDay, offset }) => {
  return (
    <article
      className="bg-green-50 py-3 px-5 flex flex-col rounded-lg shadow-2xl my-10"
      style={{
        minWidth: '18.68%',
        width: '18.68%',
        marginLeft: '1.1%',
        transform: `translateX(calc(var(--offset) * 105.3533%)`,
      }}
    >
      <h3 className="text-center font-serif text-lg text-green-500 mb-5">
        {toDisplayDate(planDay.date)}
      </h3>
      <div className="flex flex-col flex-1">
        <section className="flex-1">
          <h4 className="font-semibold text-blue-500">Desayuno</h4>
          <p className="text-green-900">{planDay.meals[0].value}</p>
        </section>
        <section className="flex-1">
          <h4 className="font-semibold text-red-500">Almuerzo</h4>
          <p className="text-green-900">{planDay.meals[1].value}</p>
        </section>
        <section className="flex-1">
          <h4 className="font-semibold text-yellow-500">Merienda</h4>
          <p className="text-green-900">{planDay.meals[2].value}</p>
        </section>
        <section className="flex-1">
          <h4 className="font-semibold text-indigo-500">Cena</h4>
          <p className="text-green-900">{planDay.meals[3].value}</p>
        </section>
      </div>
    </article>
  );
};

export default PlanDay;
