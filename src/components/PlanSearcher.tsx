import React, { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../lib/api';

interface IPlanSearcherProps {
  activePlanId?: string;
  onPlanChange: (planId: string) => void;
}

const PlanSearcher = ({
  activePlanId,
  onPlanChange,
}: IPlanSearcherProps): JSX.Element => {
  const { data: planNames, isLoading } = useQuery(
    ['planNames'],
    api.getAllPlanNames
  );
  const [filterText, setFilterText] = useState<string>('');

  // TODO: Reemplazar con skeletons
  if (isLoading) return <p>Cargando planes</p>;

  const activePlan = planNames?.find(
    (planName) => planName.id === activePlanId
  );
  // TODO: Improve filters
  const pickeablePlans = planNames?.filter(
    (plan) => plan !== activePlan && plan.name.includes(filterText)
  );
  const getButtonBgClass = (i: number) =>
    i % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200';

  return (
    <section>
      <input
        className="w-full my-2 p-2"
        placeholder="Filtrar planes"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <ul>
        {pickeablePlans?.map((planName, i) => (
          <li key={planName.id}>
            <button
              onClick={() => onPlanChange(planName.id)}
              className={`${getButtonBgClass(
                i
              )} p-1.5 text-left w-full hover:bg-gray-300`}
            >
              {planName.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PlanSearcher;
