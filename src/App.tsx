import React, { useEffect, useState, ReactElement } from 'react';
import Header from './components/Header.js';
import Plan from './components/Plan.js';
import PlanActions from './components/PlanActions.js';
import planMock from './data/plans.json';

const useMock = true;

const App = (): ReactElement => {
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (useMock) {
      setPlan(planMock);
    }
    setLoading(false);
  }, []);

  return (
    <>
      <Header />
      <main className="h-full bg-green-500 flex flex-col">
        <PlanActions />
        <Plan plan={plan} loading={loading} />
      </main>
    </>
  );
};

export default App;
