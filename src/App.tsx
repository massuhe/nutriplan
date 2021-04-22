import React, { useEffect, useState, ReactElement } from 'react';
import Header from './components/Header.js';
import Plan from './components/Plan.js';
import PlanActions from './components/PlanActions.js';
import planMock from './data/plans.json';
import type { IPlan } from './types.js';

const useMock = true;

const App = (): ReactElement => {
  const [plan, setPlan] = useState<IPlan>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (useMock) {
      setPlan(planMock[0] as IPlan);
    }
    setLoading(false);
  }, []);

  return (
    <>
      <Header />
      <main className="h-full bg-green-500 flex flex-col">
        <PlanActions planName={plan.name} />
        <Plan plan={plan.days} loading={loading} />
      </main>
    </>
  );
};

export default App;
