import React from 'react';
import Header from './components/Header.js';
import Plan from './components/Plan.js';
import PlanActions from './components/PlanActions.js';

function App() {
  return (
    <>
      <Header />
      <main className="h-full bg-green-500 flex flex-col">
        <PlanActions />
        <Plan />
      </main>
    </>
  );
}

export default App;
