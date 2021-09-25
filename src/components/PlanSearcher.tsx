import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import api from '../lib/api';

interface IPlanSearcherProps {
  activePlanId?: string;
}

const PlanSearcher = ({ activePlanId }: IPlanSearcherProps): JSX.Element => {
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
          <li key={planName.id} className="flex">
            <Link
              to={`/view/${planName.id}`}
              className={`${getButtonBgClass(
                i
              )} p-1.5 text-left w-full hover:bg-gray-300`}
            >
              {planName.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PlanSearcher;
