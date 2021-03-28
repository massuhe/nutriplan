import React, { useEffect, useRef, ReactElement } from 'react';
import type { IPlanDay } from 'src/types.js';
import useObjectState from '../hooks/useObjectState.js';
import CarouselItem from './CarouselItem.js';

interface IPlanCarouselProps<T> {
  children: (item: T) => ReactElement;
  plan: Array<T>;
  keyProp: string;
  initialIndex: number;
}

const getPlansToRender = (
  plan: IPlanDay[],
  idx: number,
  transitionState: string
): { offset: number; planDays: IPlanDay[]; removeTransition: boolean } => {
  const initialOffset = Math.max(2 - idx, 0);

  const isTransitionInProgress = transitionState.includes('transitioning');

  // Right arrow
  if (transitionState.includes('right')) {
    const rightLimit = Math.max(Math.max(idx, initialOffset) - 2, 0);
    const leftLimit = rightLimit + 6 - initialOffset;

    return {
      planDays: plan.slice(rightLimit, leftLimit),
      offset: isTransitionInProgress ? initialOffset - 1 : initialOffset,
      removeTransition: !isTransitionInProgress,
    };
  }

  // Left arrow
  if (transitionState.includes('left')) {
    const rightLimit = Math.max(idx - 3, 0);
    const leftLimit = idx + 3;
    const baseOffset = Math.max(2 - idx, -1);

    return {
      planDays: plan.slice(rightLimit, leftLimit),
      offset: isTransitionInProgress ? baseOffset + 1 : baseOffset,
      removeTransition: !isTransitionInProgress,
    };
  }

  // Idle
  return {
    offset: initialOffset,
    planDays: plan.slice(
      Math.max(Math.max(idx, initialOffset) - 2, 0),
      idx + 3
    ),
    removeTransition: true,
  };
};

const PlanCarousel = ({
  children,
  plan,
  keyProp,
  initialIndex,
}: IPlanCarouselProps<any>): ReactElement => {
  const [{ idx, transitionState }, setState] = useObjectState(() => ({
    idx: initialIndex,
    transitionState: 'idle',
  }));
  const refIsTransitioning = useRef(false);

  const { offset, planDays, removeTransition } = getPlansToRender(
    plan,
    idx,
    transitionState
  );

  useEffect(() => {
    function moveActivePlanIndexByArrow({ code }: { code: string }) {
      if (refIsTransitioning.current) return;

      const direction = { ArrowRight: 'right', ArrowLeft: 'left' }[code];

      if (
        !direction ||
        (direction === 'left' && idx === 0) ||
        (direction === 'right' && idx === plan.length - 1)
      )
        return;

      refIsTransitioning.current = true;

      // stage 1: add new element at the end
      setState({ transitionState: `preparing-transition-${direction}` });
      // stage 2: change offset to -1 to transition the new element in
      setTimeout(() =>
        setState({ transitionState: `transitioning-${direction}` })
      );
      // stage 3: wait for transition end and remove element transitioned out and change offset back to 0
      setTimeout(() => {
        setState({
          transitionState: 'idle',
          idx: idx + ({ right: 1, left: -1 }[direction] || 0),
          direction: 0,
        });
        refIsTransitioning.current = false;
      }, 250);
    }
    document.addEventListener('keydown', moveActivePlanIndexByArrow);
    return () =>
      document.removeEventListener('keydown', moveActivePlanIndexByArrow);
  }, [transitionState]);

  // let offset = Math.max(2 - idx, 0);
  // let planDays = plan.slice(Math.max(Math.max(idx, offset) - 2, 0), idx + 3);
  // let removeTransition = true;

  // // Right arrow

  // if (stage === 1 && direction === 1) {
  //   planDays = plan.slice(
  //     Math.max(Math.max(idx, offset) - 2, 0),
  //     Math.max(Math.max(idx, offset) - 2, 0) + 6 - offset
  //   );
  // }

  // if (stage === 2 && direction === 1) {
  //   planDays = plan.slice(
  //     Math.max(Math.max(idx, offset) - 2, 0),
  //     Math.max(Math.max(idx, offset) - 2, 0) + 6 - offset
  //   );
  //   offset = offset - 1;
  //   removeTransition = false;
  // }

  // // Left arrow

  // if (stage === 1 && direction === -1) {
  //   planDays = plan.slice(Math.max(idx - 3, 0), idx + 3);
  //   offset = Math.max(2 - idx, -1);
  // }

  // if (stage === 2 && direction === -1) {
  //   planDays = plan.slice(Math.max(idx - 3, 0), idx + 3);
  //   offset = Math.max(2 - idx, -1) + 1;
  //   removeTransition = false;
  // }

  // useEffect(() => {
  //   function moveActivePlanIndexByArrow({ code }: { code: string }) {
  //     if (refIsTransitioning.current) return;

  //     const direction = { ArrowRight: 1, ArrowLeft: -1 }[code];

  //     if (
  //       !direction ||
  //       (direction === -1 && idx === 0) ||
  //       (direction === 1 && idx === plan.length - 1)
  //     )
  //       return;

  //     refIsTransitioning.current = true;

  //     // stage 1: add new element at the end
  //     setTransition({ stage: 1, idx, direction });
  //     // stage 2: change offset to -1 to transition the new element in
  //     setTimeout(() => setTransition({ stage: 2, idx, direction }));
  //     // stage 3: wait for transition end and remove element transitioned out and change offset back to 0
  //     setTimeout(() => {
  //       setTransition({ stage: 0, idx: idx + direction, direction: 0 });
  //       refIsTransitioning.current = false;
  //     }, 250);
  //   }
  //   document.addEventListener('keydown', moveActivePlanIndexByArrow);
  //   return () =>
  //     document.removeEventListener('keydown', moveActivePlanIndexByArrow);
  // }, [stage]);

  return (
    <section
      className="flex flex-1 overflow-hidden h-full"
      style={{ '--offset': offset } as React.CSSProperties}
    >
      {planDays.map((item: Partial<{ [index: string]: any }>) => (
        <CarouselItem
          key={String(item[keyProp])}
          removeTransition={removeTransition}
        >
          {children(item)}
        </CarouselItem>
      ))}
    </section>
  );
};

export default PlanCarousel;
