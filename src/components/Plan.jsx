import React from 'react';
import PlanDay from './PlanDay.js';

const Plan = () => (
  <section className="flex justify-center flex-1 p-10">
    <PlanDay />
    <PlanDay />
    <PlanDay active />
    <PlanDay />
    <PlanDay />
  </section>
);

export default Plan;
