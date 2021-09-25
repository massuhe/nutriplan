import { RefObject, useRef } from 'react';

interface ICoordinates<T> {
  ref: RefObject<T> | null;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

const useCoordinates = <T extends HTMLElement>(): ICoordinates<T> => {
  const ref = useRef<T>(null);
  if (!ref.current) return { ref, top: 0, left: 0, right: 0, bottom: 0 };

  return {
    ref,
    top: ref.current.offsetTop,
    left: ref.current.offsetLeft,
    right: ref.current.offsetLeft + ref.current.offsetWidth,
    bottom: ref.current.offsetTop + ref.current.offsetHeight,
  };
};

export default useCoordinates;
