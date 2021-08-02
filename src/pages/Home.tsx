import React, { ReactElement, useState } from 'react';
import { useQuery } from 'react-query';

import api from '../lib/api';
import Header from '../components/Header.js';
import Plan from '../components/Plan.js';
import PlanActions from '../components/PlanActions.js';
import PhotosModal from '../components/PhotosModal.js';
import RecipeModal from '../components/RecipeModal';

import type { IRecipe } from 'src/types';

interface IHome {
  planId?: string
}

const Home = ({ planId }: IHome): ReactElement => {
  const { data: plan, isLoading } = useQuery(['plan'], api.getActivePlan);
  const [activePhoto, setActivePhoto] = useState<string>('');
  const [recipe, setRecipe] = useState<IRecipe>();
  const [activeModal, setActiveModal] = useState<string>('');

  const onPhotoClick = (photo: string) => {
    setActivePhoto(photo);
    setActiveModal('photos');
  }

  const onRecipeClick = (recipe: IRecipe) => {
    setRecipe(recipe);
    setActiveModal('recipes');
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-green-500 flex flex-col">
        <PlanActions planName={plan?.name} />
        <Plan plan={plan} loading={isLoading} onPhotoClick={onPhotoClick} onRecipeClick={onRecipeClick}/>
      </main>
      <PhotosModal visible={activeModal === 'photos'} activePhoto={activePhoto} onClose={() => setActiveModal('')}/>
      <RecipeModal visible={activeModal === 'recipes'} recipe={recipe} onClose={() => setActiveModal('')}/>
    </>
  )
}

export default Home;