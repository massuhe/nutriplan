import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';

import NavBar from '../components/NavBar.js';
import PlanCreateItem from '../components/PlanCreateItem.js';

interface ICreatePlanParams {
  userId: string;
}

const CreatePlan = (): JSX.Element => {
  const { userId } = useParams<ICreatePlanParams>();

  return (
    <div className="flex flex-col flex-1 bg-green-500 md:flex-row">
      <Helmet>
        <title>NutriPlan! - Crear plan</title>
      </Helmet>
      <NavBar />
      <main className="flex-1 md:ml-[300px]">
        <h1 className="flex p-5 font-serif text-4xl bg-gradient-to-r from-green-600 to-green-500 text-green-50">
          Crear plan - {userId}
        </h1>
        <section className="flex flex-col p-10">
          <div className="flex xl:justify-between">
            <div className="flex flex-col w-full mb-5 p-10 bg-green-50 shadow-2xl rounded-xl lg:flex-row xl:w-auto">
              <label className="flex flex-col  text-gray-600">
                Nombre
                <input type="text" className="mt-2 p-3 rounded-sm" />
              </label>
              <label className="flex flex-col my-5 lg:mx-5 lg:my-0 text-gray-600">
                Fecha inicio
                <input
                  type="date"
                  value="2021-09-16"
                  onChange={(e) => console.log(e.target.value)}
                  className="mt-2 p-3 rounded-sm"
                />
              </label>
              <label className="flex flex-col text-gray-600">
                Cantidad de días
                <span className="text-left text-2xl lg:mt-2 lg:text-center">
                  0
                </span>
              </label>
            </div>
            <div className="fixed flex flex-col right-0 bottom-0 xl:static xl:flex-row xl:items-start">
              <button className="m-2 p-4 bg-blue-300 rounded-full shadow-md transition-colors hover:bg-blue-400">
                💾
              </button>
              <button className="m-2 p-4 bg-blue-300 rounded-full shadow-md transition-colors hover:bg-blue-400">
                🔺
              </button>
            </div>
          </div>
          <section>
            <PlanCreateItem />
            <PlanCreateItem />
            <PlanCreateItem />
            <PlanCreateItem />
            <PlanCreateItem />
          </section>
          <button className="self-start p-5 bg-green-800 rounded-full shadow-md cursor-pointer transition-colors hover:bg-green-700">
            ➕
          </button>
        </section>
      </main>
    </div>
  );
};

export default CreatePlan;
