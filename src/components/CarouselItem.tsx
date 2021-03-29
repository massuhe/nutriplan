import React, { ForwardRefRenderFunction, ReactElement } from 'react';

interface ICarouselItemProps {
  active: boolean;
  children: ReactElement;
  isTransitionInProgress: boolean;
}

const CarouselItem: ForwardRefRenderFunction<
  HTMLDivElement | null,
  ICarouselItemProps
> = ({ children, isTransitionInProgress, active }: ICarouselItemProps, ref) => (
  <div
    ref={ref}
    className="flex flex-col"
    style={{
      minWidth: '20%',
      padding: active ? '40px 10px 40px 10px' : '80px 15px 80px 15px',
      transform: `translateX(calc(var(--offset) * 100%)`,
      transition: `${isTransitionInProgress ? 'all 0.5s ease-in-out' : ''}`,
      width: '20%',
    }}
  >
    {children}
  </div>
);

export default React.forwardRef<HTMLDivElement | null, ICarouselItemProps>(
  CarouselItem
);
