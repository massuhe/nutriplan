import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { IMeal, IRecipe } from 'src/types';

const rexMealWithRecipe = /(@[a-z-]+)/g;

interface IRecipeMealPrios {
  recipe: IRecipe|void;
  onRecipeClick: (recipe: IRecipe) => void;
}

const RecipeMeal = ({ recipe, onRecipeClick }: IRecipeMealPrios) => {
  if (!recipe) return <></>;
  // @TODO: Create new component <InlineButton /> that encapsulates accessibility.
  return (
    <a
      href="/"
      onClick={(e) => {
        e.preventDefault();
        onRecipeClick(recipe);
      }}
      className="hover:text-blue-600 text-blue-400"
      role="button"
    >
      {recipe.title}
    </a>
  );
};

interface IFixedMealProps {
  value: string;
  recipes: IRecipe[]|void;
  onRecipeClick: (recipe: IRecipe) => void;
}

const FixedMeal = ({ value, recipes, onRecipeClick }: IFixedMealProps) => {
  const mealValue = value
    .split(rexMealWithRecipe)
    .filter(Boolean)
    .map((value: string) =>
      value.startsWith('@') ? (
        <RecipeMeal key={value} recipe={recipes?.find(r => r.slug === value.slice(1))} onRecipeClick={onRecipeClick}/>
      ) : (
        <span key={value}>{value}</span>
      )
    );

  return <p className="text-green-900">{mealValue}</p>;
};

interface IEditableMealProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const EditableMeal = ({ initialValue, onChange }: IEditableMealProps) => {
  const [value, setValue] = useState<string>(initialValue);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const refTextArea = useRef<HTMLTextAreaElement>(null);
  const refControlPressed = useRef<boolean>(false);

  const onEdit = () => {
    setIsEditing(true);
  };

  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.code !== 'Enter') return;
    onEdit();
  };

  const onSave = () => {
    setIsEditing(false);
    onChange(value);
  };

  const onTextAreaKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter' && refControlPressed.current) return onSave();
    refControlPressed.current = e.code === 'ControlLeft';
  };

  const onEditCancel = (e: KeyboardEvent) => {
    if (e.code !== 'Escape') return;

    setIsEditing(false);
    setValue(initialValue);
  };

  useEffect(() => {
    if (isEditing) {
      refTextArea.current?.focus();
      refTextArea.current?.setSelectionRange(value.length, value.length);
      document.addEventListener('keydown', onEditCancel);
    } else {
      document.removeEventListener('keydown', onEditCancel);
    }

    return () => document.removeEventListener('keydown', onEditCancel);
  }, [isEditing]);

  if (!isEditing) {
    return (
      <button
        className="bg-blue-100 p-1 text-green-900 w-full h-full flex text-left"
        onDoubleClick={onEdit}
        onTouchStart={onEdit}
        onKeyDown={onButtonKeyDown}
      >
        {value}
      </button>
    );
  }

  return (
    <textarea
      ref={refTextArea}
      className="bg-blue-100 p-1 text-green-900 w-full h-full"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={onTextAreaKeyDown}
      onBlur={onSave}
    ></textarea>
  );
};

interface IPlanMealValueProps {
  meal: IMeal;
  recipes: IRecipe[]|void;
  onRecipeClick: (recipe: IRecipe) => void;
}

const PlanMealValue = ({ meal, recipes, onRecipeClick }: IPlanMealValueProps): ReactElement => {
  return meal.editable ? (
    <EditableMeal
      initialValue={meal.value}
      key={meal.value}
      onChange={(val) => console.log(val)}
    />
  ) : (
    <FixedMeal value={meal.value} recipes={recipes} onRecipeClick={onRecipeClick}/>
  );
};

export default PlanMealValue;
