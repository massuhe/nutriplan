import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { IMeal } from 'src/types';
import { PlanContext } from './PlanContext';

const rexMealWithRecipe = /(@[a-z-]+)/g;

interface IRecipeMealPrios {
  value: string;
}

const RecipeMeal = ({ value }: IRecipeMealPrios) => {
  const { recipes, setActiveRecipe } = useContext(PlanContext);
  const recipe = recipes.find((r) => r.slug === value);

  if (!recipe) return <span>{value}</span>;

  // @TODO: Create new component <InlineButton /> that encapsulates accessibility.
  return (
    <a
      href="/"
      onClick={(e) => {
        e.preventDefault();
        setActiveRecipe(recipe);
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
}

const FixedMeal = ({ value }: IFixedMealProps) => {
  const mealValue = value
    .split(rexMealWithRecipe)
    .filter(Boolean)
    .map((value: string) =>
      value.startsWith('@') ? (
        <RecipeMeal value={value.slice(1)} key={value} />
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
}

const PlanMealValue = ({ meal }: IPlanMealValueProps): ReactElement => {
  return meal.editable ? (
    <EditableMeal
      initialValue={meal.value}
      key={meal.value}
      onChange={(val) => console.log(val)}
    />
  ) : (
    <FixedMeal value={meal.value} />
  );
};

export default PlanMealValue;
