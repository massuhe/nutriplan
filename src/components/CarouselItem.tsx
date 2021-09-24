import React from 'react';

interface ICarouselItemProps {
  active: boolean;
  children: JSX.Element;
  isTransitionInProgress: boolean;
}

const CarouselItem = ({
  children,
  isTransitionInProgress,
  active,
}: ICarouselItemProps): JSX.Element => (
  <div
    className="flex flex-col"
    style={{
      minWidth: 'calc(100%/var(--items-to-show))',
      padding: active ? '40px 10px 40px 10px' : '80px 15px 80px 15px',
      transform: `translateX(calc(var(--offset) * 100%)`,
      transition: isTransitionInProgress
        ? 'all var(--transition-duration) ease'
        : '',
      width: 'calc(100%/var(--items-to-show))',
    }}
  >
    {children}
  </div>
);

export default CarouselItem;
