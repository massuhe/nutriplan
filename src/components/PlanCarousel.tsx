import React, { useEffect, useRef, ReactElement } from 'react';
import CarouselItem from './CarouselItem.js';
import useObjectState from '../hooks/useObjectState.js';
import { nextTick, transitionEnd } from '../lib/async.js';

interface IPlanCarouselProps<T> {
  children: (item: T) => ReactElement;
  allItems: Array<T>;
  keyProp: string;
  initialIndex: number;
}

type AnyObject = { [index: string]: any };

const getPlansToRender = (
  allItems: AnyObject[],
  idx: number,
  isTransitionInProgress: boolean,
  transitionDirection: string
): { offset: number; items: AnyObject[] } => {
  const initialOffset = Math.max(2 - idx, 0);

  // Right arrow
  if (transitionDirection === 'right') {
    const rightLimit = Math.max(Math.max(idx, initialOffset) - 2, 0);
    const leftLimit = rightLimit + 6 - initialOffset;

    return {
      items: allItems.slice(rightLimit, leftLimit),
      offset: isTransitionInProgress ? initialOffset - 1 : initialOffset,
    };
  }

  // Left arrow
  if (transitionDirection === 'left') {
    const rightLimit = Math.max(idx - 3, 0);
    const leftLimit = idx + 3;
    const baseOffset = Math.max(2 - idx, -1);

    return {
      items: allItems.slice(rightLimit, leftLimit),
      offset: isTransitionInProgress ? baseOffset + 1 : baseOffset,
    };
  }

  // Idle
  return {
    offset: initialOffset,
    items: allItems.slice(
      Math.max(Math.max(idx, initialOffset) - 2, 0),
      idx + 3
    ),
  };
};

const PlanCarousel = ({
  children,
  allItems,
  keyProp,
  initialIndex,
}: IPlanCarouselProps<AnyObject>): ReactElement => {
  const [
    { idx, transitionStage, transitionDirection },
    setState,
  ] = useObjectState(() => ({
    idx: initialIndex,
    transitionStage: 'idle',
    transitionDirection: null,
  }));

  const refIsTransitioning = useRef(false);
  const refCarouselItem = useRef<HTMLDivElement | null>(null);

  const isTransitionInProgress = transitionStage === 'transitioning';

  const { offset, items } = getPlansToRender(
    allItems,
    idx,
    isTransitionInProgress,
    transitionDirection
  );

  const isItemActive = (item: AnyObject): boolean => {
    const addToIndex = isTransitionInProgress
      ? { right: 1, left: -1 }[transitionDirection as string] || 0
      : 0;
    const indexActive = items.indexOf(allItems[idx]);

    return items[indexActive + addToIndex] === item;
  };

  useEffect(() => {
    async function moveActivePlanIndexByArrow({ code }: { code: string }) {
      if (refIsTransitioning.current) return;

      const direction = { ArrowRight: 'right', ArrowLeft: 'left' }[code];

      if (
        !direction ||
        (direction === 'left' && idx === 0) ||
        (direction === 'right' && idx === allItems.length - 1)
      )
        return;

      refIsTransitioning.current = true;

      // stage 1: add new element at the end and wait for next event loop tick.
      setState({
        transitionStage: `preparing`,
        transitionDirection: direction,
      });
      await nextTick();
      // stage 2: change offset to -1 to transition the new element in.
      setState({
        transitionStage: `transitioning`,
        transitionDirection: direction,
      });
      // stage 3: wait for transition end and remove element transitioned out and change offset back to 0.
      if (refCarouselItem.current) {
        await transitionEnd(refCarouselItem.current);
      }

      setState({
        direction: 0,
        idx: idx + ({ right: 1, left: -1 }[direction as string] || 0),
        transitionStage: 'idle',
        transitionDirection: null,
      });

      await nextTick();
      refIsTransitioning.current = false;
    }
    document.addEventListener('keydown', moveActivePlanIndexByArrow);
    return () =>
      document.removeEventListener('keydown', moveActivePlanIndexByArrow);
  }, [transitionStage]);

  return (
    <section
      className="flex flex-1 overflow-hidden h-full"
      style={{ '--offset': offset } as React.CSSProperties}
    >
      {items.map((item, i) => (
        <CarouselItem
          {...(i === 0 && { ref: refCarouselItem })}
          key={String(item[keyProp])}
          isTransitionInProgress={isTransitionInProgress}
          active={isItemActive(item)}
        >
          {children(item)}
        </CarouselItem>
      ))}
    </section>
  );
};

export default PlanCarousel;
