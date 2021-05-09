import { useLayoutEffect, useRef } from 'react';
import useObjectState from './useObjectState.js';
import { nextTick } from '../lib/async.js';

interface IPlanCarouselState {
  transitionStage: string;
  transitionDirection: string | null;
  idx: number;
}

interface IPlansToRenderConfig<T> {
  allItems: T[];
  idx: number;
  isTransitionInProgress: boolean;
  transitionDirection: string | null;
  itemsToShow: number;
}

interface IUseCarouselConfig<T> {
  allItems: T[];
  index: number;
  transitionDuraton?: number;
  itemsToShow: number;
}

interface IUseCarouselResponse<T> {
  offset: number;
  items: T[];
  isTransitionInProgress: boolean;
  isItemActive: (item: T) => boolean;
  isTransitioning: () => boolean;
  hideLeftArrow: boolean;
  hideRightArrow: boolean;
}

const getPlansToRender = <T>(
  config: IPlansToRenderConfig<T>
): { offset: number; items: T[] } => {
  const {
    allItems,
    idx,
    isTransitionInProgress,
    transitionDirection,
    itemsToShow,
  } = config;

  const halfItemsToShow = Math.floor(itemsToShow / 2);
  const initialOffset = Math.max(halfItemsToShow - idx, 0);

  // Right arrow
  if (transitionDirection === 'right') {
    const leftLimit = Math.max(
      Math.max(idx, initialOffset) - halfItemsToShow,
      0
    );
    const rightLimit = leftLimit + itemsToShow + 1 - initialOffset;

    return {
      items: allItems.slice(leftLimit, rightLimit),
      offset: isTransitionInProgress ? initialOffset - 1 : initialOffset,
    };
  }

  // Left arrow
  if (transitionDirection === 'left') {
    const leftLimit = Math.max(idx - (halfItemsToShow + 1), 0);
    const rightLimit = idx + halfItemsToShow + 1;
    const baseOffset = Math.max(halfItemsToShow - idx, -1);

    return {
      items: allItems.slice(leftLimit, rightLimit),
      offset: isTransitionInProgress ? baseOffset + 1 : baseOffset,
    };
  }

  // Idle
  return {
    offset: initialOffset,
    items: allItems.slice(
      Math.max(Math.max(idx, initialOffset) - halfItemsToShow, 0),
      idx + 3
    ),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCarousel = <T>({
  allItems,
  index,
  transitionDuraton = 350,
  itemsToShow = 5,
}: IUseCarouselConfig<T>): IUseCarouselResponse<T> => {
  const [
    { transitionStage, transitionDirection, idx },
    setState,
  ] = useObjectState<IPlanCarouselState>(() => ({
    transitionStage: 'idle',
    transitionDirection: null,
    idx: index,
  }));

  const refIsTransitioning = useRef<boolean>(false);

  const isTransitionInProgress = transitionStage === 'transitioning';

  const { offset, items } = getPlansToRender({
    allItems,
    idx,
    isTransitionInProgress,
    transitionDirection,
    itemsToShow,
  });

  const isItemActive = (item: T): boolean => {
    const addToIndex = isTransitionInProgress
      ? { right: 1, left: -1 }[transitionDirection as string] || 0
      : 0;
    const indexActive = items.indexOf(allItems[idx]);

    return items[indexActive + addToIndex] === item;
  };

  async function moveActivePlan(direction: string) {
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
    await new Promise((r) => setTimeout(r, transitionDuraton));

    setState({
      idx: idx + ({ right: 1, left: -1 }[direction as string] || 0),
      transitionStage: 'idle',
      transitionDirection: null,
    });

    await nextTick();
    refIsTransitioning.current = false;
  }

  // I'm using useLayoutEffect here because I need `refIsTransitioning.current` to be set immediatly.
  useLayoutEffect(() => {
    if (refIsTransitioning.current) return;

    const diff = index - idx;

    if (diff === 0) return;

    if (Math.abs(diff) > 1)
      return setState({
        idx: index,
        transitionDirection: null,
        transitionStage: 'idle',
      });

    const direction = diff === 1 ? 'right' : 'left';
    moveActivePlan(direction);
  }, [index]);

  return {
    offset,
    items,
    isTransitionInProgress,
    isItemActive,
    isTransitioning: () => refIsTransitioning.current === true,
    hideLeftArrow: idx !== 0,
    hideRightArrow: idx !== allItems.length - 1,
  };
};

export default useCarousel;
