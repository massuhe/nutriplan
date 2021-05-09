import React, { useEffect, ReactElement, useState } from 'react';
import CarouselArrow from './CarouselArrow.jsx';
import CarouselItem from './CarouselItem.jsx';
import useCarousel from '../hooks/useCarousel.js';
import useResponsiveCall from '../hooks/useResponsiveCall';

interface IPlanCarouselProps<T> {
  allItems: Array<T>;
  children: (item: T) => ReactElement;
  index: number;
  keyProp: string;
  onIndexChange: (newIndex: number) => void;
  transitionDuraton: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = { [index: string]: any };

const Carousel = ({
  allItems,
  children,
  index,
  keyProp,
  onIndexChange,
  transitionDuraton = 350,
}: IPlanCarouselProps<AnyObject>): ReactElement => {
  const [itemsToShow, setItemsToShow] = useState<number>(2);

  const {
    isTransitioning,
    offset,
    items,
    isTransitionInProgress,
    isItemActive,
    hideLeftArrow,
    hideRightArrow,
  } = useCarousel<AnyObject>({
    allItems,
    index,
    transitionDuraton,
    itemsToShow,
  });

  const handleIndexChange = (n: number | KeyboardEvent) => {
    if (isTransitioning()) return;

    const amount =
      typeof n === 'number' ? n : { ArrowLeft: -1, ArrowRight: 1 }[n.code] || 0;
    const limitReached =
      index + amount < 0 || index + amount === allItems.length;
    if (amount === 0 || limitReached) return;

    onIndexChange(index + amount);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleIndexChange);
    return () => document.removeEventListener('keydown', handleIndexChange);
  }, [index]);

  useResponsiveCall([1, 2, 3, 3, 5], setItemsToShow);

  const isItemsToShowEven = itemsToShow % 2 === 0;

  return (
    <section
      className="flex flex-1 overflow-hidden h-full relative"
      style={
        {
          '--offset': offset,
          '--items-to-show': itemsToShow,
          '--transition-duration': transitionDuraton + 'ms',
        } as React.CSSProperties
      }
    >
      {hideLeftArrow && (
        <CarouselArrow direction="left" onMove={handleIndexChange} />
      )}
      {items.map((item) => (
        <CarouselItem
          key={String(item[keyProp])}
          isTransitionInProgress={isTransitionInProgress}
          active={isItemsToShowEven || isItemActive(item)}
        >
          {children(item)}
        </CarouselItem>
      ))}
      {hideRightArrow && (
        <CarouselArrow direction="right" onMove={handleIndexChange} />
      )}
    </section>
  );
};

export default Carousel;
