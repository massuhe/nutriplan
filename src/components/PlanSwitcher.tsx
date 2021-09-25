import React, { CSSProperties, useEffect, useState } from 'react';
import Overlay from './Overlay.js';
import PlanSearcher from './PlanSearcher.js';

interface IPlanSwitcherProps {
  activePlanId?: string;
  isChangingPlan: boolean;
  coordinates?: { top: number; left: number };
  onDismiss: () => void;
}

const PlanSwitcher = ({
  activePlanId,
  isChangingPlan,
  coordinates,
  onDismiss,
}: IPlanSwitcherProps): JSX.Element => {
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
        className={`bg-white transform z-50 absolute p-5 transition-opacity right-0 sm:right-auto ${
          isChangingPlan ? 'opacity-100' : 'opacity-0'
        }`}
        style={coordinates as CSSProperties}
      >
        {shouldShowSearch && <PlanSearcher activePlanId={activePlanId} />}
      </section>
    </Overlay>
  );
};

export default PlanSwitcher;
