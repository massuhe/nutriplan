import React, { useState } from 'react';
import { useQuery } from 'react-query';

import api from '../lib/api';
import Header from '../components/Header.js';
import Plan from '../components/Plan.js';
import PlanActions from '../components/PlanActions.js';
import PhotosModal from '../components/PhotosModal.js';
import RecipeModal from '../components/RecipeModal.js';

import type { IRecipe } from 'src/types';
import { useParams } from 'react-router';

interface IViewPlanParams {
  planId?: string;
}

const ViewPlan = (): JSX.Element => {
  const { planId } = useParams<IViewPlanParams>();
  const { data: plan, isLoading } = useQuery(['plan', planId], () =>
    api.getPlan(planId)
  );
  const [activePhoto, setActivePhoto] = useState<string>('');
  const [recipe, setRecipe] = useState<IRecipe>();
  const [activeModal, setActiveModal] = useState<string>('');

  const closeOpenModal = () => setActiveModal('');

  const onPhotoClick = (photo: string) => {
    setActivePhoto(photo);
    setActiveModal('photos');
  };

  const onRecipeClick = (recipe: IRecipe) => {
    setRecipe(recipe);
    setActiveModal('recipes');
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-green-500 flex flex-col">
        <PlanActions plan={plan} />
        <Plan
          plan={plan}
          loading={isLoading}
          onPhotoClick={onPhotoClick}
          onRecipeClick={onRecipeClick}
        />
      </main>
      <PhotosModal
        visible={activeModal === 'photos'}
        activePhoto={activePhoto}
        onClose={closeOpenModal}
      />
      <RecipeModal
        visible={activeModal === 'recipes'}
        recipe={recipe}
        onClose={closeOpenModal}
      />
    </>
  );
};

export default ViewPlan;
