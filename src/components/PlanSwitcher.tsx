import React, { CSSProperties, ReactElement, useEffect, useState } from 'react';
import Overlay from './Overlay.js';
import PlanSearcher from './PlanSearcher.js';

interface IPlanSwitcherProps {
  activePlanId?: string;
  isChangingPlan: boolean;
  coordinates: { top: number; left: number } | null;
  onPlanChange: (planId: string) => void;
  onDismiss: () => void;
}

const PlanSwitcher = ({
  activePlanId,
  isChangingPlan,
  coordinates,
  onDismiss,
  onPlanChange,
}: IPlanSwitcherProps): ReactElement => {
  const [shouldShowSearch, setShouldShowSearch] = useState<boolean>(false);

  useEffect(() => {
    if (!isChangingPlan) {
      setTimeout(() => setShouldShowSearch(false), 150);
    } else {
      setShouldShowSearch(true);
    }
  }, [isChangingPlan]);

  return (
    <Overlay
      visible={isChangingPlan}
      onOverlayClick={onDismiss}
      position="free"
    >
      <section
        className={`bg-white transform z-50 absolute p-5 transition-opacity ${
          isChangingPlan ? 'opacity-100' : 'opacity-0'
        }`}
        style={coordinates as CSSProperties}
      >
        {shouldShowSearch && (
          <PlanSearcher
            activePlanId={activePlanId}
            onPlanChange={onPlanChange}
          />
        )}
      </section>
    </Overlay>
  );
};

export default PlanSwitcher;
