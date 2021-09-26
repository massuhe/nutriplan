import React from 'react';

interface IPlanCreateItemProps {}

const PlanCreateItem = ({}: IPlanCreateItemProps): JSX.Element => {
  return (
    <article className="mb-5 p-10 bg-green-50 shadow-2xl rounded-xl">
      <section className="flex justify-between">
        <h2>26 de Septiembre del 2021</h2>
        <div>
          <button>✏</button>
          <button>❌</button>
        </div>
      </section>
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <section className="flex-1 mr-2">
          <div className="flex">
            <h3>Desayuno</h3>
            <input type="checkbox" />
          </div>
          <textarea className="w-full p-3 min-h-[150px]"></textarea>
        </section>
        <section className="flex-1 mx-2">
          <div className="flex">
            <h3>Almuerzo</h3>
            <input type="checkbox" />
          </div>
          <textarea className="w-full p-3 min-h-[150px]"></textarea>
        </section>
        <section className="flex-1 mx-2">
          <div className="flex">
            <h3>Merienda</h3>
            <input type="checkbox" />
          </div>
          <textarea className="w-full p-3 min-h-[150px]"></textarea>
        </section>
        <section className="flex-1 ml-2">
          <div className="flex">
            <h3>Cena</h3>
            <input type="checkbox" />
          </div>
          <textarea className="w-full p-3 min-h-[150px]"></textarea>
        </section>
      </div>
    </article>
  );
};

export default PlanCreateItem;
