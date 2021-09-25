import React, { useEffect, useState } from 'react';
import useCoordinates from '../hooks/useCoordiantes.js';
import type { IPlan } from '../types.js';
import PlanSwitcher from './PlanSwitcher.js';

interface IPlanActions {
  plan: IPlan | void;
}

const PlanActionsSkeleton = () => (
  <>
    <div className="bg-green-200 h-9 rounded w-full"></div>
    <div className="bg-green-200 h-5 mt-2 rounded"></div>
  </>
);

const PlanActions = ({ plan }: IPlanActions): JSX.Element => {
  const [isChangingPlan, setIsChangingPlan] = useState<boolean>(false);
  const { ref, bottom: top, left } = useCoordinates();

  const coordinates = ref?.current ? { top, left } : undefined;

  useEffect(() => {
    setIsChangingPlan(false);
  }, [plan?.id]);

  return (
    <section
      className={`w-full sm:w-auto inline-block p-6 bg-green-50 bg-opacity-30 relative sm:rounded-br-xl shadow-xl text-green-50 self-start ${
        isChangingPlan ? 'z-50' : ''
      }`}
      style={{ minWidth: '340px' }}
      ref={ref}
    >
      {plan ? (
        <>
          <h2 className="font-serif text-3xl">{plan.name}</h2>
          <ul className="flex text-sm">
            <li>
              <button onClick={() => setIsChangingPlan(true)}>
                Cambiar plan
              </button>
            </li>
            <span className="px-2">|</span>
            <li>
              <a href="#">Editar plan</a>
            </li>
            <span className="px-2">|</span>
            <li>
              <a href="#" onClick={() => alert('Soon')}>
                Generar lista de compras
              </a>
            </li>
          </ul>
          <PlanSwitcher
            activePlanId={plan?.id}
            isChangingPlan={isChangingPlan}
            coordinates={coordinates}
            onDismiss={() => setIsChangingPlan(false)}
          ></PlanSwitcher>
        </>
      ) : (
        <PlanActionsSkeleton />
      )}
    </section>
  );
};

export default PlanActions;
