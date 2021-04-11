import { useRef, useState } from 'react';

const useObjectState = <T>(
  initialState: () => T | T
): [T, (newState: Partial<T>) => void, T | null] => {
  const [state, setState] = useState<T>(initialState);
  const refPrevState = useRef<T | null>(null);

  const setObjectState = (newState: Partial<T>) => {
    refPrevState.current = state;
    setState({ ...state, ...newState });
  };

  return [state, setObjectState, refPrevState.current];
};

export default useObjectState;
