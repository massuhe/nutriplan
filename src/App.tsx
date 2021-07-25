import React, { useEffect, useState, ReactElement } from 'react';
import Header from './components/Header.js';
import Plan from './components/Plan.js';
import PlanActions from './components/PlanActions.js';
import PlanContextWrapper from './components/PlanContext.js';
import planMock from './data/plans.json';
import type { IPlan } from './types.js';
import Modals from './components/Modals.js';

const useMock = true;

const App = (): ReactElement => {
  const [plan, setPlan] = useState<IPlan>({} as IPlan);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalType, setModalType] = useState<string>('');

  useEffect(() => {
    if (useMock) {
      setPlan(planMock[0] as IPlan);
    }
    setLoading(false);
  }, []);

  return (
    <PlanContextWrapper data={{ recipes: plan.recipes, setModalType }}>
      <Header />
      <main className="flex-1 bg-green-500 flex flex-col">
        <PlanActions planName={plan.name} />
        <Plan plan={plan.days} loading={loading} />
      </main>
      <Modals type={modalType} onClose={() => setModalType('')} />
    </PlanContextWrapper>
  );
};

export default App;
