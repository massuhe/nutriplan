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
      className={`absolute duration-200 flex h-full hover:opacity-100 focus:opacity-100 items-center opacity-10 transition-opacity z-10 text-white text-7xl ${extraClass}`}
      style={{
        background: `radial-gradient(ellipse at center ${direction}, #005237d4 0, #10b98100 70%)`,
      }}
    >
      {char}
    </button>
  );
}

export default CarouselArrow;