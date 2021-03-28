import React from 'react';

const CarouselItem = ({ children, removeTransition }) => {
  return (
    <div
      className="flex flex-col"
      style={{
        minWidth: '20%',
        width: '20%',
        transform: `translateX(calc(var(--offset) * 100%)`,
        ...(!removeTransition && { transition: 'transform 0.2s ease' }),
      }}
    >
      {children}
    </div>
  );
};

export default CarouselItem;
