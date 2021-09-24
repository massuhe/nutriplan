import React, { useState } from 'react';
import useCoordinates from '../hooks/useCoordiantes.js';
import type { IPlan } from '../types.js';
import PlanSwitcher from './PlanSwitcher.js';

interface IPlanActions {
  plan: IPlan | void;
  onPlanChange: (planId: string) => void;
}

const PlanActions = ({
  plan,
  onPlanChange: parentOnPlanChange,
}: IPlanActions): JSX.Element => {
  const [isChangingPlan, setIsChangingPlan] = useState<boolean>(false);
  const { ref, bottom: top, left } = useCoordinates();

  const onPlanChange = (planId: string) => {
    setIsChangingPlan(false);
    parentOnPlanChange(planId);
  };

  return (
    <section
      className={`w-full sm:w-auto inline-block p-6 bg-green-50 bg-opacity-30 relative sm:rounded-br-xl shadow-xl text-green-50 self-start ${
        isChangingPlan ? 'z-50' : ''
      }`}
      ref={ref}
    >
      <h2 className="font-serif text-3xl">{plan?.name}</h2>
      <ul className="flex text-sm">
        <li>
          <button onClick={() => setIsChangingPlan(true)}>Cambiar plan</button>
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
      <PlanSwitcher
        activePlanId={plan?.id}
        isChangingPlan={isChangingPlan}
        coordinates={ref.current && { top, left }}
        onDismiss={() => setIsChangingPlan(false)}
        onPlanChange={onPlanChange}
      ></PlanSwitcher>
    </section>
  );
};

export default PlanActions;
