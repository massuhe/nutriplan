import { useRef } from 'react';

const useCoordinates = () => {
  const ref = useRef<HTMLElement>(null);
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
