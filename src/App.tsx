import React, { useEffect, useState, ReactElement } from 'react';
import Header from './components/Header.js';
import Plan from './components/Plan.js';
import PlanActions from './components/PlanActions.js';
import RecipesContextWrapper from './components/RecipesContext.jsx';
import RecipeModal from './components/RecipeModal.js';
import planMock from './data/plans.json';
import type { IPlan, IRecipe } from './types.js';

const useMock = true;

const App = (): ReactElement => {
  const [plan, setPlan] = useState<IPlan>({} as IPlan);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeRecipe, setActiveRecipe] = useState<IRecipe>();

  useEffect(() => {
    if (useMock) {
      setPlan(planMock[0] as IPlan);
    }
    setLoading(false);
  }, []);

  return (
    <RecipesContextWrapper
      recipes={plan.recipes}
      setActiveRecipe={setActiveRecipe}
    >
      <Header />
      <main className="flex-1 bg-green-500 flex flex-col">
        <PlanActions planName={plan.name} />
        <Plan plan={plan.days} loading={loading} />
      </main>
      <RecipeModal
        recipe={activeRecipe}
        onClose={() => setActiveRecipe(undefined)}
      />
    </RecipesContextWrapper>
  );
};

export default App;
