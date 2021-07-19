import React, { ReactElement } from 'react';

interface ICarouselArrowProps {
  direction: string;
  onMove: (n: number) => void;
}

function CarouselArrow({
  direction,
  onMove,
}: ICarouselArrowProps): ReactElement {
  const { char, move, extraClass } = {
    left: { char: '<', move: -1, extraClass: '' },
    right: { char: '>', move: 1, extraClass: 'right-0' },
  }[direction] || { char: '', move: 0, extraClass: '' };

  const handleClick = () => onMove(move);

  return (
    <button
      onClick={handleClick}
      className={`absolute duration-200 hidden sm:flex h-full hover:opacity-100 focus:opacity-100 items-center opacity-10 transition-opacity z-10 text-white text-7xl ${extraClass}`}
      style={{
        background:
          'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 3%,rgba(0,0,0,0.1) 21%)',
      }}
    >
      {char}
    </button>
  );
}

export default CarouselArrow;
